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
import { getCategories } from '../../actions/category';
import { getWidth, getHeight } from '../../helpers/size.helper';
import Spinner from 'react-native-loading-spinner-overlay'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { getProductsByCategory, getProducts } from '../../actions/product';

class Item extends Component {
    _onPress = () => {
        const categoryId = this.props.item._id;
        const { parentProps } = this.props;
        parentProps.onGetProductsById(categoryId);
    }

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity
                onPress={this._onPress}
                style={styles.item}>
                <Image
                    style={styles.image}
                    source={{ uri: item.imageUrl }} />
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
}


class MenuCategory extends Component {

    componentDidMount() {
        this.props.onGetCategories();
    }
    _onPressCategory = () => {
        this.props.onGetProducts();
    }

    render() {
        const { categories, isLoading } = this.props.category;
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
                <TouchableOpacity
                    onPress={this._onPressCategory}
                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} >
                    <Icons name='view-list' size={30} color={'orange'} />
                    <Text style={{ color: 'orange' }}>All Categories</Text>
                </TouchableOpacity>

                <FlatList
                    style={styles.list}
                    data={categories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return <Item parentProps={this.props} item={item} />
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 55,
        backgroundColor: '#eceff1',
        width: getWidth(0.35),
        height: getHeight(0.9),
    },
    list: {
        flex: 1
    },
    item: {
        margin: 3,
        padding: 5,
        borderColor: 'lightblue',
        alignItems: 'center'
    },
    image: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 12,
        textAlignVertical: 'center',
        margin: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

const mapStateToProps = state => {
    return {
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCategories: () => {
            dispatch(getCategories());
        },
        onGetProductsById: categoryId => {
            dispatch(getProductsByCategory(categoryId));
        },
        onGetProducts: () => {
            dispatch(getProducts());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuCategory);