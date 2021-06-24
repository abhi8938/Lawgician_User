import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, } from 'react-native'
import { inject } from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple } from 'react-native-paper';
import { loginServices } from '../services/loginServices';
import { observer } from 'mobx-react';

const UserCard = (props) => {
    return (
        <TouchableOpacity
            style={styles.userCardTouchable}
            onPress={props.onPress}
        >

            <Image
                style={[styles.userIcon, { resizeMode: 'cover' }]}
                source={props.source}
            />
            <View style={{ paddingLeft: wp('3%') }}>
                <Text style={{ fontSize: wp('4.5%'), fontWeight: 'bold' }}>{props.name}</Text>
                <Text style={{ fontSize: wp('3.6%'), color: '#A0A0A0' }}>View your profile</Text>
            </View>
        </TouchableOpacity>
    )
}
const Links = (props) => {
    return (
        <TouchableOpacity
            style={styles.touchable}
            onPress={props.onPress}
        >
            <View style={{ padding: wp('2%') }}>
                <Image
                    source={props.name}
                    style={{ width: wp('10%'), height: hp('5%'), resizeMode: 'contain' }}
                />
            </View>
            <Text style={styles.touchableText}>{props.children}</Text>
        </TouchableOpacity>
    )
}

type drawerPageProps = {
    login: loginServices,
  }
  
  @inject('login')
  @inject('article')
  @inject('notification')
  @inject('document')
  @observer
export default class DrawerMenu extends Component<drawerPageProps> {
    logOut = async () => {
       const isgoogle = await this.props.login.isGoogleSignedIn();
       const isfacebook = await this.props.login.isFacebookSignedIn();
        if(isgoogle){
        await this.props.login._googleSignOut();
        }
        if(isfacebook != null){
        
         this.props.login._faceBookSignOut();
        }
        await AsyncStorage.clear();
        this.props.navigation.navigate('signin')
    }
    render() {
        let source = this.props.login.profilePicture? {uri: this.props.login.profilePicture} : require('../Assets/profile.png'); 
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <UserCard name={this.props.login.fullName} source={source} onPress={() => this.props.navigation.navigate('profile')} />
                <Links name = {require('../Assets/shopping-store.png')} onPress={() => this.props.navigation.navigate('services')}>Services</Links> 
                <Links name = {require('../Assets/expenses.png')} onPress={() => this.props.navigation.navigate('billing')}>Generate Invoice</Links> 
                <Links name={require('../Assets/teamwork.png')} onPress={() => this.props.navigation.navigate('about')}>About Us</Links>
                <Links name={require('../Assets/term.png')} onPress={() => this.props.navigation.navigate('terms')}>Terms And Conditons</Links>
                <Links name={require('../Assets/privacy-policy.png')} onPress={() => this.props.navigation.navigate('privacy')}>Privacy Policies</Links>
                <Links name={require('../Assets/door.png')} onPress={this.logOut}>LogOut</Links>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userCardTouchable: {
        borderBottomColor: '#A0A0A0',
        borderBottomWidth: .5,
        flexDirection: 'row',
        padding: wp('3.5%'),
        
    },
    userIcon: {
        resizeMode: 'contain',
        width: wp('12%'),
        height: hp('7%'),
        borderRadius: 30
    },
    touchable: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
        paddingBottom: hp('1%'),
        paddingTop: hp('1%'),
        borderBottomWidth: .5,
        borderBottomColor: '#000',
    },
    touchableText: {
        textAlign: 'left',
        width: wp('70%'),
        marginLeft: wp('1.4%'),
        marginTop: hp('1.5%'),
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#132F58'
    }
})
