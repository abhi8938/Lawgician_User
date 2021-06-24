import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PasswordInput } from '../common/PasswordInput';
import LoaderOverlay from '../common/loaderOverLay';
import AlertModal from './../common/AlertModal';
import { loginServices } from '../services/loginServices';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import ImageResizer from 'react-native-image-resizer';
// import ImgToBase64 from 'react-native-image-base64';
var RNFS = require('react-native-fs');
import ImagePicker from './../Components/ImagePicker';
import autobind from 'autobind-decorator'
const CardItem = (props) => {
    return (
        <View style={{ flexDirection: 'row', marginBottom: hp('.5%'), marginTop: hp('1%'), marginRight: wp('3%') }}>
            <Icon
                style={{ marginTop: hp('.4%') }}
                size={27}
                name={props.name}
                color='#fff'
            />
            <View style={{ paddingLeft: wp('3%') }}>
                <Text style={styles.heading}>{props.Heading}</Text>
                <Text style={styles.subheading}>{props.children}</Text>
            </View>
        </View>
    );
}
type drawerPageProps = {
    login: loginServices,
}

@inject('login')
@observer
export default class ProfilePage extends Component<drawerPageProps> {
    state = {
        oldPassword: '',
        showModal: false,
        password: '',
        loading: false,
        showResponse: '',
        error: '',
        response: ''
    }

    @autobind
    resizeAndupload(uri: string) {
        ImageResizer.createResizedImage(uri, 512, 512, 'JPEG', 90).then((response) => {
            RNFS.readFile(response.uri, 'base64').then(res => this.props.login.setProfilePicture(`data:image/jpeg;base64,${res}`)).catch(err => console.log(`err34`, err));
            return
        }).catch((err) => {
            console.log(`err`, err);
        });
    }

    updatePassword = async () => {
        //TODO:update password request
        this.setState({ loading: true });
        if (this.state.password === '') {
            this.setState({ showResponse: true, response: 'newPassword should not be empty', error: true, loading: false, showModal: false });
            return;
        }
        if (this.state.oldPassword === '') {
            this.setState({ showResponse: true, response: 'oldPassword should not be empty', error: true, loading: false, showModal: false });
            return;
        }
        if (this.state.oldPassword === this.state.password) {
            const result = await this.props.login.resetPassword(this.state.password, this.state.oldPassword, this.props.login.customerId);
            if (result.status === 200) {
                this.setState({ showResponse: true, response: 'password updated', error: false, loading: false, showModal: false });
                return
            }
            this.setState({ showResponse: true, response: result.data, error: true, loading: false, showModal: false });
        }
    }

    renderLoader() {
        return (
            <LoaderOverlay
                label={'Updating Password....'}
            />
        )
    }
    renderAlertModal() {
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
    renderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showModal}
                onRequestClose={() => this.setState({ showModal: false })}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalheading}>Enter your old password</Text>
                    <PasswordInput
                        source={require('../Assets/shield.png')}
                        iconStyle={{ width: wp('6%'), height: hp('3.5%'), borderRadius: 5 }}
                        value={this.state.oldPassword}
                        onChangeText={(oldPassword) => this.setState({ oldPassword: oldPassword })}
                    />
                    <Text style={[styles.modalheading, { marginTop: hp('2%') }]}>Enter your new password</Text>
                    <PasswordInput
                        source={require('../Assets/login.png')}
                        iconStyle={{ width: wp('6%'), height: hp('3.5%'), borderRadius: 5 }}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password: password })}
                    />
                    <TouchableOpacity
                        onPress={this.updatePassword}
                        style={[styles.PasswordButton, { backgroundColor: '#D8B25A' }]}>
                        <Text
                            style={[styles.passwordText, { color: '#fff' }]}
                        >Update Password</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
    render() {
        if (this.state.loading) {
            return this.renderLoader()
        } else {
            return (
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    {/**userCard */}
                    <View style={styles.firstContainer}>
                        <ImagePicker style={styles.imagePicker} source={this.props.login.profilePicture}
                            onImageLoaded={it => this.resizeAndupload(it)} />
                        <Text style={styles.name}>{this.props.login.fullName}</Text>
                        <Text style={styles.something}>{this.props.login.userProfession}</Text>
                    </View>
                    {/*contact card */}
                    <LinearGradient
                        locations={[0.3, 1]}
                        start={{ x: 0.2, y: 0.1 }} end={{ x: 0.5, y: 1.2 }}
                        colors={['#D8B25A', '#6D6C68']} style={styles.secondContainer}>
                        <CardItem name='phone' Heading='MOBILE'>{this.props.login.userMobile}</CardItem>
                        <CardItem name='email' Heading='EMAIL'>{this.props.login.userEmail}</CardItem>
                        <CardItem name='home' Heading='ADDRESS'>19, third floor, gagan vihar extension, New Delhi, 110094</CardItem>
                        <TouchableOpacity
                            onPress={() => this.setState({ showModal: true })}
                            style={styles.PasswordButton}>
                            <Text
                                style={styles.passwordText}
                            >Change Password</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    {/* Personal Info*/}
                    {this.renderModal()}
                    {this.renderAlertModal()}
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    imagePicker: {
        margin: 0,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 7

    },
    modalheading: {
        fontSize: wp('5%'),
        marginLeft: wp('3.5%'),
        color: '#6D6C68',
        fontWeight: '500'
    },
    modalContainer: {
        backgroundColor: '#fff',
        marginTop: hp('30%'),
        paddingLeft: wp('1%'),
        paddingRight: wp('1%'),
        paddingTop: hp('3%'),
        width: wp('92%'),
        height: hp('41%'),
        borderRadius: 5,
        elevation: 5,
        alignSelf: "center"
    },
    passwordText: {
        textAlign: 'center',
        width: wp('34%'),
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#6D6C68'
    },
    PasswordButton: {
        marginTop: hp('2%'),
        alignSelf: 'center',
        padding: wp('3.5%'),
        backgroundColor: '#fff',
        borderRadius: 5
    },
    heading: {
        fontSize: wp('3.9%'),
        color: '#fff',
        fontWeight: '400'
    },
    subheading: {
        width: wp('80%'),
        fontWeight: '500',
        color: '#fff',
    },
    something: {
        textAlign: 'center',
        width: wp('100%'),
        color: '#A9A9A9'
    },
    name: {
        textAlign: 'center',
        width: wp('100%'),
        fontWeight: '500',
        fontSize: wp('6%'),
        marginBottom: hp('.8%'),
        marginTop: hp('2%'),
    },
    ImageProfile: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 4,
    },
    firstContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('100%'),
        paddingTop: hp('6%'),
        paddingBottom: hp('5%')
    },
    secondContainer: {
        flex: 1,
        paddingLeft: wp('3%'),
        padding: wp('4%'),
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
        marginRight: wp('4%'),
        marginLeft: wp('4%'),
        backgroundColor: '#FFFFFF',
        borderColor: '#fff',
        borderRadius: 5,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 6,
    },
    thirdContainer: {
        paddingLeft: wp('3%'),
        padding: wp('4%'),
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
        marginRight: wp('4%'),
        marginLeft: wp('4%'),
        backgroundColor: '#FFFFFF',
        borderColor: '#fff',
        borderRadius: 1,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 6,
    }

})
