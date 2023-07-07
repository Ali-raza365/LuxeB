
import { useNavigation } from "@react-navigation/native";
import { GET_SERVICES_CATEGOIES_API, GET_SLIDER_API, GET_THERAPISTS_AVAILIBLE_API, GET_THERAPISTS_BY_SERVICE_API, GET_THERAPISTS_DETAIL_API, SAVE_PAYMENT_METHOD_API, SET_DEFAULT_PAYMENT_METHOD_API } from "../../api/apis";
import { apiGet, apiPost } from "../../utils/axios";
import { _formatDate } from "../../utils/TimeFunctions";
import { saveServicesCategories, saveTherapistsList, setSelectedService, setSpeciallistDetail } from "../reducers/ServicesReducer";
import store from "../Store";
import { Alert } from "react-native";
import actions from ".";

export function fetchServicesCategories() {
    return new Promise((resolve, reject) => {
        apiGet(GET_SERVICES_CATEGOIES_API).then((res) => {
            if (!!res) {
                store.dispatch(saveServicesCategories(res))
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function fetchSliderItems() {
    return new Promise((resolve, reject) => {
        apiGet(GET_SLIDER_API).then((res) => {
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

export function onServiceSelect(data, service, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(GET_THERAPISTS_BY_SERVICE_API, data).then((res) => {
            store.dispatch(setSelectedService(service))
            if (res?.message) {
                navigation.navigate('servicedetail')
                store.dispatch(saveTherapistsList([]))
            } else if (!!res) {
                store.dispatch(saveTherapistsList(res))
                resolve(res)
                if (navigation) {
                    navigation.navigate('servicedetail')
                }
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function getTherapistAvailability(data) {
    return new Promise((resolve, reject) => {
        apiPost(GET_THERAPISTS_AVAILIBLE_API, data).then((res) => {
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


export function onSpeciallistClick(item, navigation, timeSlot) {
    return new Promise((resolve, reject) => {
        let data = {
            therapist_id: item?.id,
        }
        apiPost(GET_THERAPISTS_DETAIL_API, data).then((res) => {
            if (res?.message) {
                Alert.alert(res?.message)
            } else if (!!res) {
                let speciallistDetail = res?.[0];
                let response = {
                    ...speciallistDetail,
                    services: speciallistDetail.services.map(service => {
                        return {
                            ...service,
                            sub_services: service.sub_services.map(subService => {
                                return {
                                    ...subService,
                                    quantity: 1,
                                    isSelected: false,
                                }
                            })
                        }
                    })
                }
                store.dispatch(setSpeciallistDetail(response))
                resolve(res)
                if (navigation) {
                    navigation.navigate("speciallistdetail", { timeSlot: timeSlot?.time_slot })
                }
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}



export function onSavePaymentMethod(data, navigation) {
    return new Promise((resolve, reject) => {
        apiPost(SAVE_PAYMENT_METHOD_API, data).then((res) => {
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

export function onSetDefaultPaymentMethod(data) {
    return new Promise((resolve, reject) => {
        apiPost(SET_DEFAULT_PAYMENT_METHOD_API, data).then((res) => {
            if (res.message) {
                Alert.alert(res.message)
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


// setItem('userData', res.data).then((returnValue)=>{
//     store.dispatch(saveUserData(res?.data))
//     resolve(res)
// }).catch((error)=>{
//     resolve(error)
// })
