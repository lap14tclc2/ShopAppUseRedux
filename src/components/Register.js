import React, { Component } from 'react'
import {
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import { register } from '../actions/authen'
import { connect } from 'react-redux'
import { checkEntryPoint } from '../helpers/check.helper'

class Register extends Component {

    static navigationOptions = {
        title: 'Register',
        headerTintColor: '#9370db',
        headerStytle: {
            backgroundColor: 'cornflowerblue'
        }
    };

    state = {
        username: '',
        password: '',
        navigation: this.props.navigation
    };

    isSuccess =  (authen) => {
        if (!authen) {
            alert('Register failed');
            return;
        }
        else {
            //send data back to Login;
            const { navigation } = this.state;
            navigation.push('Login', {
                username: this.state.username,
                password: this.state.password
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const { registerState } =  nextProps;
        const { authen } =   registerState;
        if( this.props.registerState.authen !== authen){
            this.isSuccess(authen);
        }
    }

    _register = () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        if (!checkEntryPoint(data)) {
            alert('You must type username or password has length greater than six!');
            return;
        }
        // call api to server to save data into db
        this.props.onRegister(data);

        // if register failed then display an error

    };

    render() {
        const { registerState } = this.props;
        const { isLoading } = registerState;
        {
            if (isLoading) {
                return <ActivityIndicator size='small' color='#0000ff' />
            }
            else {
                return (
                    <View style={styles.container}>
                        <Image
                            style={styles.logo}
                            source={require('../utils/images/register.jpg')} />

                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({ username: text })}
                            autoFocus={true}
                            onSubmitEditing={Keyboard.dismiss}
                            placeholder='Enter new username'
                            maxLength={50}
                            underlineColorAndroid='transparent' />
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({ password: text })}
                            onSubmitEditing={Keyboard.dismiss}
                            maxLength={50}
                            placeholder='Enter new password'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent' />

                        <TouchableOpacity
                            onPress={this._register}
                            style={styles.buttonSignup}>
                            <Text style={{ fontSize: 20 }}>Register</Text>
                        </TouchableOpacity>

                    </View>
                );
            }
        };


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 100,
        marginBottom: 50
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#e9967a',
        borderRadius: 10,
        marginTop: 25
    },
    buttonSignup: {
        width: '80%',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#e9967a',
        borderRadius: 10,
        backgroundColor: '#E60042',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30
    },
});

const mapStateToProps = state => {
    return {
        registerState: state.register
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onRegister: data => {
            dispatch(register(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);