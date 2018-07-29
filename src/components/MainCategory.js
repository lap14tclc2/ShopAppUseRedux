import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MenuCategory from './subcomponents/MenuCategory';
import MenuProduct from './subcomponents/MenuProduct';


class MainCategory extends Component {

    static navigationOptions = {
        header: null,
        title: 'Category',
        tabBarIcon: ({ tintColor }) => { return <FontAwesome name='list' size={20} color={tintColor} /> }
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <MenuCategory />
                <MenuProduct childNavigation = {navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
});

export default MainCategory;