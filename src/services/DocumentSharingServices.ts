import { reaction, observable, } from 'mobx';
import autobind from 'autobind-decorator';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from './../constants/endpoint';
@autobind
export class DocumentSharingServices {

    @observable
    Documents = new Array()

    @observable
    Queries = new Array()

    sendDocument = async (
        document: any,
        customerId: string,
        Note: string,
        name:string,
        email:string,
        mobile:string
    ) => {
        const userToken = await AsyncStorage.getItem('userToken');
       

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8;',
                'sentto':'Admin',
                'x-auth-token': userToken,
                'from':customerId,
                'note':Note,
                'customername':name,
                'customeremail':email,
                'customermobile':mobile
            }
        };
        const formData = new FormData();
        formData.append(
            'file',
            document
          );
        return axios.post(BASE_URL+'/documents/addDocument',formData,config)
          .then(response => {
            // Call a function here if the request is successful
            console.log(`data`,response.data);
            return response
          })
          .catch(error => {
              console.log(`err`,error.response.data);
              return error.response
            // Call a function here if the request fails
          });

    }


    sendQuery = async (
        customerId: string,
        Note: string,
        name:string,
        email:string,
        mobile:string
    ) => {
        const userToken = await AsyncStorage.getItem('userToken');
       
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8;',
                'sentto':'Admin',
                'x-auth-token': userToken,
                'from':customerId,
                'note':Note,
                'type':'QUERY',
                'customername':name,
                'customeremail':email,
                'customermobile':mobile
            }
        };

        return axios.post(BASE_URL+'/documents/addDocument', {},config)
            .then(response => {
                return response
            })
            .catch(error => {
                return error.response
            });
    }

    getUserQueries = async (customerId: string) => {
        const userToken = await AsyncStorage.getItem('userToken');
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
                'id': customerId,
                'type': 'QUERY'
            }
        };
        return axios.get(BASE_URL+'/documents/forClient', config)
            .then(response => {
                if (response.status === 200) {
                    console.log(`docs`,response.data.query);
                    this.Queries = response.data.query
                    return response;
                }
                return response;
            })
            .catch(error => {
                return error.response;
            })
    }


    getUserDocuments = async (customerId: string) => {
        const userToken = await AsyncStorage.getItem('userToken');
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken,
                'id': customerId
            }
        };
        return axios.get(BASE_URL+'/documents/forClient', config)
            .then(response => {
                if (response.status === 200) {
                    this.Documents = response.data.docs
                    return response;
                }
            })
            .catch(error => {
                return error.response;
            })
    }
}