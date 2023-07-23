import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button } from '../../components';
import { _gotoAskForLocation, _gotoBottomTabs } from '../../navigation/navigationServcies';
import { COLORS, FS, HP, SPACING_PERCENT, WP } from '../../theme/config';
import OTPTextView from 'react-native-otp-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux';
import actions from '../../store/actions';

export default function VerifyOtp({ navigation }) {

    const [otpCode, setOtpCode] = useState('');
    let otpInput = useRef(null);
    const { signup_name, signup_phone } = useSelector(store => store.user)
    const [loading, setloading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [enableRendOtp, setEnableResndOtp] = useState(false)


    const onPress = async () => {
        if (otpCode == '')
            Alert.alert('OTP Code is Required')
        else if (otpCode.length != 4)
            Alert.alert('OTP Code is inVaild')
        else {
            let detail = {
                phone: signup_phone,
                name: signup_name,
                otp: otpCode
            }
            await actions.OnVerifySignUpOtp(detail, navigation)
        }
    };



    const onResndOTP = async () => {
        try {
            let detail = {
                phone: signup_phone,
                name: signup_name,
            }
                const res = await actions.OnSignUpUser(detail)
                if (res) {
                    setTimer(60)
                    setEnableResndOtp(false)
                } else if (res) {
            }
        } catch (error) {
            // Alert.alert(error.message)
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedTime;
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            setEnableResndOtp(true)
        }
    }, [timer]);




    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={{ height: '88%' }}>
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
                                    {enableRendOtp ? null : <Text style={styles.timerSty} >{formatTime(timer)}</Text>}
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: COLORS.blackColor }}>Don’t receive the OTP? </Text>
                                        <Text
                                        onPress={()=>{enableRendOtp ? onResndOTP() : null}}
                                        style={{ fontWeight: '500', color: enableRendOtp ? COLORS.blackColor : COLORS.lightGrey, textDecorationLine: 'underline' }}>Resend OTP</Text>
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
    timerSty: {
        textAlign: 'center',
        paddingVertical: WP(SPACING_PERCENT / 2),
        fontSize: FS(2.2),
        fontWeight: '500',
        color: COLORS.darkGrey,
    }
});
