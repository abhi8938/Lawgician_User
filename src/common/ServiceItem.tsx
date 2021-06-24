import React, { Component } from 'react'
import { Text, StyleSheet, View ,Alert} from 'react-native'
import { Banner } from './Banner';
import { TouchableRipple } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type serviceProps = {
   style?:any,
   source?:any,
   onPress?:any,
   features:Array<string>
}


export default class ServiceItem extends Component<serviceProps> {

    accountFeatures(){
        return(<View>
            <Text style={{ fontSize:wp('3.5%')}}>•<Text style={{fontSize:wp('3.5%')}}>Periodic Analysis of data</Text></Text>
            <Text style={{ fontSize:wp('3.5%')}}>•<Text style={{fontSize:wp('3.5%')}}>Regular auditing(at least ones in a quarter)</Text></Text>
            <Text style={{ fontSize:wp('3.5%')}}>•<Text style={{fontSize:wp('3.5%')}}>Audit of revenue expenditure</Text></Text>
            <Text style={{ fontSize:wp('3.5%')}}>•<Text style={{fontSize:wp('3.5%')}}>Monthly Information Analysis</Text></Text>
            <Text style={{ fontSize:wp('3.5%')}}>•<Text style={{fontSize:wp('3.5%')}}>Personal meetings between C.A</Text></Text>
        </View>)
    }
    renderFeatures(){
        if(this.props.children === 'Account Related Services'){
            return this.accountFeatures()
        }
      return(this.props.features.map(element =>{
            return <Text style={{ fontSize:wp('3.5%')}}>•<Text style={{fontSize:wp('3.5%')}}>{element}</Text></Text>
       }))
    }
    render() {
        return (
            <TouchableRipple 
            style={styles.card}
            onPress={this.props.onPress}
            >
                <View style={{flexDirection:'row'}}>
                <Banner style={this.props.style} 
                source={this.props.source} />
                <View style={{flex:1,  paddingLeft:wp('3%'),paddingTop:hp('1.5%'), paddingBottom:hp('1%')}}>
                <Text style={styles.heading}>{this.props.children}</Text>
                 {this.renderFeatures()}
                </View>
                </View>
            </TouchableRipple>
        )
    }
}

const styles = StyleSheet.create({
   
    card:{
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        marginRight: wp('1%'),
        marginLeft: wp('1%'),
        backgroundColor: '#FFFFFF',
        borderColor: '#fff',
        borderRadius: 5,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    heading:{
        fontSize:wp('5.5%'),
        fontWeight:'900',
        color:'#132F58',
        textAlign:'center'
    }
})
