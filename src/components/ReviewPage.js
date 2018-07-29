import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    Keyboard,
    ScrollView,
    StyleSheet
} from 'react-native'
import { getWidth, getHeight } from '../helpers/size.helper';
import { getUsernameById, getUsername } from '../actions/authen';
import { connect } from 'react-redux'
import { sendReview, getReviewByItem } from '../actions/review';

class Star extends Component {


    componentWillMount() {

    }

    _onRate = () => {
        const { func, index } = this.props;
        func(index);
    }

    render() {
        const { item } = this.props;
        {
            if (item > 0) {
                return <TouchableOpacity onPress={this._onRate}>
                    <Image style={{ width: 25, height: 25 }}
                        source={require('../utils/images/fill.png')} />
                </TouchableOpacity>
            }
            else {
                return <TouchableOpacity onPress={this._onRate}>
                    <Image style={{ width: 20, height: 20 }}
                        source={require('../utils/images/unfill.png')} />
                </TouchableOpacity>
            }
        }
    }
}

class ReviewPage extends Component {

    state = {
        rating: 0,
        username: '',
        comment:'',
        stars: [0, 0, 0, 0, 0]
    }
    componentDidMount() {
        this.props.onGetUsername();
    }

    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        const nextUsername = user.username;
        if (nextUsername.length > 0 && nextUsername !== this.props.user.username) {
            this.setState({ username: nextUsername });
        }
    }

    _onRateStar = (index) => {
        const { stars } = this.state;
        for (let i = 0; i <= index; i++) {
            stars[i] = 1;
        }
        for (let i = index + 1; i < stars.length; i++) {
            stars[i] = 0;
        }
        this.setState({ stars: stars, rating: index })
    }
    _onSubmitReview = () => {
        const item = this.props.navigation.getParam('item', null);
        const {comment, rating} = this.state;
        if(comment.length == 0 && rating == 0){
           return;
        }
        this.props.onSubmitReview({
            comment:comment,
            rating:rating,
            itemId: item._id
        });
        this.props.navigation.goBack();
    }

        
    componentWillUnmount(){
        //update review in detail page
        const item = this.props.navigation.getParam('item', null);
        this.props.onUpdateReview(item._id)
    }

    render() {
        const { stars, username } = this.state;
        const item = this.props.navigation.getParam('item', null);
        return (
            <ScrollView contentContainerStyle={{ backgroundColor: '#fbfbfb', flex: 1, alignItems: 'center' }}>

                <View style={{height: getHeight(0.55) , backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.imageUrl }} style={{ marginLeft: 10, width: 130, height: 200 }} />

                    <ScrollView style={{ padding: 5, margin: 5 }}>
                        <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '500' }}>{item.title}</Text>
                        <Text style={{ marginTop: 10, fontSize: 10 }}> {item.description} </Text>
                        <FlatList
                            style={{ marginTop: 20 }}
                            horizontal={true}
                            data={stars}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return <Star func={this._onRateStar} index={index} item={item} />
                            }}
                        />
                    </ScrollView>
                </View>

                <View style={{ margin: 5, alignSelf: 'flex-start' }}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Review By {username}</Text>
                </View>

                <TextInput
                    style={{ textAlignVertical: 'top', width: getWidth(0.95), height: 120, borderWidth: 1, borderColor: 'lightgrey' }}
                    placeholder="Type your comment"
                    underlineColorAndroid='transparent'
                    maxLength={200}
                    returnKeyType="done"
                    onChangeText={text => {this.setState({comment:text})}}
                    onSubmitEditing={Keyboard.dismiss}
                />


                <TouchableOpacity
                    onPress={this._onSubmitReview}
                    style={{
                        marginTop: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: getWidth(1),
                        height: 50,
                        backgroundColor: 'orangered'
                    }}>
                    <Text style={{ color: 'white', fontSize: 23 }}>SEND</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsername: () => {
            dispatch(getUsername());
        },
        onSubmitReview: (review) => {
            dispatch(sendReview(review))
        },
        onUpdateReview: (itemId) => {
            dispatch(getReviewByItem(itemId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);