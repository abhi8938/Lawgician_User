import {
    View, Image, StatusBar, TouchableWithoutFeedback, TextInput, Text
} from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/EvilIcons';
const Items = [123, 5, 3132, 4342];
const SearchTextInput = (props) => {
    return (
        <View style={styles.searchContainer}>
            <Icon
                style={{ marginBottom: hp('.6%') }}
                name='search'
                size={30}
                color='#132F58'
            />
            <TextInput
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                style={{ color: '#132F58', height: hp('6.5%'), paddingBottom: 0 }}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
class NavBar extends Component {
    state = {
        search: 'Search'
    }
    _handleResults(results) {
        this.setState({ results });
    }
    render() {
        return (
            <View style={styles.backgroundStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: wp('2%') }}>
                    <Image
                        style={{ width: wp('11.6%'), height: hp('5.8%'), resizeMode: 'contain' }}
                        source={require('../Assets/three.png')}
                    />
                    <Text style={{ width: wp('30%'), color: '#000', fontWeight: 'bold', paddingLeft: wp('1%'), paddingTop: hp('.5%'), fontSize: 19 }}>Lawgician</Text>
                </View>
                <SearchTextInput
                    onBlur={() => this.setState({ search: 'Search' })}
                    onFocus={() => this.setState({ search: '' })}
                    value={this.state.search}
                    onChangeText={search => this.setState({ search: search })}
                />

            </View>
        );
    }

}
const styles = {
    searchContainer: { flex: 1, marginRight: wp('2.5%'), flexDirection: 'row', borderColor: '#132F58', alignItems: 'flex-end', borderBottomWidth: 1, marginBottom: hp('1.5%'), },
    backgroundStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('8%'),
        backgroundColor: '#fff'
    },
    logoStyle: {
        width: wp('35%'),
        height: hp('7.6%')
    },
    helpStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        left: 220,
        justifyContent: 'flex-end',
        position: 'relative'

    },
    settingStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        justifyContent: 'flex-end',
        position: 'relative',
        left: 210
    }
};


export default NavBar;
