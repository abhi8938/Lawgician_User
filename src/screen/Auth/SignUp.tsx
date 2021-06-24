import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import KeyboardShift from '../../KeyboardShift';
import { TextField1, Button1 } from '../../common';
import AlertModal from '../../common/AlertModal';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import LoaderOverlay from '../../common/loaderOverLay';
import { PasswordInput } from './../../common/PasswordInput';
import { loginServices } from '../../services/loginServices';
import { articleServices } from '../../services/articleServices';
import { notificationServices } from '../../services/notificationServices';
import { DocumentSharingServices } from '../../services/DocumentSharingServices';
import { observer, inject } from 'mobx-react';
type signUpPageProps = {
  login: loginServices,
  article:articleServices
  notification:notificationServices 
  document:DocumentSharingServices
}

@inject('login')
@inject('article')
@inject('notification')
@inject('document')
@observer
export default class SignUp extends React.Component<signUpPageProps>{

  state = {
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    error: false,
    showResponse: false,
    response: '',
    loading: false
  }

  PostUser = () => {
    const { fullName, email, mobileNumber, password, confirmPassword} = this.state;
    if (password === confirmPassword) {
      this.setState({ loading: true });
    this.props.login.CreateUser(
        fullName,
        email,
        mobileNumber,
        password,
      ).then(response => {
        console.log(response);
        if (response.status == 200) {
              AsyncStorage.setItem('userToken', response.data)
          .then(async resp => {
            this.setState({ loading: false, showResponse: true, response: 'Registration Success', error: false });
            Actions.push('profession');
          })
          .catch(err => {
            console.log(err);
          })
        }
        else{
          this.setState({ loading: false, showResponse: true, response: response.data, error: true });
        }
      })
    } else {
      this.setState({ loading: false, showResponse: true, response: 'Password Mismatch', error: true });
    }
  }
  renderLoader() {
    return (
      <LoaderOverlay 
      label={'Signing You Up...'}
      />
    )
  }
  renderModal() {

    if (this.state.showResponse) {
      return (
        <AlertModal
          visible={this.state.showResponse}
          onRequestClose={() => {
            this.setState({ showResponse: false })
          }}
          onPress={() => {
            this.setState({ showResponse: false });
          }}
          error={this.state.error}
          response={this.state.response}
        />
      );
    }
  }


  render() {
    if(this.state.loading){
      return this.renderLoader()
    }else{
    return (    
        <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <View style={styles.ImageContainer}>
              {/* <Text style={styles.appName}>Lawgician</Text> */}
              <Image
                source={require('../../Assets/lawgicianLogo.jpeg')}
                style={{ padding:0, width:wp('90%'), height:hp('25%')}}
                />
              <Text style={{ marginTop:hp('1%'), fontSize:wp('6%'), fontWeight:"600"}}>Please Register</Text>
            </View>
            <View style={{paddingTop:hp('5%')}}>
              <TextField1
              iconStyle={{width:wp('6.9%'), height:hp('4%'), borderRadius:5}}
                name={require('../../Assets/user.png')}
                label={'Enter Full Name'}
                value={this.state.fullName}
                onChangeText={(fullName) => this.setState({ fullName: fullName })}
              />
              <TextField1
                name={require('../../Assets/close-envelope.png')}
                iconStyle={{width:wp('6%'), height:hp('3.2%'), borderRadius:5}}
                label={'Email Address'}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email: email })}
                keyboardType={'email-address'}
              />
              <TextField1
                name={require('../../Assets/phone-contact.png')}
                iconStyle={{width:wp('6%'), height:hp('3.2%'), borderRadius:5}}
                label={'Mobile Number'}
                value={this.state.mobileNumber}
                onChangeText={(mobileNumber) => this.setState({ mobileNumber: mobileNumber })}
                keyboardType={'phone-pad'}

              />
              <PasswordInput
               source={require('../../Assets/shield.png')}
               iconStyle={{ width: wp('6%'), height: hp('3.5%'), borderRadius: 5 }}
              value={this.state.password}
              onChangeText={(password) => this.setState({password: password})}
              />
              <PasswordInput
               source={require('../../Assets/login.png')}
               iconStyle={{ width: wp('6%'), height: hp('3.5%'), borderRadius: 5 }}
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
              />
            </View>
            <View style={styles.ButtonContainer}>
              {/** Touchable SignIn */}
              <Button1
                onPress={this.PostUser}
              >Register</Button1>
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
  lottie: {
    width: wp('25%'),
    height: hp('12%')
  },
  ButtonContainer: {
    paddingTop:hp('7%')
  },
  appName: {
    fontSize: wp('10%'),
    color: '#000',
    fontWeight: 'bold',
    paddingTop: hp('2.5%'),
  },
  ImageContainer: {
    // backgroundColor:'#ccc',
    width: wp('100%'),
    height: hp('28%'),
    alignItems: 'center',
  },
  logo: {
    width: wp('20%'),
    height: hp('15%')
  },
  container: {
    borderTopWidth: 0,
    alignItems: 'center',
  },

});
