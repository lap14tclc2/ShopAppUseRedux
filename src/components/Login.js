import React, { Component } from 'react'
import {
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    BackHandler,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { login } from '../actions/authen';
import {
    saveToken,
    getToken,
    removeToken,
} from '../helpers/asyc.helper';
import Spinner from 'react-native-loading-spinner-overlay'
import {StackActions,NavigationActions} from 'react-navigation'

class Login extends Component {

    static navigationOptions = {
        title: 'Login',
        headerTintColor: '#8379ee',
        headerStytle: {
            backgroundColor: 'cornflowerblue'
        }
    };

    state = {
        username: '',
        password: '',
        navigation: this.props.navigation,
        isLogin: false
    };

    _login = () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.onLogin(data);
    };

    _register = () => {
        this.props.navigation.navigate('Register');
    }

    render() {
        const { loginState } = this.props;
        const { isLoading } = loginState;
        {
            if (isLoading)
                return <Spinner
                    visible={isLoading}
                    textContent='Login...'
                    textStyle={{ color: "#253145" }}
                    animation='fade' />
        }

        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../utils/images/login.png')} />

                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ username: text })}
                    value={this.state.username}
                    onSubmitEditing={Keyboard.dismiss}
                    placeholder='Username'
                    maxLength={50}
                    underlineColorAndroid='transparent' />
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ password: text })}
                    onSubmitEditing={Keyboard.dismiss}
                    value={this.state.password}
                    maxLength={50}
                    placeholder='Password'
                    secureTextEntry={true}
                    underlineColorAndroid='transparent' />

                <TouchableOpacity
                    onPress={this._login}
                    style={styles.buttonSignin}>
                    <Text style={{ fontSize: 20 }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._register}
                    style={styles.linkRegister}>
                    <Text style={{ fontSize: 15, textDecorationLine: 'underline' }}>Don't have account? Register pls!!!</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _resetStack = () => {
        this.props.navigation.navigate('MainStack');
    }

    componentWillReceiveProps(nextProps) {
        const { loginState } = nextProps;
        const { authen, errMessage, token } = loginState;
        if (this.props.loginState.errMessage!== errMessage && errMessage && !authen) {
            alert(errMessage);
            this.setState({ username: '', password: '' })
        }
        if (token) {
            this._resetStack();
        }
    }

    _handleLogin = () => {
        getToken().then(token => {
            if (token) {
                this._resetStack();
            }
        }).catch(err => {
            console.log(err)
        });
    }

    componentWillMount() {
        this._handleLogin();

        const username = this.props.navigation.getParam('username', '');
        const password = this.props.navigation.getParam('password', '');

        if (username.length > 0 && password.length > 0) {
            this.setState({
                username: username,
                password: password
            })
        }
        else {
            this.setState({ username: '', password: '' })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 50,
        tintColor: '#E60042'
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#e9967a',
        borderRadius: 20,
        margin: 10
    },
    buttonSignin: {
        width: '80%',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#e9967a',
        borderRadius: 20,
        backgroundColor: '#E60042',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    linkRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    }
});

const mapStateToProps = state => {
    return {
        loginState: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: data => {
            dispatch(login(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);