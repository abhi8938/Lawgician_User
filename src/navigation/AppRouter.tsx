import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Router, Scene, Drawer, Stack } from 'react-native-router-flux';
import { observer, Provider } from "mobx-react";
import HomeScreen from './../screen/HomeScreen';
import ServicesScreen from './../screen/ServicesScreen';
import ProfilePage from './../screen/ProfilePage';
import AboutUs from './../screen/AboutUs';
import TermsAndCondition from '../screen/TermsAndCondition';
import SignIn from './../screen/Auth/SignIn';
import SignUp from './../screen/Auth/SignUp';
import ForgotPassword from './../screen/Auth/ForgotPassword';
import AuthLoadingScreen from './../screen/AuthLoadingScreen';
import AddProfession from './../screen/AddProfession';
import ArticleDetail from './../screen/ArticleDetail';
import DocumentScreen from './../screen/DocumentScreen';
import QueryScreen from './../screen/QueryScreen';
import NotificationScreen from './../screen/NotificationScreen';
import MenuScreen from '../screen/MenuScreen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TabBar from './TabBar';
import PrivacyPolicy from '../screen/PrivacyPolicy';
import NavBar from './../common/NavBar';
import { DocumentSharingServices } from '../services/DocumentSharingServices';
import { loginServices } from '../services/loginServices';
import { articleServices } from '../services/articleServices';
import { notificationServices } from '../services/notificationServices';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import AddMobile from '../screen/AddMobile';
import ServiceDetails from './../screen/ServiceDetails';
import { orderServices } from '../services/orderServices';
import BillingScreen from './../screen/BillingScreen';

export const documentSharingServices = new DocumentSharingServices();
export const LoginServices = new loginServices();
export const ArticleServices = new articleServices();
export const NotificationServices = new notificationServices();
export const OrderServices = new orderServices();

@observer
export default class AppRouter extends Component {
  constructor(props) {
    super(props);
    NotificationServices.checkHasPermission();
    NotificationServices.createChannel();
  }

  async componentDidMount() {
    NotificationServices.NotificationListener();
    NotificationServices.NotificationDisplayedListener();
    NotificationServices.NotificationOpened();
    NotificationServices.NotificationOpenedAppClosed();
  }

  componentWillUnmount() {
    NotificationServices.NotificationDisplayedListener();
    NotificationServices.NotificationListener();
    NotificationServices.NotificationOpened();
  }
  renderTabs() {
    return (
      <Scene
        inactiveTintColor='#A9A9A9'
        activeTintColor='#132F58' 
        key='home'
        tabs={true}
        swipeEnabled={true}
        tabBarPosition='top'
        tabBarComponent={TabBar}
        hideNavBar={false}
        navBar={NavBar}
        lazy={true}
      >
        <Scene key="article" component={HomeScreen} hideNavBar initial />
        <Scene key="notification" component={NotificationScreen} hideNavBar />
        <Scene key="document" component={DocumentScreen} hideNavBar />
        <Scene key="query" component={QueryScreen} hideNavBar />
        <Scene key="menu" component={MenuScreen} hideNavBar />
      </Scene>

    )
  }

  renderStack() {
    return (
      <Scene
        key='main'
        titleStyle={styles.title}
        hideNavBar
      >
        {this.renderTabs()}
        <Scene key='privacy' component={PrivacyPolicy} title='Privacy Policies' hideNavBar={false} />
        <Scene key="about" component={AboutUs} title="About Us" hideNavBar={false} />
        <Scene key="profile" component={ProfilePage} title="Your Profile" hideNavBar={false} />
        <Scene key="terms" component={TermsAndCondition} title="Terms And Conditions" hideNavBar={false} />
        <Scene key='articleDetail' component={ArticleDetail} title='Article' hideNavBar={false} back />
        <Scene key="services" component={ServicesScreen} hideNavBar={false} title="Services" />
        <Scene key="serviceDetail" component={ServiceDetails} titleStyle={{color:'#000', fontWeight:'bold'}} hideNavBar={false} title="Service Detail" />
        <Scene key='billing' component={BillingScreen} titleStyle={{color:'#000', fontWeight:'bold'}} title='Generate Invoice' hideNavBar={false}/>
      </Scene>
    )
  }

  renderAuth() {
    return (
      <Scene key='auth' hideNavBar >
        <Scene key="signin" component={SignIn} hideNavBar initial />
        <Scene key="signup" component={SignUp} hideNavBar />
        <Scene key="forgot" component={ForgotPassword} title="Forgot Password" back />
        <Scene key='profession' component={AddProfession} title="Add Profession" hideNavBar={false} />
        <Scene key='mobile' component={AddMobile} title="Add Mobile Number" hideNavBar={false} back={false} />
      </Scene>
    )
  }

  render() {
    return (
      <Provider order={OrderServices} document={documentSharingServices} notification={NotificationServices} article={ArticleServices} login={LoginServices}>
        <Router>
          <Scene>
            <Scene key='authloading' initial component={AuthLoadingScreen} hideNavBar />
            {this.renderStack()}
            {this.renderAuth()}
          </Scene>
        </Router>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  label: {
    width: wp('15%'),
    color: '#fff',
    fontSize: wp('2%')
  },
  title: {
    color: '#132F58',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
