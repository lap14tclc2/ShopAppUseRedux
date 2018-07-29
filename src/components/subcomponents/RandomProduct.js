import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'
import { getWidth, getHeight } from '../../helpers/size.helper';
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import { getRandomProduct } from '../../actions/product';
import { getItemsByProduct } from '../../actions/item';

class Item extends Component {
    
    _onPress = () => {
        const {item,childNaviagtion} = this.props;
        childNaviagtion.navigate('ListItemPage', {product: item});
    }

    render() {
        const {item} = this.props;
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={this._onPress}>
                    <Image source={{ uri: item.imageUrl }}
                        style={styles.image} />
                </TouchableOpacity>
                <View style={{ flex: 1, margin: 5, alignSelf: 'flex-start', padding: 5 }}>
                    <Text style={[styles.productName, { fontWeight: 'bold' }]}>Product:</Text>
                    <Text style={styles.productName}>{item.name}</Text>
                </View>
            </View>
        );
    }
}
class RandomProduct extends Component {

    componentDidMount() {
        this.props.onRandomProduct();
    }

    render() {
        const { randoms, isLoading } = this.props.products;
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
                    horizontal={true}
                    data={randoms}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <Item childNaviagtion={this.props.navigation} item = {item} />
                        )
                    }}
                /></View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        height: getHeight(),
        marginRight: 17,
        marginLeft: 10
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 240,
        height: 100,
        borderWidth: 1,
        borderColor: '#ffc770',
        margin: 5,
        padding: 5
    },
    image: {
        width: 120,
        height: 90
    },
    productName: {
        textAlignVertical: 'center',
        fontStyle: 'italic',
        fontWeight: 'normal',
        textAlign: 'center'
    }
});

const mapStateToProps = state => {
    return {
        products: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRandomProduct: () => {
            dispatch(getRandomProduct());
        },
        onGetItemByProduct: (productId) => {
            dispatch(getItemsByProduct(productId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomProduct);