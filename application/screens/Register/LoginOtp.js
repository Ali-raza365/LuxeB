import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import { useSelector } from 'react-redux';
import { AppBar, Button } from '../../components';
import actions from '../../store/actions';
import { COLORS, FONT_BOLD, FS, HP, SPACING_PERCENT, WP } from '../../theme/config';
import { GetFCMToken } from '../../utils/GetFCMToken';
import Clipboard from '@react-native-clipboard/clipboard';

export default function LoginOtp({ navigation }) {

    const { phoneNumber } = useSelector(store => store.user)
    const [otpCode, setOtpCode] = useState('');
    const [loading, setloading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [enableRendOtp, setEnableResndOtp] = useState(false)


    let otpInput = useRef(null);
    const onPress = async () => {
        try {
            if (otpCode == '')
                Alert.alert('OTP Code is Required')
            else if (otpCode.length != 4)
                Alert.alert('OTP Code is inVaild')
            else {
                console.log({ phoneNumber })
                let fcmDetails = await GetFCMToken()
                let detail = {
                    phone: phoneNumber,
                    otp: otpCode,
                    device_id: fcmDetails?.deviceId,
                    device_name: fcmDetails?.deviceName,
                    device_fcm_token: fcmDetails?.fcmToken,
                    os_type: fcmDetails?.osType
                }
                setloading(true)
                await actions.OnVerifyLoginOtp(detail, navigation)
                setloading(false)
            }
        } catch (error) {
            setloading(false)
            const handleCopy = () => {
                Clipboard.setString(error?.message);
            };

            Alert.alert("Error", error?.message, [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Copy',
                    onPress: handleCopy,
                },
            ]);
        }
    };


    const onResndOTP = async () => {
        try {
                let detail = { phone: phoneNumber, }
                const res = await actions.OnLoginUser(detail)
                if (res?.message) {
                    Alert.alert(res?.message)
                    setTimer(60)
                    setEnableResndOtp(false)
                } else if (res) {
            }
        } catch (error) {
            Alert.alert(error.message)
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
                                disable={loading}
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
        fontWeight: '700',
        textAlign: "center",
        color: COLORS.blackColor,
        fontSize: FS(3.5),
        fontFamily: FONT_BOLD,
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
