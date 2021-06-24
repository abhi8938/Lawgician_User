import { reaction, observable, } from 'mobx';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import autobind from 'autobind-decorator';
import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from './../constants/endpoint';
GoogleSignin.configure();
@autobind
export class loginServices {

  @observable
  customerId: string = ''

  @observable
  fullName: string | null = ''

  @observable
  userEmail: string = ''

  @observable
  userMobile: string = ''

  @observable
  userProfession: string = ''

  @observable
  signInMethod: string = '';

  @observable
  Address: string = '';

  @observable
  profilePicture: string = '';

  async setProfilePicture(profilePicture: string) {
    this.profilePicture = profilePicture;
    if (this.customerId == null) {
      return;
    }
    const userToken = await AsyncStorage.getItem('userToken');
     let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userToken
      }
    };

   return axios.put(BASE_URL + '/users/profilePicture',{ customerId:this.customerId, profilePicture },config).then(res => res).catch(err => console.log(`err`,err.response))
  }

  createUserToken = async (
    emailAddress: string,
    password: string
  ) => {

    return axios.post(BASE_URL + '/auth', {
      emailAddress,
      password
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      })
  }

  CreateUser = async (
    fullName: string | null,
    emailAddress: string,
    mobileNumber: string,
    password: string,
    SigninMethod: string
  ) => {
    if (fullName === null) {
      return;
    }
    const success = 'Success';
    return axios.post(BASE_URL + '/users', {
      fullName,
      emailAddress,
      mobileNumber,
      password,
      SigninMethod
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return error.response
      });
  }

  async getUserCard() {

    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userToken
      }
    };

    return axios.get(BASE_URL + '/users/me', config)
      .then(response => {
        if (response.status === 200) {
          this.customerId = response.data.customerId;
          this.userEmail = response.data.emailAddress;
          this.fullName = response.data.fullName;
          if (response.data.Profession !== undefined) {
            this.userProfession = response.data.Profession;
          }
          if (response.data.Address !== undefined) {
            this.Address = response.data.Address
          }
          this.userMobile = response.data.mobileNumber;
          this.signInMethod = response.data.SigninMethod;
          if(response.data.profilePicture !== undefined){
          this.profilePicture = response.data.profilePicture
        }
        }
        console.log('userData', this.fullName, this.customerId, this.userEmail, this.userMobile, this.signInMethod);
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      })
  }

  getUserfromfacebook = async (token: string) => {
    return axios.get('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
      .then(response => {
        this.signInMethod = 'FACEBOOK'
        this.userEmail = response.data.email;
        this.fullName = response.data.name;
        return response
      })
      .catch(err => err);
  }

  getUserFromGoogle = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
  }

  isGoogleSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  };
  isFacebookSignedIn = async () => {
    return await AccessToken.getCurrentAccessToken();
  }

  _googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userinfo = await GoogleSignin.signIn();
      this.userEmail = userinfo.user.email;
      this.fullName = userinfo.user.name;
      this.signInMethod = 'GOOGLE'
      return 'SUCCESS';
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return 'CANCELED BY USER'
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return 'PLAY SERVICE NOT AVAILABLE'
      } else {
        return error
      }
    }
  }
  _facebookSignIn = async () => {
    return LoginManager.logInWithPermissions(["email", "public_profile"]).then(async (result) => {
      if (result.isCancelled) {
        return 'USER CANCELLED'
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        const user = await this.getUserfromfacebook(data.accessToken);
        if (user.status === 200) {
          return data;
        } else {
          return 'LOGIN FAILED'
        }
      }
    },
    ).catch(err => err);

  }

  async CreateTokenSocial(email: string) {

    let config = {
      headers: {
        'Content-Type': 'application/json',
        'emailaddress': email
      }
    };

    return axios.get(BASE_URL + '/users', config)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      })

  }

  _googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(`logout google`, error);
    }
  }
  _faceBookSignOut = () => {
    return LoginManager.logOut();
  }

  addProfession = async (Profession: string, customerId: string) => {
    const userToken = await AsyncStorage.getItem('userToken');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userToken
      }
    };
    return axios.put(BASE_URL + '/users/profession', { Profession, customerId }, config)
      .then(res => res)
      .catch(err => err.response);

  }

  resetPassword = async (newPassword: string, oldPassword: string, customerId: string) => {
    const userToken = await AsyncStorage.getItem('userToken');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userToken
      }
    };
    return axios.put(BASE_URL + '/users/password', { newPassword, oldPassword, customerId }, config)
      .then(res => res)
      .catch(err => err.response);
  }
}
