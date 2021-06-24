import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import CustomItem from '../Components/CustomItem';
import CustomTextInput from '../Components/CustomTextInput';
import CustomButton from '../Components/CustomButton';
import LoaderOverlay from './../common/loaderOverLay';
import { loginServices } from '../services/loginServices';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DocumentSharingServices } from '../services/DocumentSharingServices';
import { inject, observer } from 'mobx-react';
import { toJS, observable } from 'mobx';
import AlertModal from './../common/AlertModal';

type queryProps = {
    login: loginServices
    document: DocumentSharingServices
}

@inject('login')
@inject('document')
@observer
export default class QueryScreen extends Component<queryProps> {

    @observable
    loading = false
    @observable
    loadingText = 'Sending Query...'

    @observable
    error = false

    @observable
    errorMessage = ''

    @observable
    showResponse = false

    state = {
        query: 'How can we help?',
        loading: false
    }

    handleSubmit() {
        if (this.state.query === '' || this.state.query === 'How can we help?') {
            this.error = true
            this.errorMessage = 'Query Empty'
            return
        }
    }

    sendQuery = async () => {
        this.handleSubmit();
        if (this.error) {
            this.showResponse = true
            this.error = true
            return
        }
        this.loading = true;
        const response = await this.props.document.sendQuery(this.props.login.customerId, this.state.query,this.props.login.fullName,this.props.login.userEmail,this.props.login.userMobile);
        if (response.status === 200) {
            this.showResponse = true
            this.errorMessage = 'Query Sent'
            this.error = false;
            this.setState({ query:'How can we help?'});
            await this.props.document.getUserQueries(this.props.login.customerId);
            this.loading = false;
        } else {
            this.showResponse = true
            this.loading = false;
            this.errorMessage = response.data
            this.error = true
        }
    }
    
    renderQueries() {
        if (this.props.document.Queries.length === 0) {
            return (
                <View style={{ width:'100%',height:hp('60%'), alignItems: 'center', justifyContent: 'center' , transform: [{ scaleY: -1 }] }}>
                    <Text style={{ fontSize: wp('8%'), fontWeight: 'bold' }}>No Queries Yet</Text>
                </View>
            )
        }
        return (
            this.props.document.Queries.map(element => {
                let sender = '';
                let date = new Date(element.CreatedAt).toDateString();
                let time = new Date(element.CreatedAt).toLocaleTimeString()
                let style = null;
                let color = null;
                if (element.From === this.props.login.customerId) {
                    sender = `You`
                    style = { alignSelf: 'flex-end', width: wp('50%') }
                    color = { color: '#218721' }
                } else {
                    sender = `${element.From}`
                    style = { alignSelf: 'flex-start', width: wp('50%')}
                    color = { color: '#132F58' }
                }
                return (
                    <CustomItem
                        key={element._id}
                        renderImage={false}
                        TopText={sender}
                        date={date}
                        Note={true}
                        body={element.Note}
                        Style={style}
                        time={time}
                        color={color}
                        transform={{transform: [{ scaleY: -1 }]}}
                    />
                )
            })
        )
    }

    renderTextInput() {
        return (
            <View style={{ paddingTop: hp('1%'), flexDirection: 'row', justifyContent: 'space-around' }}>
                <CustomTextInput
                    onFocus={() => {
                       if(this.state.query === 'How can we help?'){
                       return this.setState({query:''})
                    }
                    return
                    }}  
                    onBlur={() => {
                        if(this.state.query !== ''){
                            return
                        }
                        if(this.state.query === ''){
                            this.setState({query:'How can we help?'})
                        }
                        }
                    }
                    style={{ backgroundColor: '#fff', borderWidth:1, borderColor: '#1F94F6', height:hp('7.5%'),borderRadius:15, }}
                    value={this.state.query}
                    onChangeText={(query) => this.setState({ query })}
                />
                <CustomButton textStyle={{fontSize:wp('5%'), color:'#1F94F6'}} onPress={this.sendQuery} Style={{alignSelf: 'flex-start', marginTop: hp('1.5%'), marginRight: wp('2.5%'), }} renderIcon={false} >Send</CustomButton>
            </View>
        )
    }
    
    renderLoader() {

        return (
            <LoaderOverlay label='Loading Queries...' />
        )

    }
    
    renderAlertModal() {
        return (
            <AlertModal
                visible={this.showResponse}
                onRequestClose={() => {
                    this.error=false
                    this.errorMessage = ''
                    this.showResponse = false 
                }}
                error={this.error}
                response={this.errorMessage}
            />
        );
    }

    render() {
        if (this.loading) {
            return this.renderLoader()
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView  style={{ padding: wp('3%') }} contentContainerStyle={{ paddingTop:hp('2%'), transform: [{ scaleY: -1 }]}}>
                    {this.renderQueries()}
                </ScrollView>
                {this.renderTextInput()}
                {this.renderAlertModal()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    queryContainer: {

    }
})
