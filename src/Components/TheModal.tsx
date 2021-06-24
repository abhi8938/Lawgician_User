import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Image, KeyboardAvoidingView } from 'react-native'
import CustomButton from './CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomTextInput from './CustomTextInput';

type theModalProps = {
    visible: boolean
    close: (() => void)
    ImageSource?: any
    Note: string
    onChangeText?: (text: string) => void
    onSend?:(() => void)
    imageButtonText?:string
    fileButtonText?:string
    uploadImage?:(() => void)
    uploadFile?:(() => void)
}



export default class TheModal extends Component<theModalProps> {


    renderUploadSection() {
        return (
            <View style={{ flexDirection: 'row', paddingTop: wp('2%'), paddingBottom: hp('2%') }}>
                <Image
                    source={this.props.ImageSource}
                    style={{ width: wp('25%'), height: hp('16%'), resizeMode: 'contain' }}
                />
                <View style={{ paddingLeft: wp('3%'), flex: 1, justifyContent: 'space-around' }}>
                    <CustomButton onPress={this.props.uploadImage} textStyle={{ color: '#E4E5E9', paddingLeft: wp('2%'), fontSize: wp('4.5%'), fontWeight: 'bold', paddingRight:wp('3%')}} Style={styles.Button} renderIcon={true} Icon={require('../Assets/camera.png')} >{this.props.imageButtonText}</CustomButton>
                    <CustomButton onPress={this.props.uploadFile} textStyle={{ color: '#E4E5E9', paddingLeft: wp('2%'), fontSize: wp('4.5%'), fontWeight: 'bold' }} Style={styles.Button} renderIcon={true} Icon={require('../Assets/doc.png')}>{this.props.fileButtonText}</CustomButton>
                </View>
            </View>
        )
    }
    renderNoteSection() {
        return (
                <CustomTextInput style={{ color: '#777777', height: hp('20%'), backgroundColor: '#E4E6E5', textAlignVertical: 'top' }} Label={true} labelText='Add Note' value={this.props.Note} onChangeText={this.props.onChangeText} />
        )
    }
    renderBottomButtons() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <CustomButton onPress={this.props.close} textStyle={{ color: '#fff', fontSize: wp('4.5%'), fontWeight: 'bold', }} Style={styles.BottomButton} renderIcon={false}>Cancel</CustomButton>
                <CustomButton onPress={this.props.onSend} textStyle={{ color: '#fff', fontSize: wp('4.5%'), fontWeight: 'bold', }} Style={styles.BottomButton} renderIcon={false}>Send</CustomButton>
            </View>
        )
    }
    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.close}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={-240}
                    style={{ flex: 1, backgroundColor: '#ccc', opacity: 0.9, alignItems: 'center', justifyContent: 'center' }}
                    behavior="position"
                    enabled
                >

                    <View style={styles.modalContainer}>
                        {this.renderUploadSection()}
                        {this.renderNoteSection()}
                        {this.renderBottomButtons()}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    BottomButton: {
        borderRadius:4,
        backgroundColor:'#F3D55B',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('30%'),
        paddingTop: hp('1.5%'),
        paddingBottom: hp('1%'),
    },
    Button: {
        width: wp('50%'),
        backgroundColor: '#055888',
        borderRadius: 4,
        paddingTop: hp('.5%'),
        paddingLeft: wp('1%'),
        paddingBottom: wp('1%')
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        width: wp('90%'),
        opacity: 1,
        elevation: 5,
        padding: wp('4%')
    }
})
