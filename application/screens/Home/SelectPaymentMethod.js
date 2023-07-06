import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../components';
import { COLORS, TEXT_SIZES, WP } from '../../theme/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PaymentCard from './components/PaymentCard';
import { useSelector } from 'react-redux';

const SelectPaymentMethod = () => {

    const userDetail = useSelector(store => store.user.userDetail);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ margin: WP(5), paddingBottom: WP(40) }}
            >
                <Text style={styles.headingSty}>Select Payment Methods</Text>
                <View>
                    <Text style={{ paddingBottom: WP(3) }}>Default Payment Method</Text>
                    {
                        userDetail?.payment_methods && userDetail?.payment_methods.map((item, index) => {
                            return (
                                // <PaymentCard />
                                <View/>
                            )
                        })
                    }
                    {/* <PaymentCard select={true} />
                    <PaymentCard />
                    <PaymentCard />
                    <PaymentCard /> */}
                </View>


            </KeyboardAwareScrollView >
            <Button
                buttonStyle={{ position: 'absolute', bottom: WP(6) }}
                title={'Set As Default Payment Method'}
            />
        </View >
    )
}

export default SelectPaymentMethod

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
    _inputSty: {
        width: '100%',
        padding: WP(3),
        paddingVertical: WP(4.5),
        // backgroundColor:'cyan',
        borderColor: COLORS.blackColor,
        borderWidth: 1,
        fontSize: WP(4)
    }


})