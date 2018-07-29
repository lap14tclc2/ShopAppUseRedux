import { AsyncStorage } from 'react-native'

const PRIVATE_TOKEN_KEY = 'private/token/:key';


export  function saveToken(token) {
    try {
      getToken().then(exist => {
          if(exist){
              removeToken();
          }
          else{
              AsyncStorage.setItem(PRIVATE_TOKEN_KEY,JSON.stringify(token));
          }
      })
    }
    catch (err) {
        console.log(err)
    }
}

export function getToken() {
    return AsyncStorage.getItem(PRIVATE_TOKEN_KEY)
        .then(result => {
            if (result !== null) {
                return JSON.parse(result);
            }
        })
}

export function removeToken() {
    console.log('remove token')
    try {
        AsyncStorage.removeItem(PRIVATE_TOKEN_KEY, )
    } catch (err) {
        console.log('cannot remove token')
    }
}
