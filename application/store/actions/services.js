
import { useNavigation } from "@react-navigation/native";
import { GET_SERVICES_CATEGOIES_API, GET_THERAPISTS_BY_SERVICE_API, GET_THERAPISTS_DETAIL_API } from "../../api/apis";
import { apiGet, apiPost } from "../../utils/axios";
import { _formatDate } from "../../utils/TimeFunctions";
import { saveServicesCategories, saveTherapistsList, setSpeciallistDetail } from "../reducers/ServicesReducer";
import store from "../Store";
import { Alert } from "react-native";

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

export function onServiceSelect(service, navigation, type) {
    return new Promise((resolve, reject) => {
        let data = {
            service_id: 1,
            location_id: 1,
            // date: _formatDate(new Date()),
            date: '2023-06-27',
            type: 'silver',
        }
        apiPost(GET_THERAPISTS_BY_SERVICE_API, data).then((res) => {
            if (res?.message) {
                Alert.alert(res?.message)
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


export function onSpeciallistClick(item, navigation) {
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
                    navigation.navigate("speciallistdetail")
                }
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
