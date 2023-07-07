import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppBar, Button, Loader } from '../../components';
import { COLORS, WP } from '../../theme/config';
import PaymentCard from '../Home/components/PaymentCard';
import { useSelector } from 'react-redux';
import actions from '../../store/actions';

const PaymentMethods = () => {

    const userDetail = useSelector(store => store.user.userDetail);
    const [selected, setSelected] = useState(null);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        let Method = userDetail?.payment_methods.find((item) => item?.is_default)
        setSelected(Method)
    }, [userDetail])


    const setDefaultPaymentMethod = async () => {
        try {
            setloading(true)
            const data = {
                customer_id: userDetail?.id,
                payment_method_id: selected?.payment_method_id,
            }
            await actions.onSetDefaultPaymentMethod(data)
            setloading(false)
        } catch (error) {
            setloading(false)
            Alert.alert(error.message)
        }

    }


    return (
        <View style={styles.container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />
            <Loader isVisible={loading} />
            <KeyboardAwareScrollView
                contentContainerStyle={{ margin: WP(5), paddingBottom: WP(40) }}
            >
                <Text style={styles.headingSty}>Select Payment Methods</Text>
                <View>
                    <Text style={{ paddingBottom: WP(3) }}>Default Payment Method</Text>
                    {
                        userDetail?.payment_methods && userDetail?.payment_methods.map((item, index) => {
                            return (
                                <PaymentCard
                                    key={index}
                                    onPress={(val) => setSelected(val)}
                                    selected={selected}
                                    item={item}
                                />
                            )
                        })
                    }
                </View>


            </KeyboardAwareScrollView >
            <Button
                onPress={setDefaultPaymentMethod}
                buttonStyle={{ position: 'absolute', bottom: WP(6) }}
                title={'Set As Default Payment Method'}
            />
        </View >
    )
}

export default PaymentMethods

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