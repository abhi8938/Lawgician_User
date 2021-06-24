import {reaction, observable,} from 'mobx';
import autobind from 'autobind-decorator'
import axios from 'axios';
import AsyncStorage  from '@react-native-community/async-storage';
import { BASE_URL } from './../constants/endpoint';

@autobind
export class orderServices {
  @observable Orders = new Array;

  getOrders = async (customerId:string) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken,
                  'customerid':customerId}
    };

    return axios.get(BASE_URL+'/orders', config)
                 .then(res =>{
                     this.Orders = res.data;
                     return res.data;
                 })
                 .catch(err => {
                     return err.response.data
                 })
}

createOrder = async(CustomerId:string,Customer:object,Price:number,PaymentStatus:string,Service:string, TransactionId?:string) =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken
                }
    };
    return axios.post(BASE_URL+'/orders',{
        CustomerId,
        Customer,
        Price,
        PaymentStatus,
        Service
    } ,config)
    .then(res =>{
        console.log(`res`,res);
        return res;
    })
    .catch(err => {
        console.log(`res`,err.response);
        return err.response
    })

}

updateOrderPayment = async(OrderId:string,TransactionId:string) =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken
                }
    };
    return axios.put(BASE_URL+'/orders',{
        OrderId,
        TransactionId
    } ,config)
    .then(res =>{
        return res;
    })
    .catch(err => {
        return err.response
    }) 
}

}
