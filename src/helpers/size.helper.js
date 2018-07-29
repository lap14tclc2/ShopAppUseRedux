import {Dimensions} from 'react-native'

export function getWidth(number = 0.88){
    return ( Dimensions.get('window').width * number) ;
}

export function getHeight(number = 0.18){
    return ( Dimensions.get('window').height * number ) ;
}