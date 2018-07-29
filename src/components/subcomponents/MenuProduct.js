import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    BackHandler,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { getWidth, getHeight } from '../../helpers/size.helper';
import Spinner from 'react-native-loading-spinner-overlay'
import { getProducts, getProductsByCategory } from '../../actions/product';

export class Item extends Component {

    _onPress = () => {
        const {childNavigation, item} = this.props;
        childNavigation.navigate('ListItemPage',{product: item});
    }

    render() {
        const { item } = this.props;
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={this._onPress}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.imageUrl }} />
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
class MenuProduct extends Component {

    componentDidMount() {
        this.props.onGetProducts();
    }

    componentWillReceiveProps(nextProps) {
        const { product } = nextProps;
        const { isGetAll, products } = product;
        if (!isGetAll) {
            this.props.product.products = products;
        }
    }

    render() {
        const { products, isLoading } = this.props.product;
        const {childNavigation} = this.props;
        {
            if (isLoading)
                return <Spinner
                    visible={isLoading}
                    textContent='Loading...'
                    textStyle={{ color: "#253145" }}
                    animation='fade' />
        }
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={3}
                    style={styles.list}
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return <Item childNavigation={childNavigation} item={item} />
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 42
    },
    list: {
        flex: 1
    },
    item: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 10,
        padding: 5,
    },
    image: {
        width: 60,
        height: 50,
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight:'bold',
        margin: 5,
    }
});

const mapStateToProps = state => {
    return {
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProducts: () => {
            dispatch(getProducts());
        },
        onGetProductsById: (categoryId) => {
            dispatch(getProductsByCategory(categoryId))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuProduct);