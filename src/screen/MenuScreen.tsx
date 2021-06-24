import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import DrawerMenu from '../navigation/DrawerMenu';

export default class MenuScreen extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <DrawerMenu navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({})
