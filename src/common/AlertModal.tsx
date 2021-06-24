import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Modal, 
    Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type alertModalProps ={
  error?:boolean
  visible:boolean
  onRequestClose:(() => void)
  response:string,
}

class AlertModal extends React.Component<alertModalProps>{
    render(){
      if(this.props.error){
        return(
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.props.onRequestClose}>
          <View style={{marginTop: 22}}>
            <View style={[styles.modalView, { backgroundColor:'#F6F2E7'}]}>
            <View style={styles.inputUser}>
             <Image
             style={styles.lottie}
             source={require('../Assets/report.png')}
             />
            </View>
            <View style={{  height:hp('10%'), paddingLeft:wp('2.5%'), paddingRight:wp('2%'), justifyContent:'center', alignItems:'center',  width:wp('56%')}}>
                <Text style={styles.message}>{this.props.response}</Text>
            </View>
            <View style={styles.buttonModelContainer}>
        <TouchableOpacity
            onPress={this.props.onRequestClose}
            style={styles.cancelButton}
        >
        <Text style={styles.ButtonText}>OK  </Text>
        </TouchableOpacity>
        </View>
            </View>
          </View>
        </Modal>
        )
      }else{
         return(
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.props.onRequestClose}>
          <View style={{marginTop: 22}}>
            <View style={[styles.modalView, { backgroundColor:'#F6F2E7'}]}>
            <View style={styles.inputUser}>
            <Image
             style={styles.lottie}
             source={require('../Assets/checked.png')}
             />
            </View>
            <View style={{ height:hp('10%'), paddingLeft:wp('2.5%'), paddingRight:wp('3%'), justifyContent:'center', alignItems:'center', width:wp('54%') }}>
                <Text style={[styles.message, {fontSize:wp('4%')}]}>{this.props.response}</Text>
            </View>
            <View style={styles.buttonModelContainer}>
        <TouchableOpacity
            onPress={this.props.onRequestClose}
            style={styles.cancelButton}
        >
        <Text style={styles.ButtonText}>OK  </Text>
        </TouchableOpacity>
        </View>
            </View>
          </View>
        </Modal>
         );
      }
    }
}

export default AlertModal;


const styles =  StyleSheet.create({
    message:{
        fontWeight:'bold',
        color:'#000',
        paddingBottom:5
    },
    modalView:{
        flexDirection:'row',
        height:hp('11%'),
        width: wp('89%'),
        marginLeft:wp('6%'),
        marginTop: hp('78%'),
        borderRadius:5,
        elevation: 5,
        alignItems: 'center', 
      },
      modalHeading:{
         fontSize: hp('3%'),
         fontWeight: 'bold',
         paddingBottom: hp('1%'),
      },
      lottie: {
        width:wp('12%'),
        height:hp('6.7%')
      },
      Input:{
        fontSize:hp('2.5%'),
        color:'#404549',
        borderBottomColor:'#A9A9A9',
        borderBottomWidth: 1.5,
        paddingBottom:4,
        paddingLeft:2,
        lineHeight:20
      },
      inputUser:{
        paddingLeft:wp('3%'),
        paddingRight:wp('2%'),
         paddingTop: hp('3%'),
         paddingBottom: hp('2.2%'),
         justifyContent:'center',
         alignItems:'center'  
      },
    joinButton: {
      height:hp('10%'),
      backgroundColor: '#23283B',
      borderWidth: 1,
      borderColor: '#23283B',
      justifyContent: 'center',
      borderRadius: 2,
      alignItems: 'center',
      margin: 5,
  },
  cancelButton:{
    height:hp('9.5%'),
     backgroundColor: 'transparent',
     borderLeftWidth: 0.9,
     borderColor: '#333132',
     justifyContent: 'center',
     borderRadius: 2,
     alignItems: 'center',
     paddingLeft:wp('3%')
  },
  ButtonText: {
      fontSize:wp('6%'),
      fontWeight: '500',
      color: '#333132'
  },
  buttonModelContainer:{
    flexDirection: 'row',
  },
})