import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Loader } from '../../components';
import { COLORS, PLATFORM, TEXT_SIZES, WP } from '../../theme/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CardField, CardForm, useStripe, createToken, initStripe, StripeProvider } from '@stripe/stripe-react-native';
import actions from '../../store/actions';
import { getItem } from '../../utils/axios';

const AddPaymentMethod = ({ navigation }) => {

    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvcNumber, setCvcNumber] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cardDetail, setCardDetail] = useState(null);
    const [loading, setloading] = useState(false)

    const formatCreditCardNumber = (input) => {
        const cleanedInput = input.replace(/\s/g, '');
        let formattedInput = cleanedInput.replace(/(.{4})/g, '$1 ');
        if (formattedInput.length % 5 === 0) {
            formattedInput = formattedInput.trim();
        }
        setCardNumber(formattedInput);
    };

    const onExpDateChange = (input) => {
        // Remove any non-digit characters from the input
        const cleanedInput = input.replace(/\D/g, '');
        // Format the expiration date as MM/YY
        let formattedInput = cleanedInput;
        if (formattedInput.length > 2) {
            const month = formattedInput.substr(0, 2);
            const year = formattedInput.substr(2, 2);

            // Ensure the first two digits are less than 12
            if (parseInt(month) > 12) {
                formattedInput = '12' + formattedInput.substr(2);
            }
            formattedInput = formattedInput.replace(/^(\d{2})(.*)/, '$1/$2');
        }
        setExpDate(formattedInput);
    };




    const onCardFormChange = (obj) => {
        if (obj.complete) {
            setCardDetail(obj)
        } else {
            setCardDetail(null)
        }
    }

    const onSavePaymentMethod = async () => {
        try {
            setloading(true)
            const respToken = await createToken({ ...cardDetail, type: "Card" })
            if (respToken.token) {
                const customer_id = await getItem('user')
                let data = {
                    customer_id: customer_id?.id,
                    card_token: respToken?.token?.id,
                    last4: respToken?.token?.card?.last4,
                    brand: respToken?.token?.card?.brand,
                    expiration_month: respToken?.token?.card?.expMonth,
                    expiration_year: respToken?.token?.card?.expYear,
                }
                const res = await actions.onSavePaymentMethod(data)
                if (res) {
                    setloading(false)
                    Alert.alert("Payment method successfully added!");
                    navigation.goBack()
                }

            } else if (respToken.error) {
                setloading(false)
                Alert.alert(respToken?.error?.message || '')
            }
        } catch (error) {
            setloading(false)
            console.log(error, "error on adding payment method")
            Alert.alert(error.message)
        }
    }



    return (
        <StripeProvider
            publishableKey={'pk_test_51NJXbWFCp9JuJuBCBdu16IZOOtFmcRli49jp2dLRe9G22ZkqFQZgHGti156Y4zKCLsk0xyxuTFzpCivJcLqZzviP00zhO8GSYC'}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
            <View style={styles.container}>
                <Loader isVisible={loading} />
                {/* <KeyboardAwareScrollView
                    contentContainerStyle={{ margin: WP(5), paddingBottom: WP(40) }}
                >
                    <Text style={styles.headingSty}>Add New Payment {"\n"}Method</Text>
                    <View>
                        <Text style={{ paddingBottom: WP(3) }}>Card information</Text>
                        <TextInput
                            placeholder='Card Number'
                            placeholderTextColor={COLORS.darkGrey}
                            value={cardNumber}
                            onChangeText={(val) => formatCreditCardNumber(val)}
                            keyboardType='decimal-pad'
                            style={[styles._inputSty]}
                            maxLength={19}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder='MM/YY'
                                placeholderTextColor={COLORS.darkGrey}
                                value={expDate}
                                onChangeText={(val) => onExpDateChange(val)}
                                keyboardType='decimal-pad'
                                maxLength={5}
                                style={[styles._inputSty, { width: '48.5%', marginRight: WP(2) }]}
                            />
                            <TextInput
                                placeholder='CVC'
                                keyboardType='decimal-pad'
                                value={cvcNumber}
                                onChangeText={(val) => setCvcNumber(val)}
                                placeholderTextColor={COLORS.darkGrey}
                                maxLength={3}
                                style={[styles._inputSty, { width: '49%' }]}
                            />
                        </View>
                    </View>


                    <View style={{ marginTop: WP(8), marginBottom: WP(4) }}>
                        <Text style={{ paddingBottom: WP(3) }}>Country or Region</Text>
                        <TextInput
                            placeholder='United States'
                            placeholderTextColor={COLORS.darkGrey}
                            value={country}
                            onChangeText={(val) => setCountry(val)}
                            keyboardType='decimal-pad'
                            style={styles._inputSty}
                        />
                        <TextInput
                            placeholder='Zip Code'
                            placeholderTextColor={COLORS.darkGrey}
                            value={zipCode}
                            onChangeText={(val) => setZipCode(val)}
                            keyboardType='decimal-pad'
                            style={styles._inputSty}
                        />
                    </View>
                    <BouncyCheckbox
                        useNativeDriver={false}
                        size={WP(8)}
                        // style={{ marginVertical: WP(3) }}
                        iconStyle={{ borderColor: COLORS.greenColor, borderRadius: 0, }}
                        fillColor={COLORS.borderColor}
                        innerIconStyle={{ borderWidth: 2, borderRadius: 0, }}
                        unfillColor="#FFFFFF"
                        // disableBuiltInState={true}
                        // isChecked={agreePrivacy}
                        // onPress={() => { setagreePrivacy(!agreePrivacy) }}
                        text={"Save this card for future payments"}
                        textStyle={{ textDecorationLine: 'none', color: COLORS.blackColor, fontSize: WP(TEXT_SIZES.info_1) }}
                    />
                </KeyboardAwareScrollView > */}

                <View style={{ padding: WP(5) }}>
                    <CardForm
                        onFormComplete={(cardDetails) => {
                            onCardFormChange(cardDetails)
                            console.log('card details', cardDetails);
                            //  setCard(cardDetails);
                        }}
                        style={{ height: PLATFORM === 'android' ? 300 : 200, }}
                    />
                </View>

                <Button
                    disable={!cardDetail}
                    onPress={onSavePaymentMethod}
                    buttonStyle={{ position: 'absolute', bottom: WP(6) }}
                    title={'Save Payment Method'}
                />
            </View >
        </StripeProvider>
    )
}

export default AddPaymentMethod

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
        marginBottom: WP(2),
        borderColor: COLORS.blackColor,
        borderWidth: 1,
        fontSize: WP(4)
    }


})