import React, { Component, Children } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, StyleProp,  ViewStyle, TextStyle } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type customButtonProps ={
renderIcon:boolean
Icon?:any
Children?:any
Style?:StyleProp<ViewStyle>
textStyle?:StyleProp<TextStyle>
onPress?:(() => void)
}

export default class CustomButton extends Component<customButtonProps> {
    renderIcon(){
        if(this.props.renderIcon){
        return(
            <Image
            source={this.props.Icon}
            style={{ width:wp('10%'), height:hp('5%'), resizeMode:'contain'}}
            />
        )
    }
    }
    render() {
        return (
            <TouchableOpacity
            onPress={this.props.onPress}
            style={[styles.touchable,this.props.Style]}
            >
                {this.renderIcon()}  
                <Text style={this.props.textStyle}>{this.props.children}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchable:{
       flexDirection:'row',
       paddingLeft: wp('.8%'),
       paddingTop: hp('.3%'),
       paddingBottom: hp('.3%'), 
       alignItems: 'center',
       elevation: 4
    }
})
