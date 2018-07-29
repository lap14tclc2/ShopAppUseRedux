import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {profileManager } from '../utils/constants'
import { getUsername } from '../actions/authen';
import { removeToken } from '../helpers/asyc.helper';
import { LOG_OUT } from '../utils/ActionTypes';
import {StackActions,NavigationActions} from 'react-navigation'
class UserProfile extends Component {

    static navigationOptions = {
        header: null,
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='user' size={20} color={tintColor} />
    }

    componentDidMount() {
        this.props.getUsername();
    }

    _resetStack = () => {
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [],
        //   });
        this.props.navigation.navigate('Login');
    }

    _onLogout =  async() => {
        await removeToken();
        this.props.onLogout();
        this._resetStack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image style={styles.avatar}
                        source={{ uri: 'https://png.icons8.com/color/2x/guest-male.png' }} />
                    <Text style={styles.username}>Username: {this.props.login.username}</Text>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity
                        style={styles.list}>
                        <Image style={styles.icon} source={{ uri: profileManager[0].icon }} />
                        <Text style={styles.text}>{profileManager[0].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.list}>
                        <Image style={styles.icon} source={{ uri: profileManager[1].icon }} />
                        <Text style={styles.text}>{profileManager[1].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._onLogout}
                        style={styles.list}>
                        <Image style={styles.icon} source={{ uri: profileManager[2].icon }} />
                        <Text style={styles.text}>{profileManager[2].name}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black'
    },
    item: {
        justifyContent: 'center',
        marginTop: 2,
    },
    list: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 1
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: 'black',
        marginLeft: 10,
        marginRight: 20
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    profile: {
        margin: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray'
    },
    avatar: {
        width: 200,
        height: 200,
        borderWidth: 0.5,
        borderColor: 'lightblue',
        margin: 10
    }
});

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsername: () => {
            dispatch(getUsername());
        },
        onLogout: () => {
            dispatch({type: LOG_OUT})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);