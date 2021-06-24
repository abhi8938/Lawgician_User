import React, { Component, } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from './CustomButton';

type customItemProps = {
    renderImage: boolean
    Image?: any
    color?: any
    onPress?:any
    TopText?: string
    date?: string
    Note?: boolean
    body?: string
    time?: string
    Style?: any
    title?:string
    transform?:any
}

export default class CustomItem extends Component<customItemProps> {

    renderTopText() {
        return (
            <Text style={[styles.TopText, this.props.color]}>{this.props.TopText}</Text>
        )
    }
    renderImage() {
        if (this.props.renderImage) {
            return (
                <Image
                    source={this.props.Image}
                    style={{ width: wp('14.5%'), height: hp('9%'), resizeMode: 'contain' }}
                />
            )
        }
    }
    renderNote() {

        let title = this.props.title? <Text style={[{ fontSize: wp('3%') }, this.props.color]}>{this.props.title}</Text>: null;

        if (this.props.Note) {
            return (
                <View style={styles.NoteContainer}>
                    {title}
                    <Text style={[styles.body]}>{this.props.body}</Text>
                </View>
            )
        }
    }
    renderDateAndTime() {
        return (
            <Text style={[styles.date]}>{this.props.date}, {this.props.time}</Text>
        )
    }
    renderButton() {
        if (this.props.renderImage) {
            return (
                <CustomButton onPress={this.props.onPress} Icon={require('../Assets/download.png')} Style={styles.button} renderIcon={true} />
            )
        }
    }
    render() {
        return (
            <View style={[styles.container, this.props.Style]}>
                <View style={this.props.transform}>
                {this.renderTopText()}
                <View style={{ flexDirection: 'row', paddingTop: hp('1%') }}>
                    <View>
                        {this.renderImage()}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: hp('1%'), borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                        {this.renderNote()}
                        {this.renderButton()}
                    </View>
                </View>
                {this.renderDateAndTime()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
    },
    container: {
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        paddingLeft: wp('3%'),
        paddingRight: wp('3%'),
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        marginRight: wp('1%'),
        marginLeft: wp('1%'),
        backgroundColor: '#FFFFFF',
        borderColor: '#fff',
        borderRadius: 5,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    TopText: {
        marginLeft: wp('1%'),
        fontSize: wp('3.5%'),
        color: '#505358',
        fontWeight: 'bold',
    },
    NoteContainer: {
       width:wp('33%'), 
        paddingLeft: wp('2%')
    },
    date: {
        marginTop: hp('.5%'),
        fontSize: wp('2.5%'),
        alignSelf: 'flex-end'
    },
    body: {
        fontSize: wp('3.5%'),
        flex: 1,
        marginBottom: hp('.8%')
    }
})
