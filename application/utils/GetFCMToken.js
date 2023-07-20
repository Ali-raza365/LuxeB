import DeviceInfo from "react-native-device-info";
import { PLATFORM } from "../theme/config";
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform, ToastAndroid } from "react-native";

//Requesting Permission
export async function GetFCMToken() {
    return new Promise(async (resolve, reject) => {
        try {
            if (PLATFORM === 'ios') {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                if (enabled) {
                    const token = await messaging().getToken();
                    const macAddress = await DeviceInfo.getDeviceId();
                    const macName = await DeviceInfo.getDeviceName();

                    let fcmDetails = {
                        osType: PLATFORM,
                        fcmToken: token,
                        deviceId: macAddress,
                        deviceName: macName,
                    }
                    resolve(fcmDetails)
                } else {
                    // Alert.prompt("hello world")
                    reject('')
                }
            }
            else if (PLATFORM == 'android' && Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    {
                        title: 'Notification Access Required',
                        message: 'This App needs to Access your notification',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    const token = await messaging().getToken();
                    const macAddress = await DeviceInfo.getDeviceId();
                    const macName = await DeviceInfo.getDeviceName();
                    let fcmDetails = {
                        osType: PLATFORM,
                        fcmToken: token,
                        deviceId: macAddress,
                        deviceName: macName,
                    }
                    resolve(fcmDetails)
                } else {
                    ToastAndroid.show('Please allow notification permission', ToastAndroid.SHORT);
                    resolve()
                }
            } else {
                const token = await messaging().getToken();
                const macAddress = await DeviceInfo.getDeviceId();
                const macName = await DeviceInfo.getDeviceName();
                let fcmDetails = {
                    osType: PLATFORM,
                    fcmToken: token,
                    deviceId: macAddress,
                    deviceName: macName,
                }
                resolve(fcmDetails)
            }
        } catch (error) {
            resolve()
        }
    })
}