import * as React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { commonStyles } from './commonStyles';


interface LoaderOverlayProps {
    label?:string
}

const styles = StyleSheet.create({
    loaderContainer: {
       flex:1,
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 1)'
    }
})



export default class LoaderOverlay extends React.Component<LoaderOverlayProps> {

    render() {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#13144C"/>
                    <Text style={{ marginTop:15, color:'#13144C', fontSize:20}}>{this.props.label}</Text>
                </View>
        )
       
    } 
}