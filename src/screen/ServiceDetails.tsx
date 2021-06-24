import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView,Image, ImageBackground, View } from 'react-native'
import { Button1 } from '../common';
import { orderServices } from '../services/orderServices';
import { inject, observer } from 'mobx-react';
import { loginServices } from '../services/loginServices';
import AlertModal from '../common/AlertModal';
import { observable } from 'mobx';
import LoaderOverlay from './../common/loaderOverLay';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
type detailProps = {
    element:any,
    order:orderServices,
    login:loginServices
}
@inject('order')
@inject('login')
@observer
export default class ServiceDetails extends Component<detailProps> {

    @observable
    showResponse:boolean = false;

    @observable
    error:boolean = false

    @observable
    errorMessage:string = ''

    @observable
    loading:boolean = false

    @observable
    loadingText:string = 'Generating Order'


   async generateOrder(){
     this.loading = true
     const Customer = {
         name:this.props.login.fullName,
         email:this.props.login.userEmail,
         mobile:this.props.login.userMobile
     }
     const response = await this.props.order.createOrder(this.props.login.customerId,Customer,this.props.element.Price,'PENDING',this.props.element.Title);
     if(response.status === 200){
         this.loading = false
         this.showResponse = true;
         this.error = false;
         this.errorMessage = response.data
     return
    }else{
        this.loading = false
        this.showResponse = true;
        this.error = true;
        this.errorMessage = response.data
    return
    }
    }
    renderAlertModal() {
        return (
            <AlertModal
                visible={this.showResponse}
                onRequestClose={() => this.showResponse = false}
                error={this.error}
                response={this.errorMessage}
            />
        );
    }

    renderLoader() {
        return (
            <LoaderOverlay label={this.loadingText} />
        )
    }

    renderQuote(){
        if(this.props.element.Info.Quote1 !== undefined){
            return(
                <View style={[styles.divisions,{backgroundColor:'#282C34'}]}><Text style={{ fontSize:wp('4.5%'),color:'#fff'}}>{this.props.element.Info.Quote1}</Text></View>
            )
        }
    }
    renderTitle2Para2(){
        if(this.props.element.Info.Title2 !== undefined){
            return(
                <View style={styles.divisions}>
                    <Text style={styles.Heading}>{this.props.element.Info.Title2}</Text>
                    <Text style={styles.para}>{this.props.element.Info.Para2}</Text>
                </View>
            )
        }
    }
    renderSubtitle(){
        if(this.props.element.Info.SubTitle !== undefined){
            return(
                <Text style={{fontSize:wp('4.8%'),color:'#4B4A46',marginBottom:hp('1%')}}>{this.props.element.Info.SubTitle}</Text>
            )
        }
    }
    renderTitle3Para3(){
        if(this.props.element.Info.Title3 !== undefined){
            return(
                <View style={styles.divisions}>
                    <Text style={styles.Heading}>{this.props.element.Info.Title3}</Text>
                   {this.renderSubtitle()}
                    <Text style={styles.para}>{this.props.element.Info.Para3}</Text>
                </View>
            )
        }
    }
    whatwedo(){
        if(this.props.element.Title === 'Corporate Law'){
            return
        }
        return(<Text style={[styles.Heading,{marginLeft:wp('4%'),marginBottom:hp('1%')}]}>What we do?</Text>)
    }
 
    render() {
        if (this.loading) {
            return this.renderLoader()
        }
        return (
            <ScrollView style={{flex:1}} contentContainerStyle={{backgroundColor:'#fff'}}>
                <ImageBackground
                source={this.props.element.Image}
                style={styles.ImageBackground}
                >
                    <View style={styles.overlay}/>
                    <Text style={styles.Title}>{this.props.element.Title}</Text></ImageBackground>
                <View style={styles.divisions}>
                    <Text style={styles.Heading}>{this.props.element.Info.Title1}</Text>
                    <Text style={styles.para}>{this.props.element.Info.Para1}</Text>
                </View>
                {this.renderQuote()}
                {this.renderTitle2Para2()}
                {this.renderTitle3Para3()}
                {this.whatwedo()}
                <View style={{paddingLeft:wp('4%'),paddingBottom:hp('1%')}}>
                    {this.props.element.Features.map((element, index) =>{
                        return(<Text style={{fontSize:wp('4%')}}>{index + 1}.{element}</Text>)
                    })}
                </View>
                <Button1 onPress={() => this.generateOrder()}>Place Order</Button1>
                {this.renderAlertModal()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    para:{
        fontSize:wp('4%'),
        color:'#000'
    },
    Heading:{
     fontSize:wp('6.5%'),
     fontWeight:'bold',
     color:'#314952',
     marginBottom:hp('.5%'),
     marginTop:hp('.5%')
    },
    ImageBackground:{
        width:'100%',
        height:hp('30%'),
        alignItems:'center',
        justifyContent:'center',
    },
    Title:{
        textAlign:'center',
        fontSize:wp('7%'),
        fontWeight:'bold',
        color:'#fff',
        width:'99%'
    },
    overlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    divisions:{
        paddingLeft:wp('4%'),
            paddingRight:wp('4%'),
        paddingTop:hp('1.5%'),
        paddingBottom:hp('1.5%')
    }
})
