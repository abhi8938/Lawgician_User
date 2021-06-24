import React, { Component, } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, StyleProp, TextStyle, ViewStyle } from 'react-native'

type InvoiceItemProps = {
    Style?: StyleProp<ViewStyle>
    description:string
    additional?:string
    price:number | string
    qty:number | string
    amount:number | string
    textStyle?:StyleProp<TextStyle>
}

export default class InvoiceItem extends Component<InvoiceItemProps> {

    render() {
const rs = (this.props.qty === 'Qty') ? '':'₹';
        return (
            <View style={this.props.Style}>
               <View style={{width:'50%',flexDirection:'row',marginRight:'2%'}}>
               <Text style={this.props.textStyle}>{this.props.description}</Text>
               <Text style={this.props.textStyle}>{this.props.additional}</Text>
               </View>
               <View style={{width:'48%', flexDirection:'row',justifyContent:'space-around'}}>
               <Text style={[this.props.textStyle,{width:'37%'}]}>{rs+this.props.price.toString()}</Text>
               <Text style={[this.props.textStyle,{width:'23%'}]}>{this.props.qty.toString()}</Text>
               <Text style={[this.props.textStyle,{width:'37%'}]}>{rs+this.props.amount.toString()}</Text>
            </View>
            </View>
        )
    }
}

