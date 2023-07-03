import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import { useSelector } from 'react-redux';
import { AppBar, Button } from '../../components';
import actions from '../../store/actions';
import { COLORS, FS, HP, WP } from '../../theme/config';

export default function LoginOtp({ navigation }) {

    const {  phoneNumber } = useSelector(store => store.user)
    const [otpCode, setOtpCode] = useState('');
    let otpInput = useRef(null);
    const onPress = async () => {
        if (otpCode == '')
            Alert.alert('OTP Code is Required')
        else if (otpCode.length != 4)
            Alert.alert('OTP Code is inVaild')
        else {
            console.log({phoneNumber})
            let detail = {
                phone: phoneNumber,
                otp: otpCode
            }
            await actions.OnVerifyLoginOtp(detail, navigation)
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={{ height:'88%'}}>
                        <AppBar type={'dark'} backgroundColor={COLORS.offWhiteColor} />
                        <View style={styles.mainStyle}>
                            <View style={styles.innerContainer}>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}>Verify</Text>
                                    <Text style={styles.desc}>
                                        Enter the 4 digital verification OTP code send to your phone
                                    </Text>
                                </View>

                                <View>
                                    <OTPTextView
                                        ref={e => (otpInput = e)}
                                        handleTextChange={e => { setOtpCode(e) }}
                                        containerStyle={styles.textInputContainer}
                                        textInputStyle={styles.roundedTextInput}
                                        tintColor={COLORS.blackColor}
                                        // offTintColor={COLORS.}
                                        inputCount={4}
                                    />
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: COLORS.blackColor }}>Don’t receive the OTP? </Text>
                                        <Text style={{ fontWeight: '500', color: COLORS.blackColor, textDecorationLine: 'underline' }}>Resend OTP</Text>
                                    </View>

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
        backgroundColor: "#f5f5f5",
    },
    mainStyle: {
        width: WP(100),
    },
    innerContainer: {
        display: 'flex',
        width: WP(100),
        height: '100%',
        flexDirection: 'column',
        // justifyContent: 'space-between',
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
        paddingTop: HP(3),
        fontSize: FS(2.2),
        fontWeight: '500',
        width: WP(75),
        alignSelf: "center",
        color: COLORS.blackColor,
        textAlign: 'center',
    },
    buttonStyle: {
        bottom: HP(4),
    },

    textInputContainer: {
        marginBottom: WP(2),
        paddingHorizontal: WP(10),
    },
    roundedTextInput: {
        width: WP(18),
        height: WP(18),
        borderRadius: 5,
        borderWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: COLORS.whiteColor
    },
});
