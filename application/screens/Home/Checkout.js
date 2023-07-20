import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT_BOLD, HP, WP } from '../../theme/config'
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PaymentCard from './components/PaymentCard';
import { AppBar, Button, Loader } from '../../components';
import { useSelector } from 'react-redux';
import { HoursMinsStriing, _formatDate, _formatDateMonth } from '../../utils/TimeFunctions';
import actions from '../../store/actions';
import SuccessModal from './components/SuccessModal';

const Checkout = ({ navigation }) => {

    const speciallistDetail = useSelector(state => state.service.speciallistDetail);
    const userDetail = useSelector(store => store.user.userDetail);
    const currency = useSelector(state => state.user.currency);

    const [serviceArr, setServiceArr] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [bookingFee, setBookingFee] = useState(2.99);
    const [PaymentMethod, setPaymentMethod] = useState({});
    const [bookingAddress, setBookingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [duration, setduration] = useState(0);
    const [specialInstruction, setSpecialInstruction] = useState('')
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherAmt, setVoucherAmt] = useState(null);
    const [loading, setloading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false)



    useEffect(() => {
        let services = [],
            sub_total = 0;
        let total_duration = 0;
        speciallistDetail.services.map((service) => {
            service.sub_services.map(subService => {
                if (subService?.isSelected) {
                    services.push(subService)
                    sub_total = sub_total + (Number(subService?.price || 0) * Number(subService?.quantity || 1))
                    total_duration = total_duration + (Number(subService?.duration || 0) * Number(subService?.quantity || 1))
                }
            })
        })
        setduration(total_duration)
        setServiceArr(services)
        setSubTotal(sub_total)
        console.log({ services })
    }, [speciallistDetail])

    useEffect(() => {
        let Method = userDetail?.payment_methods.find((item) => item?.is_default)
        let booking_Address = userDetail?.locations.find((item) => item?.is_booking)
        let billing_ddress = userDetail?.locations.find((item) => item?.is_billing)
        setBillingAddress(billing_ddress)
        setBookingAddress(booking_Address)
        setPaymentMethod(Method)
    }, [userDetail])

    // console.log(speciallistDetail?.bookingDate)

    const onBookAppointment = async () => {
        try {
            setloading(true)
            const customer_id = userDetail?.id;
            const total = ((subTotal + bookingFee) - (voucherAmt || 0)).toFixed(2)
            let detail = {
                "date": _formatDate(speciallistDetail?.bookingDate),
                "start_time": speciallistDetail?.bookingTimeStart,
                "end_time": speciallistDetail?.bookingTimeEnd,
                "therapist": speciallistDetail?.id,
                "duration": duration,
                "sub_total": subTotal,
                "booking_fee": bookingFee,
                "total": total,
                "customer": customer_id,
                "booking_address": bookingAddress?.id,
                "billing_address": billingAddress?.id,
                "special_instruction": specialInstruction,
                "payment_method": PaymentMethod?.id,
                "appointment_details": [...serviceArr.map((item) => {
                    return {
                        "price": item?.price,
                        "sub_service": item?.sub_service?.id,
                        "quantity": item?.quantity
                    }
                })
                ]
            }
            const res = await actions.onbookAppointment(detail)
            if (res?.message) {
                Alert.alert(res?.message)
            } else if (res) {
                setShowSuccessModal(true)
            }
            setloading(false)
            console.log(detail,"Book appointment Details")
        } catch (error) {
            setloading(false)
            Alert.alert(error?.message)
        }
    }

    const onApplyVoucher = async () => {
        try {
            if (voucherCode != '') {
                setloading(true)
                const customer_id = userDetail?.id
                const total = subTotal + bookingFee
                const detail = { customer_id: customer_id, voucher_code: voucherCode, total_amount: total }
                const res = await actions.onApplyVoucher(detail)
                if (res?.message) {
                    Alert.alert(res?.message)
                } else if (res) {
                    if (res?.discount_type == 'percentage') {
                        const percentageAmt = ((parseFloat(res?.discount_value) || 0) / total) * 100;
                        setVoucherAmt(parseFloat(percentageAmt).toFixed(2) || 0)
                    } else {
                        setVoucherAmt(parseFloat(res?.discount_value).toFixed(2) || 0)
                    }
                }
                setloading(false)
            }
        } catch (error) {
            Alert.alert(error?.message)
            setloading(false)
        }

    }


    return (
        <View style={styles.container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />
            <Loader isVisible={loading} />
            <SuccessModal
                isVisible={showSuccessModal}
                onClose={() => {}} 
                />
            <ScrollView
                contentContainerStyle={{ margin: WP(5), paddingBottom: WP(40) }}
            >
                <Text style={styles.headingSty}>Your Booking</Text>
                {/* Appointment details */}
                <View style={styles._boxContainer}>
                    <View style={styles.headerView}>
                        <Feather name="calendar" size={WP(7.5)} color={COLORS.gary300} />
                        <Text style={styles.headerText}>Appointment Details</Text>
                    </View>
                    <View style={[styles.row, { marginTop: WP(4) }]}>
                        <Text style={styles.infoText}>Data</Text>
                        <Text style={[styles.infoText, { width: '40%' }]}>Start Time</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.ValueText}>{_formatDateMonth(speciallistDetail?.bookingDate)} </Text>
                        <Text style={[styles.ValueText, { width: '40%' }]}>{speciallistDetail?.bookingTimeStart || ''} PM</Text>
                    </View>


                    <View style={[styles.row, { marginTop: WP(2) }]}>
                        <Text style={styles.infoText}>Specialist</Text>
                        <Text style={[styles.infoText, { width: '40%' }]}>Duration</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.ValueText}>{speciallistDetail?.name || ''} </Text>
                        <Text style={[styles.ValueText, { width: '40%' }]}>{HoursMinsStriing(duration || 0)}</Text>
                    </View>
                </View>

                {/* Service */}
                <View style={styles._boxContainer}>
                    <View style={styles.headerView}>
                        <Feather name="trending-up" size={WP(7.5)} color={COLORS.gary300} />
                        <Text style={styles.headerText}>Service</Text>
                    </View>
                    {
                        serviceArr && serviceArr?.map((item, index) => {
                            return (
                                <View key={index}>
                                    <View style={[styles.row, { marginTop: WP(1) }]}>
                                        <Text style={styles.ValueText}>{item?.sub_service?.sub_service_name || ''}</Text>
                                        <Text style={[styles.ValueText]}>x{item?.quantity || '1'}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.infoText}>{currency} {Number(item?.price || 0) * Number(item?.quantity || 1)}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <View style={{ borderWidth: 1, borderColor: COLORS.grey, marginVertical: WP(3), }} />

                    <View style={[styles.row, { marginTop: WP(1) }]}>
                        <Text style={styles.ValueText}>Subtotal</Text>
                        <Text style={[styles.ValueText]}>{currency} {subTotal || 0}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.infoText}>Booking fee</Text>
                        <Text style={[styles.infoText]}>{currency} {bookingFee || 0}</Text>
                    </View>
                    {voucherAmt ?
                        <View style={[styles.row]}>
                            <Text style={[styles.infoText, { color: COLORS.greenColor }]}>Discount</Text>
                            <Text style={[styles.infoText, { color: COLORS.greenColor }]}>{currency} {voucherAmt || 0}</Text>
                        </View>
                        : null
                    }
                    <View style={[styles.row, { marginTop: WP(1) }]}>
                        <Text style={styles.ValueText}>Total</Text>
                        <Text style={[styles.ValueText]}>{currency} {((subTotal + bookingFee) - (voucherAmt || 0)).toFixed(2)}</Text>
                    </View>
                </View>


                {/* Payment Methods */}
                <View style={styles._boxContainer}>
                    <View style={[styles.headerView, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="payments" size={WP(7.5)} color={COLORS.gary300} />
                            <Text style={styles.headerText}>Payment Methods</Text>
                        </View>
                        <MatComIcon onPress={() => navigation.navigate("selectpaymentmethod")} name="pencil-outline" size={WP(7.5)} color={COLORS.gary300} />
                    </View>
                    <Text style={styles.paymentHeading}>Default Payment Methods</Text>
                    <PaymentCard
                        selected={PaymentMethod}
                        item={PaymentMethod}
                    />
                    <Text style={{ textAlign: 'center', fontSize: WP(4.5), marginVertical: WP(5) }} >or</Text>
                    <Button
                        onPress={() => { navigation.push('addPaymentMethod') }}
                        title={'Add New Payment Method'}
                    />
                </View>

                {/* Booking Address */}
                <View style={styles._boxContainer}>
                    <Text style={styles.ValueText}>Booking Address</Text>
                    <View style={[styles.row, { marginVertical: WP(3) }]}>
                        <Text style={styles.infoText}>{bookingAddress?.address || ""}</Text>
                        <MatComIcon onPress={() => navigation.navigate('addresses')} name="pencil-outline" size={WP(7)} color={COLORS.gary300} />
                    </View>
                    <Text style={styles.ValueText}>Billing Address</Text>
                    <View style={[styles.row, { marginTop: WP(3) }]}>
                        <Text style={styles.infoText}>{billingAddress?.address || ''}</Text>
                        <MatComIcon onPress={() => navigation.navigate('addresses')} name="pencil-outline" size={WP(7)} color={COLORS.gary300} />
                    </View>
                </View>

                {/* Booking Address */}
                <View style={styles._boxContainer}>
                    <Text style={styles.ValueText}>Special Instructions</Text>
                    <TextInput
                        style={{ textAlign: 'left', marginTop: WP(3), borderBottomWidth: 1, fontSize: WP(4.5) }}
                        placeholder='Parking, address clarification, special requests for your booking, etc '
                        multiline
                        onChangeText={(val) => setSpecialInstruction(val)}
                        value={specialInstruction}

                    />
                </View>

                {/* Booking Address */}
                <View style={styles._boxContainer}>
                    <Text style={styles.ValueText}>Promotional or Giftcode</Text>
                    <TextInput
                        style={{ height: HP(5), textAlign: 'left', marginTop: WP(3), borderBottomWidth: 1, fontSize: WP(4.5) }}
                        placeholder='Enter Promotional or Gift code'
                        onChangeText={(val) => setVoucherCode(val)}
                        value={voucherCode}
                        editable={!voucherAmt}

                    />

                    <Button
                        title={'Apply'}
                        disable={voucherAmt}
                        onPress={onApplyVoucher}
                        buttonStyle={{ marginTop: WP(5), }}
                        textStyle={{ color: COLORS.whiteColor, fontSize: WP(4) }}

                    />
                </View>

                <Button
                    title={'Book Now'}
                    onPress={onBookAppointment}
                />

            </ScrollView >
        </View >
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headingSty: {
        fontSize: WP(6.5),
        fontWeight: '700',
        letterSpacing: 1,
        paddingVertical: WP(4),
        fontFamily: FONT_BOLD,
        color: COLORS.blackColor,
    },
    _boxContainer: {
        padding: WP(5),
        backgroundColor: COLORS.whiteColor,
        marginBottom: WP(4),
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
        paddingLeft: WP(3),
    },
    row: {
        flexDirection: 'row',
        paddingVertical: WP(1.5),
        justifyContent: 'space-between',
    },
    infoText: {
        // width: '60%',
        fontSize: WP(4),
        color: COLORS.gary300,
        // backgroundColor: 'red'
    },
    ValueText: {
        // width: '60%',
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