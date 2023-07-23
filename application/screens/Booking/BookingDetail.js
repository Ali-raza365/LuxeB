import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, WP, FS, HP, FONT_BOLD } from '../../theme/config'
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { AppBar } from '../../components';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../api/apis';

const BookingDetail = () => {

    let item = null;

    const detail = useSelector(store => store.service.appointmentDetail);
    const currency = useSelector(state => state.user.currency);


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: WP(20) }}
            style={styles.container}
        >
            <AppBar type='light' backgroundColor={COLORS.blackColor} />
            <View style={styles.ListContainer}>
                <View style={styles.reviewInfoContainer}>
                    <Text style={styles.reviewHeading}>{detail?.therapist?.name || ''}</Text>
                    <View style={styles.reviewRow}>
                        <MatComIcons name="map-marker-outline" size={WP(5.5)} color={COLORS.blackColor} />
                        <Text style={styles.reviewText} >  {detail?.booking_address || ''}</Text>
                    </View>
                    <View style={[styles.reviewRow, { borderBottomWidth: 0, paddingTop: 0, marginTop: 0 }]}>
                        <Feather name="clock" size={WP(5.5)} color={COLORS.blackColor} />
                        <Text style={styles.reviewText} >  {detail?.start_time + " - " + detail?.end_time}</Text>
                    </View>
                </View>
                <View style={styles.reviewImageContainer}>
                    <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: API_BASE_URL + detail?.therapist?.profile_image }} />
                </View>
            </View>

            <View style={styles.tabContainer}>
                <View style={styles.tabChipView}>
                    <Text style={[styles.tabBubbleText, { color: '#6DA544' }]} >{detail?.booking_status || ''}</Text>
                    <Text style={styles.tabText}>Booking</Text>
                </View>
                <View style={styles.tabChipView}>
                    <Text style={[styles.tabBubbleText, { backgroundColor: 'rgba(254, 168, 1, 0.3)', color: '#FEA801' }]} >{detail?.appointment_status || ""}</Text>
                    <Text style={styles.tabText}>Appointment Request</Text>
                </View>
                <View style={styles.tabChipView}>
                    <Text style={[styles.tabBubbleText, { backgroundColor: 'rgba(254, 168, 1, 0.3)', color: '#FEA801' }]} >{detail?.payment_status || ""}</Text>
                    <Text style={styles.tabText}>Payment</Text>
                </View>
            </View>

            {/* Service */}
            <View style={styles._boxContainer}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Service</Text>
                </View>
                {
                    detail?.appointment_details && detail.appointment_details?.map((item, index) => {
                        return (
                            <View key={index}>
                                <View style={[styles.row, { marginTop: WP(4) }]}>
                                    <Text style={styles.ValueText}>{item?.sub_service?.sub_service_name || ""}</Text>
                                    <Text style={[styles.ValueText]}>x{item?.quantity}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.infoText}>{currency} {item?.price}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={{ borderWidth: 1, borderColor: COLORS.grey, marginVertical: WP(3), }} />
                <View style={[styles.row, { marginTop: WP(1) }]}>
                    <Text style={styles.ValueText}>Subtotal</Text>
                    <Text style={[styles.ValueText]}>{currency} {detail?.sub_total || ''}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.infoText}>Booking fee</Text>
                    <Text style={[styles.infoText]}>{currency} {detail?.booking_fee || ''}</Text>
                </View>
                {
                    detail?.discount ?
                    <View style={[styles.row]}>
                    <Text style={[styles.infoText, { color: COLORS.greenColor }]}>Discount</Text>
                    <Text style={[styles.infoText, { color: COLORS.greenColor }]}>{currency} {detail?.discount || 0}</Text>
                </View>
                        : null
                }
                <View style={[styles.row, { marginTop: WP(1) }]}>
                    <Text style={styles.ValueText}>Total</Text>
                    <Text style={[styles.ValueText]}>{currency} {detail?.total || ''}</Text>
                </View>
            </View>

            {/* Special Instructions */}
            <View style={[styles._boxContainer, { marginTop: 0, borderBottomWidth: 0 }]}>
                <Text style={[styles.ValueText, { paddingBottom: WP(2) }]}>Special Instructions</Text>
                <Text style={styles.infoText} >{detail?.special_instruction || ''}</Text>
            </View>

        </ScrollView>
    )
}

export default BookingDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.offWhiteColor
    },
    ListContainer: {
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: WP(5),
        paddingVertical: WP(4),
        paddingBottom: WP(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewImageContainer: {
        width: WP(25),
        height: WP(25),
        borderRadius: WP(25),
        overflow: 'hidden',
        backgroundColor: 'cyan'
    },
    reviewHeading: {
        fontSize: FS(3),
        fontWeight: '700',
        color: COLORS.blackColor,
        fontFamily: FONT_BOLD,
    },
    reviewText: {
        fontSize: WP(3.7),
        paddingVertical: WP(1),
        color: COLORS.blackColor,
    },
    reviewInfoContainer: {
        width: '70%',
    },
    reviewRow: {
        flexDirection: 'row',
        marginVertical: WP(1),
        paddingVertical: WP(1),
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderBottomColor: COLORS.grey,
    },
    tabContainer: {
        width: '100%',
        paddingHorizontal: WP(8),
        backgroundColor: COLORS.whiteColor,
        paddingVertical: WP(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabChipView: {
        alignItems: 'center'
    },
    tabBubbleText: {
        backgroundColor: 'rgba(109, 165, 68,0.3)',
        paddingHorizontal: WP(4),
        paddingVertical: WP(1.5),
        borderRadius: WP(4),
        fontWeight: '700',
        overflow: 'hidden'
    },
    tabText: {
        paddingTop: WP(2),
        fontSize: WP(2.9)
    },

    _boxContainer: {
        margin: WP(5),
        backgroundColor: COLORS.offWhiteColor,
        marginBottom: WP(4),
        borderBottomWidth: 1, borderColor: COLORS.grey,
        // shadowColor: '#000',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 1,
        // elevation: 2,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: WP(5),
        fontWeight: '400',
        color: COLORS.blackColor,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: WP(1.5),
        justifyContent: 'space-between',
    },
    infoText: {
        fontSize: WP(4),
        color: COLORS.gary300,
    },
    ValueText: {
        fontSize: WP(4),
        color: COLORS.blackColor,
        fontWeight: '600',
    },
    paymentHeading: {
        paddingTop: WP(4),
        fontSize: WP(4.5),
        fontWeight: '400',
    },


})