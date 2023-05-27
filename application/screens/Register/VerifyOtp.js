import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button } from '../../components';
import { _gotoBottomTabs } from '../../navigation/navigationServcies';
import { COLORS, FS, HP, WP } from '../../theme/config';
import OTPTextView from 'react-native-otp-textinput';

export default function VerifyOtp({ navigation }) {

    const [selectType, setselectType] = useState('Client');
    const [otpCode, setOtpCode] = useState('');
    let otpInput = useRef(null);
    const onPress = () => {
        _gotoBottomTabs(navigation);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <View style={styles.container}>
                <AppBar type={'dark'} backgroundColor={COLORS.primaryColor} />
                <View style={styles.backgroundImage}>
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
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <Text style={{ color:COLORS.blackColor}}>Don’t receive the OTP? </Text>
                                <Text style={{fontWeight:'500',color:COLORS.blackColor, textDecorationLine:'underline'}}>Resend OTP</Text>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
    backgroundImage: {
        display: 'flex',
        width: WP(100),
        flex: 1,
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
        paddingTop: HP(6),
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
        // lineHeight: 20,
        color: COLORS.blackColor,
        textAlign: 'center',
        // backgroundColor:'cyan'
    },
    buttonStyle: {
        bottom: HP(4),
        position: 'absolute',
    },

    textInputContainer: {
        marginBottom:WP(2),
        paddingHorizontal: WP(10),
    },
    roundedTextInput: {
        width: WP(18),
        height: WP(18),
        borderRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: COLORS.whiteColor
    },
});