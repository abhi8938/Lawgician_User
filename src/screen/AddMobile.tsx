import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { observer, inject } from 'mobx-react';
import LoaderOverlay from './../common/loaderOverLay';
import AlertModal from './../common/AlertModal';
import { loginServices } from '../services/loginServices';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { observable } from 'mobx';
import { Button1, TextField1 } from '../common';
import { Actions } from 'react-native-router-flux';

type addMobileProps = {
    login: loginServices
}


@inject('login')
@observer
export default class AddMobile extends Component<addMobileProps> {

    @observable
    showResponse: boolean = false;

    @observable
    error: boolean = false;

    @observable
    response: string = '';

    @observable
    loading: boolean = false;

    @observable
    mobileNumber: string = '';

    addUserSocial = async () => {
        if (this.mobileNumber.length !== 10) {
            this.showResponse = true;
            this.error = true;
            this.response = 'Invalid Number';
            return
        }
        this.loading = true;
        const user = await this.props.login.CreateUser(this.props.login.fullName, this.props.login.userEmail, this.mobileNumber, this.mobileNumber,this.props.login.signInMethod);
        if (user.status === 200) {
            await AsyncStorage.setItem('userToken', user.data);
            this.loading = false;
            Actions.replace('profession');
            return
        }
        this.loading = false;
        this.showResponse = true;
        this.error = true;
        this.response = user.data;
        return
    }

    renderModal() {

        if (this.showResponse) {
            return (
                <AlertModal
                    visible={this.showResponse}
                    onRequestClose={() => this.showResponse = false}
                    onPress={() => this.showResponse = false}
                    error={this.error}
                    response={this.response}
                />
            );
        }
    }
    renderLoader() {
        return (
            <LoaderOverlay
                label={'Adding Mobile Number...'}
            />
        )
    }

    render() {
        if (this.loading) {
            return this.renderLoader();
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: hp('2%') }}>
                    <TextField1
                        name={require('../Assets/phone-contact.png')}
                        iconStyle={{ width: wp('6%'), height: hp('3.2%'), borderRadius: 5 }}
                        label={'Mobile Number'}
                        value={this.mobileNumber}
                        onChangeText={(mobileNumber: string) => this.mobileNumber = mobileNumber}
                        keyboardType={'phone-pad'}

                    />
                    <Button1
                        onPress={this.addUserSocial}
                    >Add</Button1>
                    {this.renderModal()}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({})
