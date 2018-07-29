import React, { Component } from 'react'
import {
    View,
    Text,
    ProgressBarAndroid
} from 'react-native'

export default class ProgressReview extends Component {
    renderBarColor = (fixedWidth,numOfStar) =>{
        if(numOfStar > 0){
            return <View style={{ width: fixedWidth,height:6, backgroundColor: 'yellow' }}></View>
        }
    }
    render() {
        const lengthOfView = 60;
        const { star, numOfStar, total } = this.props;
        const fixedWidth = (numOfStar > 0 && total > 0) ? (lengthOfView * numOfStar/total) : lengthOfView;
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{ fontSize: 11, marginRight:5 }}>{star} STAR</Text>
                <View style={{
                    width: lengthOfView,
                    height: 6,
                    backgroundColor: '#e5e5e5',
                }}>
                    {
                        this.renderBarColor(fixedWidth,numOfStar)
                    }
                </View>
                <Text style={{ fontSize: 11, marginLeft: 5 }}> {numOfStar} </Text>
            </View>
        );
    }
}