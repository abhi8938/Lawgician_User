import React from 'react';
import {
  Image,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getArticles} from '../requests/getData';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { toJS } from 'mobx';
import {articleServices} from '../services/articleServices';
import  {notificationServices}  from '../services/notificationServices';
import  {loginServices}  from '../services/loginServices';
import { DocumentSharingServices } from '../services/DocumentSharingServices';

type auth = {
  article:articleServices
  notification:notificationServices
  login:loginServices
  document:DocumentSharingServices
}

@inject('article')
@inject('login')
@inject('notification')
@inject('document')
@observer
export default class AuthLoadingScreen extends React.Component<auth> {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }


 async populateData(){
   await this.props.login.getUserCard();
   await this.props.notification.addNotificationToken(this.props.notification.Token, this.props.login.customerId);
   await this.props.article.getArticles();
   await this.props.document.getUserDocuments(this.props.login.customerId)
   await this.props.document.getUserQueries(this.props.login.customerId)
   await this.props.notification.getNotifications(this.props.login.customerId);
   this.props.notification.NotificationListener(
     this.props.login.customerId);
  }
  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if(userToken){
          console.log(`userToken`,userToken);
          await this.populateData();
          return Actions.replace('main');
      }
     
     return Actions.replace('auth')
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex:1, padding:0, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
       <Image
       source={require('../Assets/lawgicianLogo.jpeg')}
       style={{ marginLeft:wp('15%'), width:wp('95%'), height:hp('50%')}}
       />
        <View style={{ width:wp('100%'), paddingTop:hp('18%'), alignItems:'center'}}>
          {/* <Text style ={{ color:'#ccc', paddingLeft:wp('2.8%'), fontFamily:'Gotham', fontWeight:'500', fontSize:wp('7%')}}> <Text style={{ paddingBottom:hp('1%'), fontSize:16}}>©</Text></Text> */}
        </View>
      </View>
    );
  }
}
const styles =  StyleSheet.create({
  lottie: {
    width:wp('100%'),
    height:hp('40%'),

  },
})
