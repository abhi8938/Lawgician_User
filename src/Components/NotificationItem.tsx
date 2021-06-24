import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableRipple } from 'react-native-paper';

type notificationItemProps ={
    type:string
    title:string
    body:string
    ImageSource?:any
    onPress?:(() => void)
}

export default class NotificationItem extends Component<notificationItemProps> {
    renderImage(){
        return(
            <Image
            source={this.props.ImageSource}
            style={{ width:wp('11%'), height:hp('5%')}}
            />
        )
    }
    render() {
        return (
            <TouchableRipple
            style={{width:'100%'}}
            onPress={this.props.onPress}
            >
                <View style={{width:'100%',borderColor:'#ccc',borderTopWidth:.5, borderBottomWidth:.5, flexDirection:'row', paddingLeft:wp('3%'), paddingTop:hp('1.5%'),paddingBottom:hp('1.5%')}}>
               {this.renderImage()}
                <View style={{paddingLeft:wp('2%'),justifyContent:'space-between',width:'70%'}}>
                <Text style={{fontSize:wp('4.3%'),fontWeight:'bold'}}>{this.props.title}</Text>
                <Text style={{fontSize:wp('3.8%'),width:'100%'}}>{this.props.body}</Text>
                </View>
                </View>
            </TouchableRipple>
        )
    }
}

