import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Banner } from './../common/Banner';


export default class AboutUs extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Making a difference is our practice.</Text>
                <Banner style={styles.Banner} source={require('../Assets/about_us_1.jpg')} />
                <Text style={styles.body}>“Lawgician assist clients with virtually every issue a business or an individual may face. Every engagement receives our professional’s full focus and the benefit of decades of collective wisdom and experience. We look beyond the books to craft sophisticated solutions to our clients’ legal and business problems with creativity and flexibility that anticipate the marketplace, always mindful that efficiency and diligence are critical to the bottom line. Of paramount importance to us is to deliver workable, practical plans and strategies that make sense from all legal and business aspects. Our mission is to provide the best professional service for our clients. We are committed to: understanding our client’s unique needs, achieving creative, practical, and effective solutions, working hard for the success of our clients and the firm and encouraging an entrepreneurial approach to practice development”
                </Text>
                <Text style={[styles.heading, { marginTop: hp('2%') }]}>Our clients do great things. We only assist.</Text>
                <Banner style={styles.Banner} source={require('../Assets/about_us_2.jpg')} />
                <Text style={styles.body}>We are a full service firm with the sole aim of providing the best advisory service to our clients. Our strength is our team of experienced and trained lawyers who treasure the value of diligence and knowledge as well as creativity and innovation in addressing our client’s needs.
                </Text>
                <Text style={[styles.body, { marginTop: hp('1%') }]}>This firm’s strength is its team of experienced and trained as well as young professionals who treasure the value of diligence and knowledge as well as creativity and innovation in addressing their client’s needs. Lawgician aims to offer to its clients, professional advice that meets the clients’ needs and expectations.
                </Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Banner: {
        width: wp('93%'), 
        borderRadius: 1, 
        marginTop: hp('2%'), 
        marginBottom: hp('1%'),
        height: hp('30%'),
        
    },
    container: {
        backgroundColor: '#fff',
        padding: wp('4%')
    },
    heading: {
        fontSize: wp('6%'),
        fontWeight: 'bold'
    },
    body: {
        fontSize: wp('4%'),
        marginTop: hp('2%'),
        width: wp('90%')
    }
})
