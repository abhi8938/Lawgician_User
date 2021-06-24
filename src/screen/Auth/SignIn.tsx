import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField1, Button1 } from '../../common';
import { TouchableRipple } from 'react-native-paper';
import KeyboardShift from '../../KeyboardShift';
import AlertModal from './../../common/AlertModal';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import LoaderOverlay from './../../common/loaderOverLay';
import { PasswordInput } from './../../common/PasswordInput';
import { loginServices } from '../../services/loginServices';
import { articleServices } from '../../services/articleServices';
import { notificationServices } from '../../services/notificationServices';
import { DocumentSharingServices } from '../../services/DocumentSharingServices';

type signInPageProps = {
  login: loginServices,
  article: articleServices
  notification: notificationServices
  document: DocumentSharingServices
}

@inject('login')
@inject('article')
@inject('notification')
@inject('document')
@observer
export default class SignIn extends React.Component<signInPageProps> {
  state = {
    email: '',
    password: '',
    loading: false,
    showResponse: false,
    error: false,
    response: ''
  }
  signInWithGoogle = async () => {
    const status = await this.props.login._googleSignIn();
    if (status === 'SUCCESS') {
      this.setState({ loading: true });
      const user = await this.props.login.CreateTokenSocial(this.props.login.userEmail);
      if (user.status === 400 && user.data === 'NEW_USER') {
        Actions.replace('mobile');
        this.setState({ loading: false });
        return;
      }
      if(user.status === 200){ 
        await AsyncStorage.setItem('userToken', user.data);
        await this.populateData();
        this.setState({ loading: false });
        Actions.replace('main');
    }
    } else {
      this.setState({ loading: false, showResponse: true, response: status, error: true });
    }
  }

  signInWithFacebook = async () => {
    const facebookToken = await this.props.login._facebookSignIn();
    if(facebookToken === 'USER CANCELLED' || facebookToken === 'LOGIN FAILED' ){
      this.setState({ loading: false, showResponse: true, response: facebookToken, error: true });
      return;
    }
    this.setState({loading:true});   
    const user = await this.props.login.CreateTokenSocial(this.props.login.userEmail);
    if (user.status === 400 && user.data === 'NEW_USER') {
      Actions.replace('mobile');
      this.setState({ loading: false });
      return;
    }
    if(user.status === 200){ 
      await AsyncStorage.setItem('userToken', user.data);
      await this.populateData();
      this.setState({ loading: false });
      Actions.replace('main');
  }
  }

  signInAsync = async () => {
    this.setState({ loading: true });
    this.props.login.createUserToken(this.state.email, this.state.password)
      .then(async Token => {
        if (Token.status === 400) {
          this.setState({ loading: false, showResponse: true, response: Token.data, error: true });
        } else if (Token.status === 200) {
          AsyncStorage.setItem('userToken', Token.data)
            .then(async resp => {
              await this.populateData('EMAIL')
              Actions.replace('main');
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          this.setState({ loading: false, showResponse: true, response: 'Something Went Wrong', error: true });
        }
      });

  }

  async populateData() {
    await this.props.login.getUserCard();
    await this.props.notification.addNotificationToken(this.props.notification.Token, this.props.login.customerId);
    await this.props.article.getArticles();
    await this.props.document.getUserDocuments(this.props.login.customerId)
    await this.props.document.getUserQueries(this.props.login.customerId)
    await this.props.notification.getNotifications(this.props.login.customerId)
  }
  renderModal() {

    if (this.state.showResponse) {
      return (
        <AlertModal
          visible={this.state.showResponse}
          onRequestClose={() => {
            this.setState({ showResponse: false })
          }}
          error={this.state.error}
          response={this.state.response}
        />
      );
    }
  }
  renderLoader() {
    return (
      <LoaderOverlay
        label={'Logging in...'}
      />
    )
  }

  render() {
    if (this.state.loading) {
      return this.renderLoader()
    } else {
      return (
        <KeyboardShift>
          {() => (
            <View style={styles.container}>
              {/*App Name*/}
              <View style={{ width: wp('100%'), paddingLeft: wp('15%'), alignItems: 'center' }}>
                <Image
                  source={require('../../Assets/lawgicianLogo.jpeg')}
                  style={{ padding: 0, width: wp('90%'), height: hp('25%') }}
                />
                {/* <Text style={styles.appName}>Lawgician</Text> */}
              </View>
              <View style={styles.PageHeading}>
                {/*Sign in now */}
                <Text style={styles.signInText}>Sign in now</Text>
              </View>
              <View>
                {/** email */}
                <TextField1
                  name={require('../../Assets/close-envelope.png')}
                  label={'Email'}
                  iconStyle={{ width: wp('6%'), height: hp('3.2%'), borderRadius: 5 }}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email: email })}
                  keyboardType={'email-address'}

                />
                {/** passsword */}
                <PasswordInput
                  source={require('../../Assets/shield.png')}
                  iconStyle={{ width: wp('6%'), height: hp('3.5%'), borderRadius: 5 }}
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password: password })}
                />

              </View>
              <View style={styles.forgotSection}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    setTimeout(() => this.props.navigation.navigate('forgot'), 1)
                  }}
                >
                  <Text style={{ fontSize: wp('3.4%'), color: '#13144C', fontWeight: '500' }}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: hp('1%') }}>
                {/** Touchable SignIn */}
                <Button1
                  onPress={this.signInAsync}
                >Sign in</Button1>
              </View>
              <View style={{ width: wp('100%'), alignItems: 'center' }}>
                <Text style={{ paddingTop: hp('.5%'), paddingBottom: hp('.5%'), fontSize: wp('5%'), color: '#132F58', fontWeight: 'bold' }}>OR</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableRipple
                    style={styles.googleButton}
                    rippleColor="rgba(0,0,0, 0.3)"
                    onPress={this.signInWithGoogle}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                      <Image
                        style={{ resizeMode: 'contain', width: wp('10%'), marginRight: wp('2%'), height: hp('5.6%'), borderRadius: 4, backgroundColor: '#fff' }}
                        source={require('../../Assets/googleLogo.png')}
                      />
                      <Text style={{ color: '#C94131', fontWeight: 'bold', fontSize: wp('3.9%') }}>Google Signin</Text>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple
                    style={styles.FBbutton}
                    rippleColor="rgba(0,0,0, 0.3)"
                    onPress={this.signInWithFacebook}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                      <Image
                        style={{ resizeMode: 'contain', width: wp('10%'), marginRight: wp('2%'), height: hp('5.6%'), borderRadius: 4, backfaceVisibility: 'hidden' }}
                        source={require('../../Assets/facebookLogo.png')}
                      />
                      <Text style={{ color: '#3A63BF', fontWeight: 'bold', fontSize: wp('3.8%') }}>Facebook Signin</Text>
                    </View>
                  </TouchableRipple>
                </View>
              </View>
              <View style={styles.registerContainer}>
                {/** Oh! Not Registerd yet */}
                <Text style={styles.registerTitle}>Oh! Not Registered yet?</Text>
                {/** Register Button */}
                <TouchableRipple
                  style={styles.touchable}
                  rippleColor="rgba(0,0,0, 0.3)"
                  onPress={() => {
                    setTimeout(() => this.props.navigation.navigate('signup'), 1)
                  }}>
                  <Text style={styles.text}>Register Now</Text>
                </TouchableRipple>
              </View>
              {this.renderModal()}
            </View>

          )}

        </KeyboardShift>

      );
    }
  }
}


const styles = StyleSheet.create({

  FBbutton: {
    flex: 1,
    flexDirection: 'row',
    height: hp('7.5%'),
    paddingLeft: wp('1%'),
    alignItems: 'center',
    paddingRight: wp('2%'),
    // backgroundColor:'#3A63BF',
    borderRadius: 4,
    borderBottomWidth: 2,
    marginLeft: wp('1.5%'),
    marginRight: wp('4%'),
    borderBottomColor: '#3A63BF'
  },
  googleButton: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: wp('1%'),
    paddingRight: wp('2%'),
    height: hp('7.5%'),
    marginLeft: wp('4%'),
    marginRight: wp('1.5%'),
    borderRadius: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#C94131'
  },
  lottie: {
    width: wp('25%'),
    height: hp('15%')
  },
  forgotSection: {
    width: wp('100%'),
    alignItems: 'flex-end',
    paddingRight: wp('6%'),
    paddingTop: hp('0.2%'),
    paddingBottom: hp('0.2%')
  },
  text: {
    marginLeft: wp('1%'),
    color: '#132F58',
    fontSize: wp('4.5%'),
    fontWeight: '400'
  },
  touchable: {
    padding: wp('1%'),
    marginLeft: wp('1%'),
    alignItems: 'center'
  },
  TouchableContainer: {
    width: wp('100%'),
    height: hp('9%'),
    paddingTop: hp('4%'),
    paddingBottom: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('1.5%'),
    paddingLeft: wp('10%')
  },
  registerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold'
  },
  PageHeading: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: wp('6.5%'),
    color: '#000',
    paddingTop: hp('3%')
  },
  appName: {
    fontSize: wp('10%'),
    color: '#000',
    fontWeight: 'bold'
  },
  ImageContainer: {

    width: wp('100%'),
    height: hp('18%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: wp('20%'),
    height: hp('15%')
  },
  container: {
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: '#fff',
    borderTopWidth: 0,
  },

});
