import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Button1 = (props) => {
  return (
       <View style={styles.TouchableContainer}>
             <TouchableRipple
               style={styles.touchable}
               rippleColor="rgba(255,255,255, 0.3)"
               borderless={true}
               onPress={props.onPress}>
                        <Text style={styles.text}>{props.children}</Text>
             </TouchableRipple>
           </View>
  );
};

const styles = {
    text:{
        color:'#ffffff',
        fontSize:wp('5%'),
        fontWeight:'500' 
        },
        touchable:{
          width:wp('90%'),
          height:hp('7%'),
          backgroundColor:'#D8B25A',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:4
        },
        TouchableContainer:{
            width:wp('100%'),
            height:hp('9%'),
            paddingTop:hp('5%'),
            paddingBottom:hp('5%'),
            justifyContent:'center',
            alignItems:'center'
        }
};

export { Button1 };
