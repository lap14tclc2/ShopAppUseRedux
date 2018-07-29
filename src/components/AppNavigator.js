import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import React,{Component} from 'react'
import Login from './Login';
import Register from './Register';
import Home from './Home';
import MainCategory from './MainCategory'
import UserProfile from './UserProfile'
import ListItemPage from './ListItemPage';
import ItemDetail from './ItemDetail';
import ReviewPage from './ReviewPage';

const Tabs = createBottomTabNavigator({
    Home: {
        screen: Home
    },
    MainCategory: {
        screen: MainCategory
    },
    UserProfile: {
        screen: UserProfile
    }
}, {
    tabBarOptions:{
        showIcon: true
    }
});

const MainStack = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    ListItemPage:  {
        screen: ListItemPage,
        navigationOptions: {
            header: null
        }
    },
    ItemDetail: {
        screen: ItemDetail,
        navigationOptions: {
            header: null
        }
    },
    ReviewPage: {
        screen: ReviewPage,
        navigationOptions: {
            header: null
        }
    }
});

const LoginStack = createStackNavigator({
    MainStack:  {
        screen: MainStack,
        navigationOptions: {
            header: null
        }
    },
    Login : Login,
    Register: Register,
    //Tabs: Tabs
},{
    initialRouteName:'Login'
});
export  {LoginStack};