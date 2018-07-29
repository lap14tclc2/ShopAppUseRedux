
import React, { Component } from 'react'
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { getWidth, getHeight } from '../../helpers/size.helper';
import Spinner from 'react-native-loading-spinner-overlay'
import Item from '../subcomponents/Item'


class ListItem extends Component {

    render() {
        const { items, isLoading } = this.props.itemState;
        const { childNavigation } = this.props;

        {
            if (isLoading)
                return <Spinner
                    visible={isLoading}
                    textContent='Loading...'
                    textStyle={{ color: "#253145" }}
                    animation='fade' />
        }
        
        return (
            <View style={styles.list}>
                <FlatList
                    numColumns={2}
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => { 
                        return <Item navigation={childNavigation} item={item} />
                    }}
                /></View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: getWidth(0.36),
        height: getWidth(0.36),
        borderWidth: 1,
        borderColor: '#ffc770',
    },
    item: {
        width: getWidth(0.43),
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 5,
        backgroundColor: '#fbfbfb'
    },
    textItem: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    }
});



export default (ListItem);