import React from "react";
import Geolocation from "@react-native-community/geolocation";
import { PLATFORM } from "../theme/config";
import { PermissionsAndroid, ToastAndroid } from "react-native";
import DeviceInfo from "react-native-device-info";


export const GetLocation = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (PLATFORM == 'ios') {
                Geolocation.getCurrentPosition(
                    //Will give you the current location
                    (position) => {
                        console.log('You are Here');
                        //getting the Longitude from the location json
                        const currentLongitude =
                            JSON.stringify(position.coords.longitude);
                        //getting the Latitude from the location json
                        const currentLatitude =
                            JSON.stringify(position.coords.latitude);
                        //Setting Longitude state
                        console.log({ currentLongitude });
                        resolve({ longitude: currentLongitude, latitude: currentLatitude })
                    },
                    (error) => {
                        resolve({ longitude: null, latitude: null })
                    }
                )

            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        DeviceInfo.isLocationEnabled().then((enabled) => {
                            console.log("Is location is enable", enabled)
                            // true or false
                            if (enabled) {
                                Geolocation.getCurrentPosition(
                                    //Will give you the current location
                                    (position) => {
                                        console.log('You are Here');
                                        //getting the Longitude from the location json
                                        const currentLongitude =
                                            JSON.stringify(position.coords.longitude);
                                        //getting the Latitude from the location json
                                        const currentLatitude =
                                            JSON.stringify(position.coords.latitude);
                                        resolve({ longitude: currentLongitude, latitude: currentLatitude })
                                        //Setting Longitude state
                                        console.log({ currentLongitude });
                                    },
                                    (error) => {
                                        reject(error)
                                    }
                                )
                            } else {
                                ToastAndroid.show('Please turn on your mobile location', ToastAndroid.SHORT);
                                reject()
                            }
                        });
                    } else {
                        console.log('Permission Denied');
                        reject()
                    }
                } catch (err) {
                    console.log('Permission Denied 11');
                    reject()
                    console.log(err);
                }
            }
        } catch (error) {
            console.log(error, "234")
            reject(error);
        }
    })
}