import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { COLORS, FONT_BOLD, FS, WP } from '../../theme/config'
import { AppBar, Button } from '../../components'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

const Referral = () => {

    const userDetail = useSelector(store => store.user.userDetail || '');
    const [referralCode, setReferralCode] = useState(userDetail?.referral_code)




    const CopyReferralCode = () => {
        try {
            Clipboard.setString(referralCode || '');
        } catch (error) {
            console.log(error)
        }
    };

    const shareToFacebook = async () => {
        const shareOptions = {
            social: Share.Social.FACEBOOK,
            message: referralCode,
        };
        try {
            const ShareResponse = await Share.shareSingle(shareOptions);
            console.log(ShareResponse);
        } catch (error) {
            console.log("Error =>", error);
        }
    };

    const shareToWhatsApp = async () => {
        const shareOptions = {
            title: 'Referral Code',
            message: referralCode,
            social: Share.Social.WHATSAPP,
        };
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(ShareResponse);
        } catch (error) {
            console.log("Error =>", error);
        }
    };


    return (
        <View style={styles.container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />
            <Text style={styles.heading}>Become a{'\n'} LuxeBeauty Ambassador {'\n'}and be rewarded with free{'\n'} treatment credit!</Text>
            <Text style={styles.infoText}>Below is your unique Ambassador Code which gives your friends $15 off their first treatment! {'\n'} {'\n'}For every friend you refer who books using your unique, you’ll receive $15 LuxeBeauty Credit. It’s a win win!</Text>
            <Text style={styles.codeText}>{referralCode}</Text>
            <Button
                onPress={CopyReferralCode}
                title={'Copy Code'} buttonStyle={{ padding: WP(4) }} />
            <View style={styles.shareContainer}>
                <Text style={styles.shareText}>Share my code</Text>
                <View style={styles.row} >
                    <Fontisto onPress={() => { shareToFacebook() }} name="facebook" style={{ padding: 10, }} size={FS(2.5)} color={COLORS.blackColor} />
                    <Fontisto onPress={shareToWhatsApp} name="twitter" size={FS(2.5)} style={{ padding: 10, }} color={COLORS.blackColor} />
                    <Fontisto onPress={shareToWhatsApp} name="google-plus" size={FS(3)} style={{ padding: 10, }} color={COLORS.blackColor} />
                    <Fontisto onPress={shareToWhatsApp} name="whatsapp" size={FS(2.5)} style={{ padding: 10, }} color={COLORS.blackColor} />
                    <Ionicons onPress={shareToWhatsApp} name="md-add" size={FS(2.5)} style={{ padding: 10, }} color={COLORS.blackColor} />
                </View>
            </View>
        </View>
    )
}

export default Referral

// const styles = StyleSheet.create({})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: WP(5),
    },
    heading: {
        fontSize: WP(5.5),
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 25,
        color: COLORS.blackColor,
        fontFamily: FONT_BOLD,
    },
    infoText: {
        paddingVertical: 45,
        fontSize: WP(3.8),
        letterSpacing: 0.8,
        lineHeight: 25,
        textAlign: 'center',
        color: COLORS.blackColor
    },
    codeText: {
        fontSize: WP(5.5),
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 22,
        color: COLORS.blackColor,
        paddingBottom: 25,
    },
    shareContainer: {
        paddingTop: WP(10),
    },
    shareText: {
        fontSize: WP(4),
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: WP(5),
        paddingHorizontal: WP(5),
        alignItems: 'center',
    }

})