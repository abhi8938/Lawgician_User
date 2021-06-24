import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, PanResponder, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ArticleItem from './../common/ArticleItem';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { toJS } from 'mobx';

@inject('article')
@observer
export default class HomeScreen extends Component {
  // constructor(props){
  //   super(props);
  //   const position = new Animated.ValueXY();
  //   const panResponder = PanResponder.create({
  //      onStartShouldSetPanResponder: () => true,
  //      onPanResponderMove: (event, gesture) => {
  //         position.setValue({x:gesture.dx ,y:gesture.dy })
  //      },
  //      onPanResponderRelease: () => {}   
  //   });
  //    this.state = { panResponder, position };
  // }
  renderItem(){
   return this.props.article.Article.map(item =>{
     return <ArticleItem body={item.article} title={item.title} />
   })
  }
  render() {
    // const {Article} = this.props.article;
    return (
      <ScrollView contentContainerStyle={{backgroundColor:'#fff'}}>
       {this.renderItem()}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
 
})