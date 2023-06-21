import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button } from '../../components';
import { _gotoBottomTabs } from '../../navigation/navigationServcies';
import { COLORS, FS, HP, WP } from '../../theme/config';
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PhoneNumber({ navigation }) {

    const [selectType, setselectType] = useState('Client')
    const [phoneValue, setphoneValue] = useState('');
    const phoneInput = useRef();

    const onPress = () => {
        navigation.navigate('verifyotp')
        // _gotoBottomTabs(navigation);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <KeyboardAwareScrollView>
                <AppBar type={'dark'} backgroundColor={COLORS.offWhiteColor} />

                <View style={styles.container}>
                    <View style={{ height:'88%' ,}}>
                        <View style={styles.mainStyle}>
                            <View style={styles.innerContainer}>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}>What’s your phone number?</Text>
                                    <Text style={styles.desc}>
                                        Create An account and start browsing
                                    </Text>
                                </View>
                                <View>
                                    <PhoneInput
                                        ref={phoneInput}
                                        defaultValue={phoneValue}
                                        textInputProps={{
                                            placeholderTextColor: COLORS.darkGrey
                                        }}
                                        placeholderTextColor={COLORS.darkGrey}
                                        placeholder='Enter phone number'
                                        countryPickerProps={{disableNativeModal: true}}
                                        defaultCode="TH"
                                        layout="second"
                                        onChangeText={(text) => {
                                            setphoneValue(text);
                                        }}
                                        flagButtonStyle={{
                                            borderRightWidth: 1,
                                            borderColor: COLORS.blackColor
                                        }}
                                        containerStyle={{
                                            borderWidth: 1,
                                            borderColor: COLORS.blackColor,
                                        }}
                                        textInputStyle={{
                                            padding: 0,
                                        }}
                                        withDarkTheme
                                    />
                                </View>



                            </View>
                            <Button
                                title="Continue"
                                onPress={onPress}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HP(100),
        backgroundColor: "#f5f5f5"
    },
    mainStyle: {
        display: 'flex',
        width: WP(100),
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
    },
    heading: {
        fontWeight: '600',
        textAlign: "center",
        color: COLORS.blackColor,
        fontSize: FS(3.5),
    },
    desc: {
        paddingTop: HP(1),
        fontSize: FS(2.2),
        fontWeight: '500',
        width: WP(55),
        alignSelf: "center",
        lineHeight: 20,
        color: COLORS.blackColor,
        textAlign: 'center',
    },
    buttonStyle: {
        bottom: HP(4),
    },

});
