import {reaction, observable,} from 'mobx';
import autobind from 'autobind-decorator'
import axios from 'axios';
import AsyncStorage  from '@react-native-community/async-storage';
import { BASE_URL } from './../constants/endpoint';
@autobind
export class articleServices {
  @observable Article = new Array;

  getArticles = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken}
    };

    return axios.get(BASE_URL+'/articles', config)
                 .then(res =>{
                     this.Article = res.data;
                     return res.data;
                 })
                 .catch(err => {
                     return err.response.data
                 })
}

}
