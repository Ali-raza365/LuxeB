import { Alert } from "react-native";
import { GET_THERAPISTS_DETAIL_API, LOGIN_API, LOGIN_VERIFY_OTP_API, LOGOUT_API, SIGN_UP_API, SIGN_UP_VERIFY_OTP_API } from "../../api/apis";
import { apiGet, apiPost, clearToken, setItem } from "../../utils/axios";
import { saveTherapistsList } from "../reducers/ServicesReducer";
import { savePhoneNumber, saveSignUpCredentials } from "../reducers/UserReducer";
import store from "../Store";
import { _gotoAskForLocation } from "../../navigation/navigationServcies";

export function OnSignUpUser(data, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(SIGN_UP_API, data).then((res) => {
            if (res.error) {
                Alert.alert(res?.error)
            } else {
                store.dispatch(saveSignUpCredentials(data))
                navigation.navigate('verifyotp')
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
            Alert.alert(res?.message)
        })
    })
}

export function OnVerifySignUpOtp(data, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(SIGN_UP_VERIFY_OTP_API, data).then((res) => {
            if (res) {
                Alert.alert(res?.message)
                navigation.navigate('loginphonenumber')
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
            Alert.alert(error?.message)
        })
    })
}


export function OnLoginUser(data, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(LOGIN_API, data).then((res) => {
            if (res) {
                store.dispatch(savePhoneNumber(data?.phone || ''))
                navigation.navigate('loginotp')
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
            Alert.alert(error?.message)
        })
    })
}

export function OnVerifyLoginOtp(data, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(LOGIN_VERIFY_OTP_API, data).then(async (res) => {
            if (res) {
                // navigation.navigate('loginphonenumber')
                await setItem("token", res.token)
                await setItem("user",res.user)
                _gotoAskForLocation(navigation)
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
            Alert.alert(error?.message)
        })
    })
}

export function OnLogoutUser(navigation) {
    return new Promise((resolve, reject) => {
        apiPost(LOGOUT_API).then((res) => {
            if (res) {
                clearToken()
                navigation.navigate('splash')
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
            Alert.alert(error?.message)
        })
    })
}