import { observable, toJS } from "mobx";
import autobind from "autobind-decorator";
import firebase from 'react-native-firebase';
import { Alert } from "react-native";
import { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from './../constants/endpoint';
import { LoginServices, documentSharingServices, ArticleServices } from '../navigation/AppRouter';


@autobind
export class notificationServices {
  @observable
  Token: string = '';

  @observable
  userNotifications = new Array;

  createChannel() {
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }
  async checkHasPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      const token = await firebase.messaging().getToken();
      this.Token = token;
    } else {
      console.log('not enabled');
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
        Alert.alert('permission granted');
        // User has authorised
      } catch (error) {
        Alert.alert('not granted');
        // User has rejected permissions
      }
    }
  }

  // messageListener() {
  //   firebase.messaging().onMessage((RemoteMessage: any) => {
  //     // Process your message as required
  //     console.log(`remotemessage:`, RemoteMessage);
  //   });
  // }

  NotificationDisplayedListener() {
    return firebase.notifications().onNotificationDisplayed((Notification) => {
      console.log(`notificationDisplayed`, Notification);
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
  }

  async NotificationListener() {

    return firebase.notifications().onNotification(async (Notification) => {
      await this.getNotifications(LoginServices.customerId);
      if (Notification.data.Type === 'Document') {
        await documentSharingServices.getUserDocuments(LoginServices.customerId);
      }
      if(Notification.data.Type === 'Query'){
        await documentSharingServices.getUserQueries(LoginServices.customerId);
      }
      if(Notification.data.Type === 'Article'){
        await ArticleServices.getArticles();
      }
      const notification = new firebase.notifications.Notification()
        .setNotificationId(Notification.notificationId)
        .setTitle(Notification.title)
        .setBody(Notification.body)
        .setData(Notification.data)
        .android.setChannelId('lawgician-notification');

      return firebase.notifications().displayNotification(notification);
    });
  }

  NotificationOpened() {
    firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      console.log(`opened`, notification);
      this.notificationRouter(notification.data);
    });
  }

  NotificationOpenedAppClosed() {
    firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          const notification: Notification = notificationOpen.notification;
          console.log(`NotificationOpenedAppClosed`, notification);
          this.notificationRouter(notification.data);
        }
      });
  }

  addNotificationToken = async (
    Token: string,
    customerId: string
  ) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userToken,
      }
    };

    return axios.put(BASE_URL + '/users/notify', {
      Token,
      customerId
    }, config)
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      });
  }

  getNotifications = async (customerId: string) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userToken,
        'customerid': customerId
      }
    };

    return axios.get(BASE_URL + '/users/notification', config)
      .then(response => {
        if (response.data.length !== 0) {
          this.userNotifications = response.data
        }
        return
      })
      .catch(error => error.response);

  }

  // TODO: Check for notification type and navigate to specific screen
  notificationRouter = (Data: any) => {
    console.log(`router notification Data`, Data.Type);
    if (Data.Type === 'Document') {
      return
    }
    if (Data.Type === 'Query') {
      return
    }
    if (Data.Type === 'Article') {
      return
    }

  }

}