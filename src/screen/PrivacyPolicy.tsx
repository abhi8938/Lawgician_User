import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class PrivacyPolicy extends Component {
    render() {
        return (
            <ScrollView
           contentContainerStyle={styles.container}
            >
             <Text style={styles.heading}>Lawgician (hereinafter referred to as the ‘Company’) is committed to respect privacy of every person, including employees of the Company, business partners as well as vendors, dealers and all others who share their sensitive personal data or information (‘Sensitive Personal Information’) with the Company. </Text>
             <Text style={styles.heading}>This privacy policy (‘Policy’) is applicable to employees, businesses partners/associates, vendors, dealers, customers etc. (‘Information Providers’), who disclose Sensitive Personal Information to the Company for lawful business requirements of the Company. </Text>
             <Text style={styles.heading}>The purpose of this Policy, as amended from time to time, is to give the Information Providers an understanding on how the Company intends to collect, receive, possess, store, transfer, handle, deal with and use the Sensitive Personal Information provided. </Text>
             <Text style={styles.heading}>Sensitive Personal Information of the Information Providers may be required to be collected, maintained and transferred for business and official purposes witsh the express consent of the Information Providers. Such Sensitive Personal Information may have to be shared with other Group Companies or third party, within and outside the country, as per lawful business requirements of the Company. </Text>
             <Text style={styles.heading}>The Company shall ensure confidentiality of such Sensitive Personal Information and grievances, if any, related to such issues shall be resolved by the grievance officer appointed by the Company for this purpose</Text>
             <Text style={styles.heading}>By executing a consent letter provided by the Company, the Information Providers shall consent to the collection, storage, usage, disclosure, processing and transfer of their Sensitive Personal Information provided to the Company for the purposes mentioned in this Policy. </Text>
             <Text style={styles.heading}>The Information Providers have the option of not providing their Sensitive Personal Information sought to be collected if they do not agree with this Policy or even otherwise. Further, the Information Providers also have the option to withdraw their consent given earlier, provided such withdrawal of consent is intimated in writing. </Text>
             <Text style={styles.heading}>The Company may collect the following types of Sensitive Personal Information, including but not limited to: </Text>
             <Text style={styles.guidelines}>• Name, contact details, details of past employment (in the case of employees, wherever relevant); </Text>
             <Text style={styles.guidelines}>• Financial details such as bank account, pan card, salary, provident fund details.</Text>
             <Text style={styles.guidelines}>• Password used for company provided systems, websites/web pages. </Text>
             <Text style={styles.guidelines}>• Sexual orientation. </Text>
             <Text style={styles.guidelines}>• Physical, physiological and mental health condition.</Text>
             <Text style={styles.guidelines}>• Medical records and history.</Text>
             <Text style={styles.guidelines}>• Biometric information.</Text>
             <Text style={styles.heading}>The Company may collect, use, receive, possess store, disclose, process and transfer the Sensitive Personal Information for various purposes, including but not limited to, the following: </Text>
             <Text style={styles.guidelines}>• To enable functioning of the Company’s business, </Text>
             <Text style={styles.guidelines}>• In connection with a variety of purposes relating to employment or engagement of employees, including but not limited to, general HR administration; organization planning and management; </Text>
             <Text style={styles.guidelines}>• Compliance with company policies, code of conduct and internal regulations;  </Text>
             <Text style={styles.guidelines}>• Legal, judicial, governmental and regulatory compliance;  </Text>
             <Text style={styles.guidelines}>• Tax administration and compliance; </Text>
             <Text style={styles.guidelines}>• Overseas affiliates’ compliance with foreign laws and cooperation with overseas regulators; </Text>
             <Text style={styles.guidelines}>• To administer or otherwise carry out obligations in relation to any agreement the Information Providers have with the Company; and</Text>
             <Text style={styles.guidelines}>• To investigate, prevent, or take action regarding illegal activities, suspected fraud, violations of the law or as otherwise required by law. </Text>
             <Text style={styles.heading}>The Information Providers consent that the collection, usage, storage, disclosure, processing and transfer of any Sensitive Personal Information or any other information as disclosed under this Policy shall not cause any loss or wrongful gain to the Information Providers if the same is used for the above-mentioned lawful purposes. </Text>
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
        fontSize: 15,
        fontWeight:'500',
        marginBottom: hp('1%')
    },
    container: {
        backgroundColor: '#fff',
        padding: wp('4%')
    },
    heading: {
        fontSize: wp('4.5%'),
        fontWeight: '400',
        marginBottom: hp('1%')
    },
    body: {
        fontSize: wp('4%'),
        marginTop: hp('2%'),
        width: wp('90%')
    }
})
