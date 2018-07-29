import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { getWidth, getHeight } from '../../helpers/size.helper';
import Rating from './Rating';
import { getReviewByItemButNotDispatch } from '../../actions/review'

class Item extends Component {

    state = {
        reviews: [],
        average:0,
        total:0,
        isMounted: false
    }
    
    componentDidMount() {
        this.setState({ isMounted: true })
        const { item } = this.props;
        getReviewByItemButNotDispatch(item._id).then(result => {
            if (this.state.isMounted) {
                this.setState({ reviews: result })
            }
        });
    }

    calculateAverageRating = (reviews) => {
        let sum = 0;
        const length = reviews.length;
        reviews.map(item => {
            sum += item.rating;
        })
        return (sum / length);
    }

    componentWillUnmount() {
        this.setState({isMounted:false})
    }

    findNumberOfReview(reviews) {
        let count = 0;
        reviews.map(item => {
            if (item.rating > 0) {
                count++;
            }
        })
        return count;
    }

    _onPress = () => {
        const { item, navigation } = this.props;
        navigation.navigate('ItemDetail', { item: item });
    }

    render() {
        const { item } = this.props;
        const { reviews}  = this.state
        const average = this.calculateAverageRating(reviews);
        const total = this.findNumberOfReview(reviews);
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={this._onPress}>
                    <Image source={{ uri: item.imageUrl }}
                        style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.textItem}>Item: <Text style={{ fontWeight: 'normal' }}>{item.name}</Text></Text>
                <Text style={styles.textItem}>Price: <Text style={{ fontWeight: 'normal' }}>{item.price.toString()}</Text></Text>
                {total > 0 ?
                    <View style={{ flexDirection: 'row' }}>
                        <Rating rating={average} />
                        <Text style={{ fontSize: 11 }}>     ({total})</Text>
                    </View> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
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



export default (Item)