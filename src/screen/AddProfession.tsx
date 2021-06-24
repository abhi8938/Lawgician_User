import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button1 } from '../common';
import { Dropdown } from 'react-native-material-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';
import LoaderOverlay from './../common/loaderOverLay';
import AlertModal from './../common/AlertModal';
import { loginServices } from '../services/loginServices';
import { articleServices } from '../services/articleServices';
import { notificationServices } from '../services/notificationServices';
import { DocumentSharingServices } from '../services/DocumentSharingServices';
import { observable } from 'mobx';

const data = [{
    value:'Advocate'
},
{
    value:'Chartered accountant'
},
{
    value:'Company secretary'
},
{
    value:'Cost and works accountant'
},
{
    value:'Student'
},
{
   value:'others'
}
]
type professPageProps = {
  login: loginServices,
  article:articleServices
  notification:notificationServices 
  document:DocumentSharingServices
}


@inject('article')
@inject('login')
@inject('article')
@inject('notification')
@inject('document')
@observer
export default class AddProfession extends Component<professPageProps> {
  @observable
  value: string = '';

    state={
        
        error: false,
        showResponse: false,
        response: '',
        loading: false
    }
    async populateData(){
      await this.props.login.getUserCard();
      await this.props.notification.addNotificationToken(this.props.notification.Token, this.props.login.customerId);
      await this.props.article.getArticles();
      await this.props.document.getUserDocuments(this.props.login.customerId)
      await this.props.document.getUserQueries(this.props.login.customerId)
      await this.props.notification.getNotifications(this.props.login.customerId)
     }
    addProfession = async () =>{
        this.setState({ loading: true });
        if(this.value === ''){
          this.setState({ loading: false, showResponse: true, response: 'Select Profession', error: true });
          return
        }
         await this.populateData();
         const result =  await this.props.login.addProfession(this.value,this.props.login.customerId); 
         if(result.status === 200){
          this.setState({ loading: false, showResponse: true, response: result.data, error: false });
          return Actions.push('main');
         } 
         
    }
    renderModal() {

        if (this.state.showResponse) {
          return (
            <AlertModal
              visible={this.state.showResponse}
              onRequestClose={() => {
                this.setState({ showResponse: false })
              }}
              onPress={() => {
                this.setState({ showResponse: false });
              }}
              error={this.state.error}
              response={this.state.response}
            />
          );
        }
      }
    renderLoader() {
        return (
          <LoaderOverlay 
          label={'Adding Profession...'}
          />
        )
      }
    render() {
        if(this.state.loading){
            return this.renderLoader();
        }else{
            return (
                <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{ paddingLeft:wp('3%'), paddingRight:wp('3%'), paddingBottom:hp('1%')}}>
                    <Dropdown
                    onChangeText={(value) =>this.value = value}
                    label='Choose Profession'
                    baseColor='#132F58'
                    pickerStyle={{
                        height:hp('45%')
                    }}
                    data={data}
                    />
                    </View>
                 <Button1
                 onPress={this.addProfession}
                 >Add</Button1>
                  {this.renderModal()}
                </View>
            )
        }
    }
}

