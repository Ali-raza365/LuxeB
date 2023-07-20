/**
 * @format
 */

import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry, LogBox, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';
import { Text } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications




messaging().onMessage((message) => {
    // console.log(Platform.OS ,Platform.OS != 'ios', 'ios validation' )
    // if (Platform.OS != 'ios') {

    console.log(message, 'message')
    //     PushNotification.localNotification({
    //         title: message.notification.title,
    //         message: message.notification.body,
    //         date: new Date(Date.now() + 60 * 1000),
    //         bigPictureUrl: message.notification.android.imageUrl,
    //         playSound: true,
    //         largeIcon: undefined,
    //         largeIconUrl: undefined,
    //         smallIcon: undefined,
    //     });
    // }

    onDisplayNotification(message)
})

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('BACKGROUND HANDLER', remoteMessage);
});

messaging().onNotificationOpenedApp((remoteNotification) => {
    // Store.dispatch({
    //     type: SET_BACKGROUND_NOTIFICATION,
    //     notification: remoteNotification
    // });
    console.log('ON NOTIFICATION HANDLER');
});

messaging().getInitialNotification().then((remoteNotification) => {
    // Store.dispatch({
    //     type: SET_BACKGROUND_NOTIFICATION,
    //     notification: remoteNotification
    // });
    console.log('INITIAL HANDLER', remoteNotification);
})
    .catch((err) => {
        alert(err);
    })


async function onDisplayNotification(notification) {
    const channelId = await notifee.createChannel({
        id: notification?.notification?.android?.channelId || 'default',
        name: notification?.notification?.android?.channelId || 'Default Channel',
        sound: notification?.notification?.android?.sound || 'default',
        importance: AndroidImportance.HIGH,
    });

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions

    await notifee.requestPermission();

    // if (notifee.authorizationStatus === AuthorizationStatus.DENIED) {
    //     console.log('User denied permissions request');
    // } else if (notifee.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    //     console.log('User granted permissions request');
    // } else if (notifee.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
    //     console.log('User provisionally granted permissions request');
    // }

    // Sometime later...
    await notifee.displayNotification({
        id: notification.messageId,
        title: notification?.notification?.title || '',
        body: notification?.notification?.body || '',
        data: {  ...notification?.data },
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
        },
        ios: {
            sound: notification?.notification?.sound || 'local.wav',
        },
    });
}

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}

// disable all console log in project
if (!__DEV__) {
    console.log = () => null;
}

AppRegistry.registerComponent(appName, () => App);
