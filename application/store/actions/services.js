
import { useNavigation } from "@react-navigation/native";
import { APPLY_VOUCHER_API, BOOK_APPOINTMENT_API, FAVOURIITIES_API, GET_APPOINTMENT_API, GET_APPOINTMENT_DETAIL_API, GET_SERVICES_CATEGOIES_API, GET_SLIDER_API, GET_THERAPISTS_AVAILIBLE_API, GET_THERAPISTS_BY_SERVICE_API, GET_THERAPISTS_DETAIL_API, SAVE_PAYMENT_METHOD_API, SET_DEFAULT_PAYMENT_METHOD_API } from "../../api/apis";
import { apiDelete, apiGet, apiPost, getHeaders } from "../../utils/axios";
import { _formatDate } from "../../utils/TimeFunctions";
import { saveAppointmentDetail, saveAppointmentsList, saveServicesCategories, saveTherapistsList, setFetchingTherapistsLoading, setSelectedService, setSpeciallistDetail } from "../reducers/ServicesReducer";
import store from "../Store";
import { Alert } from "react-native";
import actions from ".";
import axios from "axios";

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
        navigation.navigate('servicedetail')
        store.dispatch(setFetchingTherapistsLoading())
        apiPost(GET_THERAPISTS_BY_SERVICE_API, data).then((res) => {
            store.dispatch(setSelectedService(service))
            if (res?.message) {
                // navigation.navigate('servicedetail')
                store.dispatch(saveTherapistsList([]))
            } else if (!!res) {
                store.dispatch(saveTherapistsList(res))
                resolve(res)
                if (navigation) {
                    // navigation.navigate('servicedetail')
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



export function onApplyVoucher(data) {
    return new Promise((resolve, reject) => {
        apiPost(APPLY_VOUCHER_API, data).then((res) => {
            if (!!res) {
                resolve(res)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function onbookAppointment(data) {
    return new Promise((resolve, reject) => {
        apiPost(BOOK_APPOINTMENT_API, data).then((res) => {
            if (!!res) {
                resolve(res)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}


export function fetchAppointments(data) {
    return new Promise((resolve, reject) => {
        // apiGet(GET_APPOINTMENT_API+'?customer_id:14').then((res) => {
        apiPost(GET_APPOINTMENT_API, data).then((res) => {
            console.log(res)
            if (!!res) {
                store.dispatch(saveAppointmentsList(res))
                resolve(res)
                return;
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function fetchAppointmentDetail(data) {
    return new Promise((resolve, reject) => {
        apiPost(GET_APPOINTMENT_DETAIL_API, data).then((res) => {
            if (!!res) {
                store.dispatch(saveAppointmentDetail(res))
                resolve(res)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function fetchFavoriteSpeciallists(id) {
    return new Promise((resolve, reject) => {
        apiGet(FAVOURIITIES_API + `?customer_id=${id}`,).then((res) => {
            if (!!res) {
                resolve(res)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function onFavSpeciallists(data) {
    return new Promise((resolve, reject) => {
        apiPost(FAVOURIITIES_API, data).then((res) => {
            if (!!res) {
                resolve(res)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function onUnFavSpeciallists(data) {
    return new Promise(async (resolve, reject) => {
        const getTokenHeader = await getHeaders();
        axios({
            method: 'Delete',
            url: FAVOURIITIES_API,
            params: data,
            headers: {
                ...getTokenHeader
            }
        }).then((res) => {
            if (!!res) {
                resolve(res)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}
