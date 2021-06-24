import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Image, StyleProp,  TextStyle, ViewStyle } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type CustomeTextProps ={
    Label?:boolean
    labelText?:string
    icon?:boolean
    style?:StyleProp<TextStyle>
    value:string
    onChangeText:(text: string) => void
    IconSource?:any
    onFocus?:any
    onBlur?:any
    labelStyle?:StyleProp<TextStyle>
    containerStyle?:StyleProp<ViewStyle>
    lines?:number
    multiline?:boolean
}

export default class CustomTextInput extends Component<CustomeTextProps>{
    renderText(){
        if( this.props.Label){
            return(
                <Text style={[styles.label,this.props.labelStyle]}>{this.props.labelText}</Text>
            )
        }
    }
    renderIcon(){
        if(this.props.icon){
            return(
                <Image
                source={this.props.IconSource}
                style={{ marginBottom:hp('1.5%'), width:wp('9%'), height:hp('4.5%'), resizeMode:'contain'}}
                />
            )
        }
    }
    render(){
    return(
    <View style={this.props.containerStyle}>
        {this.renderText()}
           <View style={[{flexDirection:'row', alignItems:'center'}]}>
               {this.renderIcon()}
              <TextInput
                 style={[styles.textinput, this.props.style]}
                 value = {this.props.value}
                 onChangeText={this.props.onChangeText}  
                 onFocus={this.props.onFocus}
                 onBlur={this.props.onBlur}
                 numberOfLines={this.props.lines}
                 multiline={this.props.multiline}
            />
            </View>
            </View>
    )
    }
}

const styles = StyleSheet.create({
    label:{
        fontSize:wp('5%'),
        color:'#000',
        fontWeight:'bold',
        marginBottom:hp('1.5%')
    },
    textinput:{
        paddingLeft:wp('3%'),
        marginBottom:hp('1.2%'),
        fontSize:wp('5.2%'),
        borderRadius:4,
      width:wp('80%'),
     
    },
})
