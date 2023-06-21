import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../components';
import { COLORS, TEXT_SIZES, WP } from '../../theme/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const AddPaymentMethod = () => {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ margin: WP(5), paddingBottom: WP(40) }}
            >
                <Text style={styles.headingSty}>Add New Payment {"\n"}Method</Text>

                <View>
                    <Text style={{ paddingBottom: WP(3) }}>Card information</Text>
                    <TextInput
                        placeholder='Card Number'
                        placeholderTextColor={COLORS.darkGrey}
                        keyboardType='decimal-pad'
                        style={[styles._inputSty]}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            placeholder='MM/YY'
                            placeholderTextColor={COLORS.darkGrey}
                            keyboardType='decimal-pad'
                            style={[styles._inputSty, { width: '48.5%', marginRight:WP(2) }]}
                        />
                        <TextInput
                            placeholder='CVC'
                            keyboardType='decimal-pad'
                            placeholderTextColor={COLORS.darkGrey}
                            style={[styles._inputSty, { width: '49%' }]}
                        />
                    </View>
                </View>


                <View style={{ marginTop: WP(8), marginBottom: WP(4) }}>
                    <Text style={{ paddingBottom: WP(3) }}>Country or Region</Text>
                    <TextInput
                        placeholder='United States'
                        placeholderTextColor={COLORS.darkGrey}
                        keyboardType='decimal-pad'
                        style={styles._inputSty}
                    />
                    <TextInput
                        placeholder='Zip Code'
                        placeholderTextColor={COLORS.darkGrey}
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
                    textStyle={{  textDecorationLine: 'none', color: COLORS.blackColor, fontSize: WP(TEXT_SIZES.info_1) }}
                />
            </KeyboardAwareScrollView >
            <Button
                buttonStyle={{ position: 'absolute', bottom: WP(6) }}
                title={'Save Payment Method'}
            />
        </View >
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
        marginBottom:WP(2),
        borderColor: COLORS.blackColor,
        borderWidth: 1,
        fontSize: WP(4)
    }


})