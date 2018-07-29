import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ProgressBarAndroid,
    StyleSheet
} from 'react-native'
import { getWidth, getHeight } from '../../helpers/size.helper';
import Rating from './Rating';
import ProgressReview from './ProgressReview';
import { connect } from 'react-redux'
import { getUsernameById } from '../../actions/authen'

class ReviewItem extends Component {

    state = {
        username: '',
        time: ''
    }
    componentDidMount() {
        const { item } = this.props;
        getUsernameById(item.user).then(result => {
            const localTime = new Date(result.time).toDateString();
            this.setState({ username: result.user.username, time: localTime });
        })
    }

    render() {
        const { item } = this.props;
        const { username ,time} = this.state
        return (
            <View style={{
                padding: 3,
                margin: 5,
                borderWidth:0.5,
                borderColor:'lightgrey',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    {username} <Text style={{fontSize: 12,fontWeight: 'normal',fontStyle:'italic'}}>{time}</Text>  </Text>
                    <Text style={{
                        fontSize: 13,
                        fontStyle: 'italic',
                        marginTop: 5
                    }}>{item.comment}</Text>

                </View>
                <Rating style={{ marginTop: 5, marginRight: 20, alignSelf: 'flex-start' }} rating={item.rating} />
            </View>
        );
    }
}



class CustomReview extends Component {

    state = {
        reviews: [],
        average: 0,
        total: 0,
    }

    _calculateAverageRating = (reviews) => {
        let sum = 0;
        const length = reviews.length;
        reviews.map(item => {
            sum += item.rating;
        })
        const average = (sum / length).toFixed(2);
        this.setState({ average:average });
    }

    componentDidMount() {
        const { reviewsOfItem } = this.props;
        let count = 0;
        reviewsOfItem.map(item => {
            if (item.rating > 0) {
                count++;
            }
        })
        this.setState({ reviews: reviewsOfItem, total: count });
        this._calculateAverageRating(reviewsOfItem);
    }


    findNumberStars(star) {
        let count = 0;
        this.state.reviews.map(item => {
            if (item.rating === Number(star)) {
                count++;
            }
        });
        return count;
    }

    render() {
        const {average} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.rating}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{average} <Text style={{ fontSize: 15, fontWeight: 'normal' }}>/ 5</Text>
                        </Text>
                        {average > 0 ? <Rating rating={average} /> : null}
                        <Text style={{ fontSize: 12, textAlign: 'center' }}>{this.state.reviews.length} reviews</Text>
                    </View>

                    <View style={{ margin: 3, padding: 5 }}>
                        <ProgressReview star={5} numOfStar={this.findNumberStars(5)} total={this.state.total} />
                        <ProgressReview star={4} numOfStar={this.findNumberStars(4)} total={this.state.total} />
                        <ProgressReview star={3} numOfStar={this.findNumberStars(3)} total={this.state.total} />
                        <ProgressReview star={2} numOfStar={this.findNumberStars(2)} total={this.state.total} />
                        <ProgressReview star={1} numOfStar={this.findNumberStars(1)} total={this.state.total} />
                    </View>
                </View>

                <FlatList
                    style={{ backgroundColor: 'white', marginTop: 20 }}
                    data={this.state.reviews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return <ReviewItem item={item} />
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default CustomReview;