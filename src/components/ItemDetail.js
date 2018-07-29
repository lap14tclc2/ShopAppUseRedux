import React, { Component } from 'react'
import {
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import ListItem from './subcomponents/ListItem';
import { getWidth, getHeight } from '../helpers/size.helper';
import CustomReview from './subcomponents/CustomReview';
import { getReviewByItem } from '../actions/review';
import Spinner from 'react-native-loading-spinner-overlay'

class ItemDetail extends Component {

    state = {
        productName: '',
        item: null
    }

    componentDidMount() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', null);

        this.setState({ item: item });

        this.props.onGetReviewById(item._id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.review.reviews !== nextProps.review.reviews && nextProps.review.reviews) {
            this.props.review.reviews = nextProps.review.reviews;
        }
    }

    _navigateToReviewPage = () => {
        this.props.navigation.navigate('ReviewPage',{item:this.state.item})
    }

    render() {
        const { item } = this.state;
        const { reviews, isLoading } = this.props.review;
        {
            if (isLoading)
                return <Spinner
                    visible={isLoading}
                    textContent='Loading...'
                    textStyle={{ color: "#253145" }}
                    animation='fade' />

            else if (item) {
                return (
                    <ScrollView style={styles.container}>
                        <Image
                            style={styles.itemAvatar}
                            source={{ uri: item.imageUrl }} />
                        <View style={{ padding: 5, backgroundColor: 'white', margin: 2 }}>
                            <Text style={styles.price}>{item.price} VND</Text>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.descriptionText} >{item.description}</Text>
                        </View>

                        <View>
                            <CustomReview reviewsOfItem={reviews} />
                        </View>

                        <TouchableOpacity onPress={this._navigateToReviewPage}>
                            <Text style={{ fontSize: 15, color: 'blue', textAlign: 'center', marginBottom: 10, fontWeight: '900' }}> Review item</Text>
                        </TouchableOpacity>
                    </ScrollView>
                );
            }
            else {
                return (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ERROR 404! ITEM NOT FOUND</Text>
                    </View>
                )
            }
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
        padding: 5
    },
    itemAvatar: {
        width: getWidth(1),
        height: getHeight(0.4)
    },
    price: {
        color: 'orange',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 3
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    descriptionText: {
        fontSize: 13,
    },
    description: {
        width: getWidth(1),
        backgroundColor: 'white',
        padding: 6
    },
});

const mapStateToProps = state => {
    return {
        review: state.review
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onGetReviewById: (itemId) => {
            dispatch(getReviewByItem(itemId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);