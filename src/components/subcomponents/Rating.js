import React, { Component } from 'react'
import {
    View,
    Image
} from 'react-native'

const FILL = 1;
const UNFILL = 0;
const HALF = -1

export default class Rating extends Component {

    state = {
        starfills: []
    }

    renderStar = () => {
        const { rating } = this.props;
        const starfills = [];
        let max = 0;
        for (let i = 0; i < 5; i++) {
            if (rating > i) {
                max++;
            }
            else {
                break;
            }
        }

        const odd = (rating > max) ? rating - max : max - rating;
        let unfill = 0;
        if (odd == 0) {
            unfill = 5 - rating;
        }
        else {
            unfill = 5 - max;
            max = max - 1;
        }

        for (let i = 0; i < max; i++) {
            starfills.push(FILL);
        }

        if (odd) {
            starfills.push(HALF);
        }

        for (let i = 0; i < unfill; i++) {
            starfills.push(UNFILL);
        }
        this.setState({ starfills: starfills })
    }

    componentDidMount() {
        this.renderStar();
    }

    render() {
        const { starStyle, style } = this.props;
        return (
            <View style={[style, { flexDirection: 'row' }]}>
                {
                    this.state.starfills.map((fill, index) => {
                        if (FILL == fill) {
                            return <View key={index.toString()}>
                                <Image style={[{ width: 12, height: 12 },starStyle]} source={require('../../utils/images/fill.png')} />
                            </View>

                        }
                        else if (UNFILL == fill) {
                            return <View key={index.toString()}>
                                <Image style={[{ width: 12, height: 12 },starStyle]} source={require('../../utils/images/unfill.png')} />
                            </View>
                            
                        }
                        else if (HALF == fill) {
                            return <View key={index.toString()}>
                                <Image style={[{ width: 12, height: 12 },starStyle]} source={require('../../utils/images/half.png')} />
                            </View>
                        }
                    })
                }
            </View>
        );
    }
}