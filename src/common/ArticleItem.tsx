import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, Image, TouchableOpacity, Share } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableRipple } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class ArticleItem extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
        'dummy text for lawgician as not know what to right?'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  renderButtons(){
    return(
      <View style={styles.ButtonCategories}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.Like}>Like</Text>
          <Icon
           name={'thumb-up'}
           color='#A4A4A4'
           size={20}
           style={{ marginLeft:wp('1%')}}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.comment}>comment</Text>
          <Icon
          style={{ marginTop:hp('.3%'), marginLeft:wp('1%')}}
           name={'comment'}
           color='#A4A4A4'
           size={20}
          />
          
        </TouchableOpacity> */}
        <TouchableOpacity 
        onPress={this.onShare}
        style={styles.button}>
          <Text style={styles.share}>share</Text>
          <Icon
           name={'share'}
           color='#A4A4A4'
           size={25}
           style={{ marginTop:hp('.3%'), marginLeft:wp('.5%')}}
          />
                </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { body, title } = this.props;
    const bodySliced = body.slice(0, 228);
    return (
    
      <TouchableRipple
        onPress={() => Actions.push('articleDetail')}
        style={styles.card}>
        <View>
          <Image
          source={require('../Assets/sample2_article.png')}
          style={styles.image}
          />
          {/* <Text style={styles.Category}>Tax</Text> */}
          <Text style={styles.heading}>{title}</Text>
          {/* <Text style={styles.body}>{bodySliced} <Text style={{ color: '#A4A4A4' }}>Read More..</Text></Text> */}
         {this.renderButtons()}
        </View>

      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  icon:{
    marginLeft:wp('1%'),
    width:wp('6%'),
    height:hp('3.4%')
  },
  liked:{
   fontSize:wp('3%'),
  },
  share:{
    marginTop:hp('.6%'),
    fontSize:wp('4%')
  },
  comment:{
    marginTop:hp('.3%'),
    fontSize:wp('4%')
  },
  Like:{
    marginTop:hp('.3%'),
    fontSize:wp('4%')
  },
  button:{
    flexDirection:'row',
    paddingLeft:wp('2%'),
    paddingRight:wp('2%'),
    paddingTop:hp('1%'),
    paddingBottom:hp('1%')
  },
  ButtonCategories:{
    paddingBottom:hp('1%'),
    paddingLeft:wp('3%'),
    flexDirection:'row',
    alignItems:'center',
    height:hp('6%')
  },
  Category:{
      marginTop:hp('3%'),
      marginBottom:hp('2%'),
      color:'#5B5B5B',
      fontSize:wp('6%'),
  },
  image:{
    borderRadius:1,
    width:'100%',
    height:hp('30%')
  },
  card: {
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    marginRight: wp('1.5%'),
    marginLeft: wp('1.5%'),
    backgroundColor: '#FFFFFF',
    borderColor: '#fff',
    borderRadius:1, 
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width:0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  heading: {
    marginLeft:wp('3%'),
    marginTop:hp('1.5%'),
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#132F58',
  },
  body: {
    fontSize: wp('4%')
  }
})
