import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class TermsAndCondition extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.guidelines, {fontSize:wp('5%')}]}>• Please read the following terms and conditions carefully as it sets out the terms of a legally binding agreement between you (the reader) and Lawgician Advisors LLP.</Text>
                <View style={{ paddingTop: hp('1%'), paddingBottom: hp('2%') }}>
                    <Text style={styles.subHeading}>1) Introduction</Text>
                    <Text style={styles.guidelines}>• This following sets out the terms and conditions on which you may use the content on  Lawgician.in website,mobile browser site, Lawgician in store Applications and other digital publishing service Lawgician Advisors LLP, all the services here in will be referred to a Lawgician Services.</Text>
                    <Text style={styles.subHeading}>2) Registration Access and Use</Text>
                    <Text style={styles.guidelines}>• We welcome users to register on our digital platforms. We offer the below mentioned registration services which may be subject to change in the future. All changes will be appended in the terms and conditions page and communicated to existing users by email.</Text>
                    <Text style={styles.guidelines}>Registration services are offered for individual subscribers only. If multiple individuals propose to access the same account or for corporate accounts kindly contact or write in to us. Subscription rates will vary for multiple same time access. The nature and volume of Lawgician content services you consume on the digital platforms will vary according to the type of registration you choose, on the geography you reside or the offer you subscribe to. </Text>
                    <Text style={styles.guidelines}>a) Free Registration</Text>
                    <Text style={styles.guidelines}>b) Premium Registration </Text>
                    <Text style={styles.guidelines}>c) Special Offers</Text>
                    <Text style={styles.guidelines}>d) Combo registrations with partners </Text>
                    <Text style={styles.subHeading}>3) Privacy Policy and Registration</Text>
                    <Text style={styles.guidelines}> All information received by us from your registration on Lawgician. in or other digital products of Lawgician will be used by Lawgician in accordance with our Privacy Policy. Kindly read the below mentioned details. On registration, we expect you to provide Lawgician with an accurate and complete information of the compulsory fields. We also expect you to keep the information secure, specifically access passwords and payment information. Kindly update the information periodically to keep your account relevant. Lawgician will rely on any information you provide to us. Each registration is for a single user only. On registration, you will choose a user name and
                    password ("ID"). You are not allowed to share your ID or give access to your account to anyone else. Lawgician Premium subscription does not allow multiple users on a network or within an organization to use the same ID. On knowledge, Lawgician may cancel or suspend your access to Business Lawgician premium services if it comes across you sharing your personal access without further obligation to you.</Text>
                    <Text style={styles.subHeading}>Personal Subscription Services </Text>
                    <Text style={styles.guidelines}>Personal subscription services include Lawgician premium access to behind the pay wall content. When you subscribe to Lawgician Premium access, you gain access to opinion pieces, comment and exclusive features specially chosen for you by the Lawgicianeditors. The nature of content behind the pay wall is subject to change; the final decision of which lies with the Editor.</Text>
                    <Text style={styles.subHeading}>Types of subscription:</Text>
                    <Text style={styles.guidelines}>Services may differ from country to country and the device from which you subscription </Text>
                    <Text style={styles.subHeading}>Contract format</Text>
                    <Text style={styles.guidelines}>Lawgician will try to process your subscription promptly but does not guarantee that your subscription will be activated by any specified time. By submitting your payment and other subscription details, you are making an offer to us to buy a subscription. Your offer will only be accepted by us and a contract formed when we have successfully verified your payment details and email address, at which point we will provide you with access to your subscription. Lawgician reserves the right to reject any offer in its discretion, for any or no reason. Lawgician may partner with third party content providers to offer bundled services, under which the payment for both the services will be collected by Lawgician will endeavor to provide a seamless access to all such third parties with a single one point access. There could be a gap in this seamless access due to a technology breakdown, temporary disconnection of the internet connection or any factors beyond the reasonable control of Lawgician In such cases the contract will be formed once the access to the partner services are restored.</Text>
                    <Text style={styles.subHeading}>Payment details:</Text>    
                    <Text style={styles.guidelines}>When you purchase a subscription, you must provide us with complete and accurate payment information. By submitting payment details you promise that you are entitled to purchase a subscription using those payment details. If we do not receive payment authorization or any authorization is subsequently cancelled, we may immediately terminate or suspend your access to your subscription. In suspicious circumstances we may contact the issuing bank/payment provider and/or law enforcement authorities or other appropriate third parties. If you are entitled to a refund under these terms and conditions we will credit that refund to the card or other payment method you used to submit payment, unless it has expired in which case we will contact you.  </Text>
                    <Text style={styles.subHeading}>Pricing:</Text>
                    <Text style={styles.guidelines}>The subscription price will be made clear to you on our sign-up pages or otherwise during the signup process and may vary from time to time, by region or by country. You agree to pay the fees at the rates notified to you at the time you purchase your subscription. Subscription to premium services on Lawgician are generally of monthly frequency. Lawgician however may choose to offer fixed term or fixed payment frequency offers from time to time. The currency in which your subscription is payable will be specified during the order process, depending on the service and your country of residence. Eligibility for any discounts is ascertained at the time you subscribe and cannot be changed during the term of your subscription. We will always tell you in advance of any increase in the price of your subscription and offer you an opportunity to cancel it if you do not wish to pay the new price.</Text>
                    <Text style={styles.subHeading}>Taxes:</Text> 
                    <Text style={styles.guidelines}>Subscription and access to content services fall under the purview of Service Tax as per the current indirect taxation policy, Government of India. Taxes are applicable for consumption of content on the website and other products of Lawgician uniformly for customers based in India and outside the country. Unless otherwise indicated, prices stated on our website are inclusive of applicable Service Tax, any applicable value added tax (VAT) or other sales taxes.</Text>
                    <Text style={styles.subHeading}>Price Error:</Text>
                    <Text style={styles.guidelines}>If we incorrectly state a price to you whether online or otherwise, we are not obliged to provide you with a subscription at that price, even if we have mistakenly accepted your offer to buy a subscription at that price, and we reserve the right to subsequently notify you of any pricing error. If we do this, you may cancel the subscription without any obligation to us and we will refund you any money you have paid us in full, or you may pay the correct price. If you refuse to exercise either of these choices then we may cancel your subscription and will refund you any money You have paid us in full. We will always act in good faith in determining whether a genuine pricing error has occurred </Text>
                    <Text style={styles.subHeading}>Other costs:</Text>
                    <Text style={styles.guidelines}>In addition to any subscription fees you pay, you are responsible for paying any internet connection or other telecommunications charges that you may incur by accessing the premium services or using the services available on it. For example, if you use any of our mobile services then your network operator may charge you for data or messaging services. </Text>
                    <Text style={styles.subHeading}>Cancellation Policy: </Text>
                    <Text style={styles.guidelines}>For Digital subscriptions by placing your order you agree that we may start your subscription immediately upon our accepting your order. This means that you are not entitled to a refund if you change your mind after we have provided you with access to your subscription. Except as set out in the previous section, you do not have any right to cancel your subscription or any part of it until the end of your then current subscription period. </Text>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    subHeading: {
        fontSize: wp('6%'),
        marginBottom: hp('1.2%')
    },
    guidelines: {
        marginLeft: wp('2%'),
        fontSize: 14,
        marginBottom: hp('1%')
    },
    container: {
        backgroundColor: '#fff',
        padding: wp('4%')
    },
    heading: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginBottom: hp('1%')
    },
    body: {
        fontSize: wp('4%'),
        marginTop: hp('2%'),
        width: wp('90%')
    }
})
