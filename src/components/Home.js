import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
    StyleSheet
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CategorySwiper from './subcomponents/CategorySwiper';
import { getHeight, getWidth } from '../helpers/size.helper';
import RandomProduct from './subcomponents/RandomProduct';
import ListItem from './subcomponents/ListItem';
import { connect } from 'react-redux'
import { getItems } from '../actions/item';

class Home extends Component {

    static navigationOptions = {
        header: null,
        title: 'Home',
        tabBarIcon: ({ tintColor }) => { return <FontAwesome name='home' size={20} color={tintColor} /> }
    }

    componentDidMount(){
        this.props.onGetItems();
    }

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.list}>
                        <Text style={styles.title}> Categories</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MainCategory')}
                            style={{ alignSelf: 'flex-end' }}>
                            <Text style={[styles.more, {marginRight:10}]}>More >>></Text>
                        </TouchableOpacity>
                    </View>
                    <CategorySwiper navigation={navigation} />
                </View>

                <View style={{ flex: 1, marginTop: 10 }}>
                    <View style={styles.list}>
                        <Text style={styles.title}> Products</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MainCategory')}
                            style={{ alignSelf: 'flex-end' }}>
                            <Text style={[styles.more, {marginRight:10}]}>More >>></Text>
                        </TouchableOpacity>
                    </View>
                    <RandomProduct navigation = {navigation}  />
                </View>

                <View style={{ flex: 2}}>
                    <Text style={[styles.title, { fontSize: 16, marginLeft: 10, marginTop: 5 }]}> Items For You</Text>
                    <ListItem childNavigation = {navigation} itemState={this.props.item} />
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        padding: 2
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 110,
        marginLeft:2
    },
    more: {
        color: 'blue',
        fontSize: 16,
        fontStyle: 'italic',
        marginLeft: 35,
    }
});

const mapStateToProps = state => {
    return {
        item: state.item
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetItems: () => {
            dispatch(getItems());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);