import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Share, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class ArticleDetail extends Component {
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
      alert(error.message);
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
        return (
            <View style={{ flex:1,backgroundColor:'#fff', justifyContent:'space-between'}}>
               <ScrollView contentContainerStyle={{paddingBottom:hp('2.5%')}}>
                <Image
                source={require('../Assets/sample2_article.png')}
                style={styles.image}
                />
                   <Text style={styles.topic}>[RESEARCH] Indian startup funding in H1 2019: YourStory Research unveils two in-depth reports on emerging trends, investments</Text>
                <Text style={styles.Posted}>Posted On: <Text style={styles.date}>31/01/2019</Text></Text>
                <Text style={styles.body}>Indian startup funding trends in the first six months of 2019 show healthy investor interest in Indian startups. Deals and investment activity generally take a backseat during an election season, but the first half of 2019 -- which saw the world await the outcome of India’s general elections with bated breath -- proved to be a rare exception.</Text>
                <Text style={styles.body}>In fact, amidst the height of India’s long-drawn out election process -- a time when global and domestic investors tend to prefer to wait on the sidelines -- funding activity in the Indian startup ecosystem continued unabated.
In an attempt to analyse the state of funding in the Indian startup ecosystem, with a particular focus on women-led/co-founded startups, YourStory Research, the research arm of YourStory Media, is launching two data-driven half-yearly funding reports that exclusively focus on home-grown startups.
The first is an overall funding report of the startup ecosystem in India; the second one showcases funding raised by startups led/co-founded by women.</Text>
              <Image
                source={require('../Assets/sample1_article.png')}
                style={[styles.image, {marginTop:hp('2%')}]}
                />
                <Text style={styles.body}>The two research reports, produced by YourStory Research, provide an in-depth look at the funding trends in the startup ecosystem in H1 2019:</Text>
                <Text style={styles.body}>• H1 2019 Funding Report: Indian Startup Ecosystem: The report provides an in-depth overview of the emerging trends in investment activity in the Indian startup ecosystem. Some of these have attained unicorn status -- valued at $1 billion or more -- while others are waiting in the wings as soonicorns -- or soon-to-be unicorns who have a valuation of over $600 million. The report reveals the diversity of sectors, and includes prominent voices of the industry and their views.</Text> 
                <Text style={styles.body}>• H1 2019 Indian Women Startup Funding Report: The report puts the spotlight on funding activity in startups led/co-founded by women, who raised $487 million in H1 2019, up 77 percent YoY from 68 deals in H1 2019. Despite the increase in funding activity in women-led/co-founded startups, the total amount raised by these startups accounted for just 10 percent of the total amount raised in the Indian startup ecosystem, signalling there's still a long way to go before women-founded startups command the same level of interest.</Text> 
                <Text style={styles.body}>Both reports reveal sectors that raised maximum funds, active VCs, new trends, sunrise sectors, new startup hubs, and challenges – as seen during the first half of 2019. The reports detail out the multifarious aspects of funding that act as a barometer - and even mirror the development and maturity of India's new economy.</Text>
           </ScrollView>
                {this.renderButtons()}
            </View>
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
    flex:1,
    flexDirection:'row',
   paddingTop:hp('1.5%'),
   paddingBottom:hp('1.5%'),
   alignItems:'center',
   justifyContent:'center'
  },
  ButtonCategories:{
  flexDirection:'row',
  alignItems:'center',
  },
    image:{
        borderRadius:2,
      height:hp('30%'),
      width:wp('100%')
    },
    topic:{
        color:'#132F58',
        marginLeft:wp('3%'),
        marginTop:hp('2%'),
        fontSize:wp('6%'),
        fontWeight:'bold',
    },
    subTopic:{
        marginLeft:wp('3%'),
      marginTop:hp('1.5%'),
      fontSize:wp('5%'),
      color:'#323232'
    },
    Posted:{
        marginLeft:wp('3%'),
     marginTop:hp('1%'),
     fontSize:wp('4%'),
     fontWeight:'400'
    },
    date:{
  fontWeight:'600'
    },
    body:{
        marginLeft:wp('3%'),
      marginTop:hp('2%'),
      marginRight:wp('1%'),
      fontSize:wp('4.2%'),
      color:'#000'
    }
})
