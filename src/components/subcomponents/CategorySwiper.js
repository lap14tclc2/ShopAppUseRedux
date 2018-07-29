import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'
import { getWidth, getHeight } from '../../helpers/size.helper';
import { connect } from 'react-redux'
import { getRandomCategory } from '../../actions/category';
import Spinner from 'react-native-loading-spinner-overlay'
import { getProductsByCategory } from '../../actions/product';

class SwiperItem extends Component {
    _onPress = () => {
        const { item, parentProps } = this.props
        parentProps.onGetProductById(item._id);
        this.props.navigation.navigate('MainCategory');
    }

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity
                onPress={this._onPress}>
                <Image source={{ uri: item.imageUrl }}
                    style={styles.swiperItem} />
            </TouchableOpacity>
        )
    }
}

class CategorySwiper extends Component {

    componentDidMount() {
        this.props.onGetSwiperData();
    }

    render() {
        const { navigation } = this.props;
        const { swipers, isLoading } = this.props.categories;
        {
            if (isLoading)
                return <Spinner
                    visible={isLoading}
                    textContent='Loading...'
                    textStyle={{ color: "#253145" }}
                    animation='fade' />
        }
        return (
            <Swiper
                showsButtons={false}
                width={getWidth()}
                removeClippedSubviews={false}
                showsPagination={true}
                style={styles.swiper}
                paginationStyle={{ position: 'absolute', top: 69 }}
                loop={true}  >
                {
                    swipers.map(item => {
                        return (
                            <View key={item._id}>
                                <SwiperItem navigation={navigation} item={item} parentProps={this.props} />
                            </View>)
                    })
                }
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    swiper: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    swiperItem: {
        width: getWidth(0.88),
        height: getHeight(0.17),
        borderWidth: 1,
        borderColor: '#ffc770'
    },
});

const mapStateToProps = state => {
    return {
        categories: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetSwiperData: () => {
            dispatch(getRandomCategory());
        },
        onGetProductById: categoryId => {
            dispatch(getProductsByCategory(categoryId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySwiper);