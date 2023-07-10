import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button, LabelInput } from '../../components';
import { _gotoBottomTabs } from '../../navigation/navigationServcies';
import { COLORS, FONT_BOLD, FS, HP, WP } from '../../theme/config';
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import actions from '../../store/actions';
import { isValidPhone } from '../../utils/Validation';

export default function PhoneNumber({ navigation }) {

    const [loading, setloading] = useState(false)
    const [phoneValue, setphoneValue] = useState('');
    const [Name, setName] = useState('')

    const phoneInput = useRef();

    const onPress = async () => {
        try {
            if (Name == '')
                Alert.alert("Name is Required")
            else if (phoneValue == '')
                Alert.alert("Phone Number is Required")
            // else if (!isValidPhone(phoneValue))
            //     Alert.alert("Phone Number is not Vaild")
            else {
                setloading(true)
                let detail = {
                    phone: phoneValue,
                    name: Name
                }
                await actions.OnSignUpUser(detail, navigation).then(() => {
                    setloading(false)
                })
                    .catch(() => {
                        setloading(false)
                    })
            }
        } catch (error) {
            setloading(false)

        }
        // _gotoBottomTabs(navigation);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <KeyboardAwareScrollView>
                <AppBar type={'dark'} backgroundColor={COLORS.offWhiteColor} />

                <View style={styles.container}>
                    <View style={{ height: '88%', }}>
                        <View style={styles.mainStyle}>
                            <View style={styles.innerContainer}>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}>What’s your phone number?</Text>
                                    <Text style={styles.desc}>
                                        Create An account and start browsing
                                    </Text>
                                </View>
                                <View>

                                    <LabelInput
                                        label={'Name'}
                                        value={Name}
                                        onChangeText={(val) => setName(val)}
                                        placeholder={'Enter your name'}
                                        containerStyle={{ marginBottom: WP(4) }}
                                    />

                                    <PhoneInput
                                        ref={phoneInput}
                                        defaultValue={phoneValue}
                                        textInputProps={{
                                            placeholderTextColor: COLORS.darkGrey
                                        }}
                                        placeholderTextColor={COLORS.darkGrey}
                                        placeholder='Enter phone number'
                                        // countryPickerProps={{ disableNativeModal: true }}
                                        defaultCode="TH"
                                        layout="second"
                                        onChangeFormattedText={(text) => {
                                            setphoneValue(text);
                                        }}
                                        // onChangeFormattedText={}
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
                                <Text style={styles.textInfo}>Already have an account?  <Text style={{ fontWeight: '600', textDecorationLine: 'underline' }} onPress={() => { navigation.navigate('loginphonenumber') }} >Login</Text></Text>
                            </View>


                            <Button
                                title="Continue"
                                onPress={onPress}
                                disable={loading}
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
        fontWeight: '700',
        textAlign: "center",
        color: COLORS.blackColor,
        fontSize: FS(3.5),
        fontFamily:FONT_BOLD,
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
    textInfo: {
        position: 'absolute',
        bottom: HP(8),
        fontSize: FS(1.8),
        textAlign: 'center',
        color: COLORS.blackColor

    }

});
