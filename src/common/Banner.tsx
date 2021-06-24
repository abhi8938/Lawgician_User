import React, { Component } from 'react'
import { Image, View , StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const Banner = (props) =>{
    return(
        <View style={styles.card}>
        <Image
        style={props.style}
        source={props.source}
        />
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }
})