import { Alert } from "react-native";
import { GET_DISTRICTS_API, GET_SUBDISTRICTS_API, GET_THERAPISTS_DETAIL_API, GET_USER_DETAIL_API, LOGIN_API, LOGIN_VERIFY_OTP_API, LOGOUT_API, SAVE_PAYMENT_METHOD_API, SAVE_USER_LOCATION_API, SET_DEFAULT_PAYMENT_METHOD_API, SIGN_UP_API, SIGN_UP_VERIFY_OTP_API } from "../../api/apis";
import { apiGet, apiPost, apiPut, clearToken, getItem, setItem } from "../../utils/axios";
import { saveTherapistsList } from "../reducers/ServicesReducer";
import { saveDistricts, savePhoneNumber, saveSignUpCredentials, saveUserDetail, saveUserLocation } from "../reducers/UserReducer";
import store from "../Store";
import { _gotoAskForLocation, _gotoBottomTabs } from "../../navigation/navigationServcies";
import actions from ".";

export function OnSignUpUser(data, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(SIGN_UP_API, data).then((res) => {
            if (res.error) {
                Alert.alert(res?.error)
            } else {
                store.dispatch(saveSignUpCredentials(data))
                if (navigation) {
                    navigation.navigate('verifyotp')
                }
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
                if (navigation) {
                    navigation.navigate('loginotp')
                }
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
                await setItem("token", res.token)
                await setItem("user", res.user)
                const userDetail = res.user
                store.dispatch(saveUserDetail(userDetail))
                if (userDetail?.locations && userDetail?.locations.length != 0) {
                    let defaultLocation = userDetail?.locations.find((item) => item?.is_booking == true)
                    store.dispatch(saveUserLocation(defaultLocation))
                    _gotoBottomTabs(navigation)
                } else {
                    _gotoAskForLocation(navigation);
                }
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
            // Alert.alert(error?.message)

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

export function fetchDistricts() {
    return new Promise((resolve, reject) => {
        apiGet(GET_DISTRICTS_API).then((res) => {
            if (!!res) {
                store.dispatch(saveDistricts(res))
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function fetchSubDistricts(data) {
    return new Promise((resolve, reject) => {
        apiPost(GET_SUBDISTRICTS_API, data).then((res) => {
            if (!!res) {
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}
export function SaveUserLocation(data) {
    return new Promise((resolve, reject) => {
        apiPost(SAVE_USER_LOCATION_API, data).then((res) => {
            if (!!res) {
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function checkUserStatus(navigation) {
    return new Promise((resolve, reject) => {
        getItem('user').then((user) => {
            apiPost(GET_USER_DETAIL_API, { customer_id: user?.id }).then((userDetail) => {
                if (!!userDetail) {
                    console.log({ userDetail })
                    store.dispatch(saveUserDetail(userDetail))
                    if (userDetail?.locations && userDetail?.locations.length != 0) {
                        let defaultLocation = userDetail?.locations.find((item) => item?.is_booking == true)
                        store.dispatch(saveUserLocation(defaultLocation))
                        _gotoBottomTabs(navigation)
                    } else {
                        _gotoAskForLocation(navigation);
                    }
                }
                resolve()
            }).catch((error) => {
                reject(error)
                if (error?.status == 401) {
                    clearToken()
                    navigation.navigate('welcome')
                }
            })
            resolve()
        }).catch((error) => {
            reject(error)
        })
    })
}


export function getUserDetails() {
    return new Promise((resolve, reject) => {
        getItem('user').then((user) => {
            apiPost(GET_USER_DETAIL_API, { customer_id: user?.id }).then((userDetail) => {
                if (!!userDetail) {
                    console.log({ userDetail })
                    store.dispatch(saveUserDetail(userDetail))
                }
                resolve()
            }).catch((error) => {
                reject(error)
            })
            resolve()
        }).catch((error) => {
            reject(error)
        })
    })
}


export function onSavePaymentMethod(data, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(SAVE_PAYMENT_METHOD_API, data).then((res) => {
            if (!!res) {
                actions.getUserDetails()
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function onSetDefaultPaymentMethod(data) {
    return new Promise((resolve, reject) => {
        apiPost(SET_DEFAULT_PAYMENT_METHOD_API, data).then(async (res) => {
            if (res.message) {
                Alert.alert(res.message)
                await actions.getUserDetails()
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}


export function onSetDefaultAddress(data) {
    return new Promise((resolve, reject) => {
        apiPut(SAVE_USER_LOCATION_API, data).then(async (res) => {
            if (res.message) {
                Alert.alert(res.message)
                await actions.getUserDetails()
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}
