import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableRipple } from 'react-native-paper';

const Tab = (props: any) => {
    return (
        <TouchableRipple
            onPress={props.onPress}
            style={styles.tab}>
            <Icon
                name={props.name}
                size={26}
                color={props.color}
            />
        </TouchableRipple>
    )
}
export default class TabBar extends Component {
    state = {
        article: '',
        document: '',
        notification: '',
        query: '',
        menu: ''
    }
    componentDidMount() {
        this.setState({ article: this.props.activeTintColor });
    }

    changeTab(tab: string) {
//   if(this.props.navigationState.index === tab){
//    this.setState({

//    })
//   }
        if (tab === 'article') {
            this.setState({
                article: this.props.activeTintColor,
                document: '',
                notification: '',
                query: '',
                menu: ''
            }, () => {
                console.log('object',this.props);
                this.props.jumpTo(tab)})
        } else if (tab === 'document') {
            this.setState({
                document: this.props.activeTintColor,
                article: '',
                notification: '',
                query: '',
                menu: ''
            }, () => {
                console.log('object',this.props);
                this.props.jumpTo(tab)})
        } else if (tab === 'notification') {
            this.setState({
                notification: this.props.activeTintColor,
                document: '',
                article: '',
                query: '',
                menu: ''
            }, () => {
                console.log('object',this.props);
                this.props.jumpTo(tab)})
        } else if (tab === 'query') {
            this.setState({
                query: this.props.activeTintColor,
                document: '',
                notification: '',
                article: '',
                menu: ''
            }, () => this.props.jumpTo(tab))
        } else if (tab === 'menu') {
            this.setState({
                menu: this.props.activeTintColor,
                document: '',
                notification: '',
                query: '',
                article: ''
            }, () => this.props.jumpTo(tab))
        }


    }
    render() {

        return (
            <View style={styles.tabBar}>
                <Tab id={0} name='blur-linear' onPress={() => this.changeTab('article')} color={this.state.article ? this.state.article : this.props.inactiveTintColor} />
                <Tab id={2} name='notifications-active' onPress={() => this.changeTab('notification')} color={this.state.notification ? this.state.notification : this.props.inactiveTintColor} />
                <Tab id={1} name='library-books' onPress={() => this.changeTab('document')} color={this.state.document ? this.state.document : this.props.inactiveTintColor} />
                <Tab id={3} name='comment' onPress={() => this.changeTab('query')} color={this.state.query ? this.state.query : this.props.inactiveTintColor} />
                <Tab id={4} name='reorder' onPress={() => this.changeTab('menu')} color={this.state.menu ? this.state.menu : this.props.inactiveTintColor} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: hp('8%')
    }
})
