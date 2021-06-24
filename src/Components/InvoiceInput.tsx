import React, { Component, } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, StyleProp, TextStyle, ViewStyle } from 'react-native'
import CustomTextInput from './CustomTextInput';

type InvoiceItemProps = {
    Style?: StyleProp<ViewStyle>
    item: string
    additional: string
    price: string
    qty: string
    amount: string
    textStyle?: StyleProp<TextStyle>
    onChangeItem: (text: string) => void
    onChangeAdditional: (text: string) => void
    onChangePrice: (text: string) => void
    onChangeQty: (text: string) => void
    onFocusItem:() => void
    onBLurItem:() => void
    onBLurPrice:() =>void
    onFocusPrice:() => void
    onFocusQty:() => void
    onBlurQty:() => void
    onFocusAdditional:() => void
    onBlurAdditional:() => void
}

export default class InvoiceInput extends Component<InvoiceItemProps> {

    render() {
        const rs = (this.props.qty === 'Qty') ? '' : '₹';
        return (
            <View style={{ width: '99%', paddingLeft:'.5%' }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <CustomTextInput
                     onFocus={this.props.onFocusItem}  
                     onBlur={this.props.onBLurItem}
                        containerStyle={{ flexDirection: 'row', alignItems: 'center', width: '45%' }}
                        style={[styles.textInput, { width: '97%', paddingLeft: 6, textAlignVertical: 'top', paddingTop: 4 }]}
                        value={this.props.item}
                        onChangeText={this.props.onChangeItem}
                        multiline={true}
                        lines={1}
                    />
                    <View style={{ width: '55%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <CustomTextInput
                          onFocus={this.props.onFocusPrice}  
                          onBlur={this.props.onBLurPrice}
                            containerStyle={{ flexDirection: 'row', alignItems: 'center', width: '42%' }}
                            style={[styles.textInput, { width: '100%', paddingLeft: 7 }]}
                            value={this.props.price}
                            onChangeText={this.props.onChangePrice}
                        />
                        <CustomTextInput
                          onFocus={this.props.onFocusQty}  
                          onBlur={this.props.onBlurQty}
                            containerStyle={{ flexDirection: 'row', alignItems: 'center', width: '20%' }}
                            style={[styles.textInput, { width: '100%', textAlign: 'center', paddingLeft: 3 }]}
                            value={this.props.qty}
                            onChangeText={this.props.onChangeQty}
                        />
                        <Text
                            style={[styles.textInput, { width: '30%', paddingLeft: 8, borderRadius: 4, padding: 5 }]}
                        >{this.props.amount}</Text>
                    </View>

                </View>
                <CustomTextInput
                  onFocus={this.props.onFocusAdditional}  
                  onBlur={this.props.onBlurAdditional}
                    containerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}
                    style={[styles.textInput, { width: '95%', paddingLeft: 6, textAlignVertical: 'top', paddingTop:4 }]}
                    value={this.props.additional}
                    onChangeText={this.props.onChangeAdditional}
                    multiline={true}
                    lines={2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    textInput: {
        width: '94%',
        fontSize: 15,
        backgroundColor: 'rgba(85,85,85,0.2)',
        padding: 2,
        marginBottom: 10
    },
})
