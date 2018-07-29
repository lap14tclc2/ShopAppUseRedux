import { View, Text,YellowBox } from 'react-native'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './store/store'
import {LoginStack} from './components/AppNavigator'


export default class App extends Component {

    componentDidMount(){
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
    }

    render() {
        return (
            <Provider store={Store}>
                <LoginStack />
            </Provider>
        )
    }
}

// TASK : navigate from login to register apge
// call api.....

