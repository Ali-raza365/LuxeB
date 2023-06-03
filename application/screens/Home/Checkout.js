import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from '../../theme/config'
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PaymentCard from './components/PaymentCard';
import { Button } from '../../components';

const Checkout = ({navigation}) => {
    return (
        <View style={styles.container}>
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
                        <Text style={styles.ValueText}>Thu, 30 Mar 2023 </Text>
                        <Text style={[styles.ValueText, { width: '40%' }]}>2:00 PM</Text>
                    </View>


                    <View style={[styles.row, { marginTop: WP(2) }]}>
                        <Text style={styles.infoText}>Specialist</Text>
                        <Text style={[styles.infoText, { width: '40%' }]}>Duration</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.ValueText}>Suzie </Text>
                        <Text style={[styles.ValueText, { width: '40%' }]}>3 Hours 15 mins</Text>
                    </View>
                </View>

                {/* Service */}
                <View style={styles._boxContainer}>
                    <View style={styles.headerView}>
                        <Feather name="trending-up" size={WP(7.5)} color={COLORS.gary300} />
                        <Text style={styles.headerText}>Service</Text>
                    </View>
                    <View style={[styles.row, { marginTop: WP(4) }]}>
                        <Text style={styles.ValueText}>Acupuncture</Text>
                        <Text style={[styles.ValueText]}>x1</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoText}>$ 50</Text>
                    </View>
                    <View style={[styles.row, { marginTop: WP(1) }]}>
                        <Text style={styles.ValueText}>Chinese Anti-aging Facial</Text>
                        <Text style={[styles.ValueText]}>x2</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoText}>$ 100</Text>
                    </View>
                    <View style={[styles.row, { marginTop: WP(1) }]}>
                        <Text style={styles.ValueText}>Facial Acupuncture add-on </Text>
                        <Text style={[styles.ValueText,]}>x1</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoText}>$ 50</Text>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: COLORS.grey, marginVertical: WP(3), }} />

                    <View style={[styles.row, { marginTop: WP(1) }]}>
                        <Text style={styles.ValueText}>Subtotal</Text>
                        <Text style={[styles.ValueText]}>$ 200</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.infoText}>Booking fee</Text>
                        <Text style={[styles.infoText]}>$ 2.99</Text>
                    </View>
                    <View style={[styles.row, { marginTop: WP(1) }]}>
                        <Text style={styles.ValueText}>Total</Text>
                        <Text style={[styles.ValueText]}>$ 202.99</Text>
                    </View>
                </View>


                {/* Payment Methods */}
                <View style={styles._boxContainer}>
                    <View style={[styles.headerView, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="payments" size={WP(7.5)} color={COLORS.gary300} />
                            <Text style={styles.headerText}>Payment Methods</Text>
                        </View>
                        <MatComIcon name="pencil-outline" size={WP(7.5)} color={COLORS.gary300} />
                    </View>
                    <Text style={styles.paymentHeading}>Default Payment Methods</Text>
                    <PaymentCard />
                    <Text style={{ textAlign: 'center', fontSize: WP(4.5), marginVertical: WP(5) }} >or</Text>
                    <Button
                    onPress={()=>{navigation.push('addPaymentMethod')}}
                        title={'Add New Payment Method'}
                    />
                </View>

                {/* Booking Address */}
                <View style={styles._boxContainer}>
                    <Text style={styles.ValueText}>Booking Address</Text>
                    <View style={[styles.row, { marginVertical: WP(3) }]}>
                        <Text style={styles.infoText}>South Bank University SE1 </Text>
                        <MatComIcon name="pencil-outline" size={WP(7)} color={COLORS.gary300} />
                    </View>
                    <Text style={styles.ValueText}>Billing Address</Text>
                    <View style={[styles.row, { marginTop: WP(3) }]}>
                        <Text style={styles.infoText}>South Bank University SE1 </Text>
                        <MatComIcon name="pencil-outline" size={WP(7)} color={COLORS.gary300} />
                    </View>
                </View>

                {/* Booking Address */}
                <View style={styles._boxContainer}>
                    <Text style={styles.ValueText}>Special Instructions</Text>
                    <TextInput
                        style={{ height: HP(7), textAlign: 'left', marginTop: WP(3), borderBottomWidth: 1, fontSize: WP(4.5) }}
                        placeholder='Parking, address clarification, special requests for your booking, etc '
                        multiline
                    />
                </View>

                {/* Booking Address */}
                <View style={styles._boxContainer}>
                    <Text style={styles.ValueText}>Promotional or Giftcode</Text>
                    <TextInput
                        style={{ height: HP(5), textAlign: 'left', marginTop: WP(3), borderBottomWidth: 1, fontSize: WP(4.5) }}
                        placeholder='Enter Promotional or Gift code'
                    />

                    <Button
                        title={'Apply'}
                        buttonStyle={{ marginTop: WP(5), backgroundColor: 'transparent', borderWidth: 1, }}
                        textStyle={{ color: COLORS.borderColor, fontSize:WP(4) }}

                    />
                </View>

                <Button
                    title={'Book Now'}
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
        fontWeight: '500',
        letterSpacing: 1,
        paddingVertical: WP(4),
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