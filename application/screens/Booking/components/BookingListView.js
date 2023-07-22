import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONT_BOLD, FS, WP } from '../../../theme/config';
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { API_BASE_URL } from '../../../api/apis';
import { Loader } from '../../../components';
import actions from '../../../store/actions';

const BookingListView = ({ item, navigation }) => {
    const [loading, setLoading] = useState(false)

    const onClickBookking = async (item) => {
        try {
            setLoading(true)
            const data = {
                appointment_id: item?.id,
            }
            const res = await actions.fetchAppointmentDetail(data)
            if (res?.message) {
                Alert.alert(res?.message)
            } else if (res) {
                navigation.navigate('bookingdetail')
            }
            setLoading(false)
        } catch (error) {
            console.log("error riased in on services api", error)
            alert(error?.message)
            setLoading(false)
        }
    }



    return (
        <TouchableOpacity
            onPress={() => onClickBookking(item)}
            style={styles.ListContainer}>
            <Loader isVisible={loading} />
            <View style={styles.reviewInfoContainer}>
                <Text style={styles.reviewHeading}>{item?.therapist?.name || ""}</Text>
                <View style={styles.row}>
                    <MatComIcons name="map-marker-outline" size={WP(4.5)} color={COLORS.blackColor} />
                    <Text style={styles.reviewText} >{item?.booking_address || ''}</Text>
                </View>
                <View style={[styles.row, { borderBottomWidth: 0, paddingTop: 0, marginTop: 0 }]}>
                    <Feather name="clock" size={WP(4.5)} color={COLORS.blackColor} />
                    <Text style={styles.reviewText} >  {item?.start_time + " - " + item?.end_time}</Text>
                </View>
            </View>
            <View style={styles.reviewImageContainer}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: API_BASE_URL + item?.therapist?.profile_image }} />
            </View>
        </TouchableOpacity>
    )
}

export default BookingListView

const styles = StyleSheet.create({
    ListContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: WP(2),
        backgroundColor: COLORS.whiteColor,
        paddingHorizontal: WP(5),
        paddingVertical: WP(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewImageContainer: {
        width: WP(20),
        borderRadius: WP(20),
        overflow: 'hidden',
        height: WP(20),
    },
    reviewHeading: {
        fontSize: FS(2.2),
        fontWeight: '700',
        color: COLORS.blackColor,
        fontFamily: FONT_BOLD,
    },
    reviewText: {
        fontSize: WP(2.8),
        paddingVertical: WP(1),
        color: COLORS.blackColor,
    },
    reviewInfoContainer: {
        width: '70%',
    },
    row: {
        flexDirection: 'row',
        marginVertical: WP(1),
        paddingVertical: WP(1),
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderBottomColor: COLORS.grey,
    }

})