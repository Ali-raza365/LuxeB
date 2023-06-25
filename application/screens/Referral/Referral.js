import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FS, WP } from '../../theme/config'
import { AppBar, Button } from '../../components'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Referral = () => {
    return (
        <View style={styles.container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />
            <Text style={styles.heading}>Become a{'\n'} LuxeBeauty Ambassador {'\n'}and be rewarded with free{'\n'} treatment credit!</Text>
            <Text style={styles.infoText}>Below is your unique Ambassador Code which gives your friends $15 off their first treatment! {'\n'} {'\n'}For every friend you refer who books using your unique, you’ll receive $15 LuxeBeauty Credit. It’s a win win!</Text>
            <Text style={styles.codeText}>Maria1392</Text>
            <Button title={'Copy Code'} buttonStyle={{ padding: WP(4) }} />
            <View style={styles.shareContainer}>
                <Text style={styles.shareText}>Share my code</Text>
                <View style={styles.row} >
                    <Fontisto onPress={() => {}} name="facebook" size={FS(2.5)} color={COLORS.blackColor} />
                    <Fontisto onPress={() => {}} name="twitter" size={FS(2.5)} color={COLORS.blackColor} />
                    <Fontisto onPress={() => {}} name="google-plus" size={FS(3)} color={COLORS.blackColor} />
                    <Fontisto onPress={() => {}} name="whatsapp" size={FS(2.5)} color={COLORS.blackColor} />
                    <Ionicons onPress={() => {}} name="md-add" size={FS(2.5)} color={COLORS.blackColor} />
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
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 25,
        color: COLORS.blackColor
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
        padding:WP(5),
        paddingHorizontal:WP(7),
        alignItems:'center',
    }

})