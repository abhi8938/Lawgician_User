import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ServiceItem from './../common/ServiceItem';
import { getServices } from '../constants/Services';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
@observer
export default class ServicesScreen extends Component {

  @observable
  Services:any = []

  componentDidMount = () => {
         this.Services = getServices() 
  };
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{ padding:wp('2%'),
            backgroundColor:'#fff',
            paddingBottom:hp('1%')}}>
            {this.Services.map((element:any) =>{
              return(
                <ServiceItem
                key={element.Title}
                style={{ width:wp('30%'),borderTopLeftRadius:4, borderBottomLeftRadius:4, backgroundColor:'#ccc', height:hp('25%')}}
                source={element.Image}
                features={element.Features}
                onPress={() => this.props.navigation.navigate('serviceDetail',{element})}
                >{element.Title}</ServiceItem>
              )
            })}            
              
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
      },
    card:{
        borderRadius:5,
      borderWidth:2,
      borderColor:'#ccc',
      padding:wp('4%'),
      marginTop:hp('1%')
    },
    heading:{
        fontSize:wp('5%'),
        fontWeight:'600',
        color:'#132F58'
    }
})

