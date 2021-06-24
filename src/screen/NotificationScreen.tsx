import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NotificationItem from './../Components/NotificationItem';
import { notificationServices } from '../services/notificationServices';
import { inject, observer } from 'mobx-react';

type notifyScreen = {
    notification:notificationServices
}

@inject('notification')
@observer
export default class NotificationScreen extends Component<notifyScreen> {
    render() {
        if(this.props.notification.userNotifications.length === 0 || this.props.notification.userNotifications === undefined){
            return(
                <View style={{ width:'100%',height:'100%', alignItems: 'center', justifyContent: 'center', backgroundColor:'#fff' }}>
                    <Text style={{ fontSize: wp('8%'), fontWeight: 'bold' }}>No Notification yet</Text>
                </View>
            )
        }
        return (
            <ScrollView style={{ flex:1, backgroundColor:'#fff'}}>
                {this.props.notification.userNotifications.map(element => {
                    return(
                        <NotificationItem key={element._id} ImageSource={require('../Assets/three.png')}  type={element.Type} title={element.Title} body={element.body}/>
                    )
                })}           
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({})
