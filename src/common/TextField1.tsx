import React from 'react';
import { View, Text, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TextField1 = (props) => {
  return (
    <View style={styles.textFieldContainer}>
      <View style={styles.icon}>
        <Image
          style={props.iconStyle}
          source={props.name}
        />
      </View>
      <View style={styles.textfield}>
        <TextField
          id="input-with-icon-grid"
          label={props.label}
          fontSize={wp('4%')}
          value={props.value}
          textColor='#101010'
          baseColor='#14303A'
          tintColor='#132F58'
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
        />
      </View>
    </View>
  );
};

const styles = {
  icon: {
    paddingTop: hp('1.5%'),
    width: wp('15%'),
    height: hp('6%'),
    paddingLeft: wp('4.5%'),
    justifyContent: 'center',
  },
  textfield: {
    flex: 4,
    justifyContent: 'center',
    marginLeft: wp('1%'),
    height: hp('5%'),
    marginRight: wp('5%')
  },
  textFieldContainer: {
    width: wp('100%'),
    height: hp('6%'),
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: hp('2.5%')
  },
};

export { TextField1 };
