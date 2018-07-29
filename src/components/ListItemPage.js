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
import ListItem from './subcomponents/ListItem';
import { getItemsByProduct, getItems } from '../actions/item';
import { getProducts } from '../actions/product';



class ListItemPage extends Component {

    state={
        productName: ''
    }

    handleBackPress = () => {
        this.props.navigation.goBack(); // works best when the goBack is async
        //update get all item in Home page
        this.props.onGetItems();
        //update all product in MainCategory page
        this.props.onGetProduct();
        return true;
    }

    componentDidMount() {
        const product = this.props.navigation.getParam('product', null);
        if (product) {
            this.props.onGetItemsById(product._id);
        }
        this.setState({productName: product.name})

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText} >{this.state.productName}</Text>
                </View>
                <ListItem childNavigation ={this.props.navigation} itemState={this.props.item} />
            </View>
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        backgroundColor: 'lightgrey',
        borderWidth: 0.5,
        borderColor:'lightblue',
        margin: 18
    },
    titleText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'midnightblue',
        textAlign:'center'
    }
});

const mapStateToProps = state => {
    return {
        item: state.item
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onGetItemsById: (productId) => {
            dispatch(getItemsByProduct(productId));
        },
        onGetItems: () => {
            dispatch(getItems());
        },
        onGetProduct: () => {
            dispatch(getProducts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemPage);