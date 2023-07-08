import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, PermissionsAndroid, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button } from '../../components';
import { COLORS, FS, HP, PLATFORM, WP } from '../../theme/config';
import { IMAGES } from '../../constants/ImagePath';
import Geolocation from '@react-native-community/geolocation';
import LocationModal from './Components/LocationModal';
import DeviceInfo from 'react-native-device-info';
import actions from '../../store/actions';
import { getItem } from '../../utils/axios';
import { GetLocation } from '../../utils/GetLocation';

export default function AskForLocation({ navigation }) {

    const [showModal, setShowModal] = useState(false);
    const [coordinate, setCoordinate] = useState(null)

    const toggleLocationModal = () => {
        if (showModal) setShowModal(false)
        else setShowModal(true)
    }

    const onPress = () => {
        navigation.navigate('gender');
    };

    const fetchDistricts = async () => {
        try {
            let res = await actions.fetchDistricts()
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchDistricts()
    }, [])


    const onSaveLocation = async (lat, lng) => {
        try {
            const customer_id = await getItem('user')
            const data = {
                // district: district.id,
                // sub_district: subDistrict.id,
                lat: lat,
                long: lng,
                customer_id: "14"
            }
            let resp = await actions.SaveUserLocation(data)
            if (resp) {
                navigation.navigate('gender');
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }


    const onGettingLocation = async () => {
        try {
            await GetLocation().then((loc) => {
                console.log({ loc })
                setCoordinate(loc)
                toggleLocationModal()
            })
        } catch (error) {
            console.log('error', error)
        }
    }


    // const onGettingLocation = async () => {
    //     try {
    //         if (PLATFORM == 'ios') {
    //             Geolocation.getCurrentPosition(
    //                 //Will give you the current location
    //                 (position) => {
    //                     console.log('You are Here');
    //                     //getting the Longitude from the location json
    //                     const currentLongitude =
    //                         JSON.stringify(position.coords.longitude);
    //                     //getting the Latitude from the location json
    //                     const currentLatitude =
    //                         JSON.stringify(position.coords.latitude);
    //                     //Setting Longitude state
    //                     console.log({ currentLongitude });
    //                     setCoordinate({ longitude: currentLongitude, latitude: currentLatitude })
    //                     toggleLocationModal()
    //                     // onSaveLocation(currentLatitude, currentLongitude)
    //                 },
    //                 (error) => {
    //                     console.log(error)
    //                 }
    //             )
    //         } else {
    //             try {
    //                 const granted = await PermissionsAndroid.request(
    //                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //                     {
    //                         title: 'Location Access Required',
    //                         message: 'This App needs to Access your location',
    //                     },
    //                 );
    //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                     DeviceInfo.isLocationEnabled().then((enabled) => {
    //                         console.log("Is location is enable", enabled)
    //                         // true or false
    //                         if (enabled) {
    //                             Geolocation.getCurrentPosition(
    //                                 //Will give you the current location
    //                                 (position) => {
    //                                     console.log('You are Here');
    //                                     //getting the Longitude from the location json
    //                                     const currentLongitude =
    //                                         JSON.stringify(position.coords.longitude);
    //                                     //getting the Latitude from the location json
    //                                     const currentLatitude =
    //                                         JSON.stringify(position.coords.latitude);
    //                                     setCoordinate({ longitude: currentLongitude, latitude: currentLatitude })
    //                                     //Setting Longitude state
    //                                     console.log({ currentLongitude });
    //                                     toggleLocationModal()
    //                                     // onSaveLocation(currentLatitude, currentLongitude)
    //                                 },
    //                                 (error) => {
    //                                     // resolve({ longitude: null, latitude: null })
    //                                     console.log(error)
    //                                 }
    //                             )
    //                         } else {
    //                             ToastAndroid.show('Please turn on your mobile location', ToastAndroid.SHORT);

    //                         }
    //                     });
    //                 } else {
    //                     console.log('Permission Denied');
    //                 }
    //             } catch (err) {
    //                 console.log('Permission Denied 11');
    //                 console.log(err);
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error, "234")
    //     }
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <AppBar type={'dark'} backgroundColor={COLORS.offWhiteColor} />

            <LocationModal
                isVisible={showModal}
                onBackButtonPress={toggleLocationModal}
                onBackdropPress={toggleLocationModal}
                coordinate={coordinate}
            />

            <View style={styles.container}>
                <View style={styles.mainStyle}>
                    <View style={styles.innerContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Enable Location Permission</Text>
                            <Text style={styles.desc}>
                                We will need your location to give you better experience.
                            </Text>
                        </View>
                        <View>
                            <Image style={styles.imageStyle} source={IMAGES.compass} />
                        </View>
                    </View>

                </View>
                <View style={{ justifyContent: "flex-end", flex: 0.4 }}>
                    <Button
                        title="Sure, Let’s do it"
                        onPress={onGettingLocation}
                        textStyle={{ color: COLORS.whiteColor }}
                        buttonStyle={{ marginBottom: HP(4.5) }}
                    />
                    <Button
                        title="May be Later"
                        textStyle={{ color: COLORS.blackColor }}
                        onPress={onPress}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: HP(100),
        backgroundColor: '#f5f5f5',
    },
    mainStyle: {
        display: 'flex',
        width: WP(100),
        flex: 0.6
    },
    innerContainer: {
        display: 'flex',
        width: WP(100),
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: WP(7),
        paddingTop: HP(12),
        marginBottom: HP(1.5),
    },
    heading: {
        fontWeight: '600',
        textAlign: 'center',
        color: COLORS.blackColor,
        fontSize: FS(3.5),
    },
    desc: {
        paddingTop: HP(1),
        fontSize: FS(2),
        fontWeight: '500',
        width: WP(55),
        alignSelf: 'center',
        lineHeight: 20,
        color: COLORS.blackColor,
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: COLORS.whiteColor,
        color: COLORS.blackColor,
        borderWidth: 0.8,
        borderColor: COLORS.blackColor,
        bottom: HP(3),
    },
    imageStyle: {
        width: WP(50),
        height: WP(50),
    },
});
