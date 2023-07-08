import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { _gotoVoucherTabs } from '../../navigation/navigationServcies';
import { COLORS, WP } from '../../theme/config';
import actions from '../../store/actions';
import { AppBar } from '../../components';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../api/apis';

const Profile = ({ navigation }) => {

    const userDetail = useSelector(store => store.user.userDetail);

    const onLogout = async () => {
        try {
            await actions.OnLogoutUser(navigation)
        } catch (error) {
            console.log('logout error')
        }
    }

    const onVoucherClick = () => {
        _gotoVoucherTabs(navigation)
    }

    const onPaymentMethodsClick = () => {
        navigation.navigate('paymentmethods')
    }

    return (
        <View style={styles.container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />

            <View style={styles.row}>
                <Text style={styles.boldText}>Personal information</Text>
                <MatComIcon name="pencil" size={WP(7)} color={COLORS.blackColor} />
            </View>
            <View style={styles.row}>
                <View style={styles.leftViewContainer}>
                    <View style={{ marginBottom: WP(5) }}>
                        <Text style={styles.labelSty}>Name</Text>
                        <Text style={styles.textSty}>{userDetail?.name || ''}</Text>
                    </View>
                    <View style={{ marginBottom: WP(5) }}>
                        <Text style={styles.labelSty}>Contact Number</Text>
                        <Text style={styles.textSty}>{userDetail?.phone || ''}</Text>
                    </View>
                    <View style={{ marginBottom: WP(5) }}>
                        <Text style={styles.labelSty}>Date of birth</Text>
                        <Text style={styles.textSty}>DD MM YYYY</Text>
                    </View>
                    <View style={{ marginBottom: WP(5) }}>
                        <Text style={styles.labelSty}>Location</Text>
                        <Text style={styles.textSty}>Add Details</Text>
                    </View>

                </View>
                <View style={[styles.rightViewContainer, { overflow: 'visible' }]}>
                    <View style={styles.rightViewContainer}>
                        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: API_BASE_URL + userDetail?.profile_image }} />
                    </View>
                    <Ionicons
                        style={styles.cameraIconSty}
                        name="camera" size={WP(7)}
                        color={COLORS.whiteColor}
                    />
                </View>
            </View>

            <View style={{ borderWidth: 1, borderColor: COLORS.grey, marginVertical: WP(3), }} />

            <Text onPress={() => navigation.navigate('addresses')} style={styles.headingText}>Addresses</Text>
            <Text onPress={onPaymentMethodsClick} style={styles.headingText}>Payment Methods</Text>
            <Text onPress={onVoucherClick} style={styles.headingText}>Vouchers</Text>
            <Text onPress={onLogout} style={styles.headingText}>Logout</Text>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: WP(8)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boldText: {
        fontSize: WP(4.5),
        letterSpacing: 1,
        fontWeight: '700',
        color: COLORS.blackColor,

    },
    rightViewContainer: {
        marginTop: WP(4),
        width: WP(33),
        borderRadius: WP(25),
        overflow: 'hidden',
        height: WP(33),
    },
    cameraIconSty: {
        position: 'absolute',
        bottom: -8,
        right: -5,
        padding: WP(1.5),
        borderRadius: WP(5),
        overflow: 'hidden',
        backgroundColor: 'rgb(103,114,148)'
    },
    leftViewContainer: {
        marginTop: WP(4),
        width: '60%',
    },
    labelSty: {
        fontSize: WP(3.3),
        letterSpacing: 1,
        fontWeight: '700',
        color: COLORS.blackColor,
    },
    textSty: {
        marginTop: WP(2.5),
        fontSize: WP(4),
        letterSpacing: 1,
        color: COLORS.blackColor,
    },
    headingText: {
        marginTop: WP(5),
        fontSize: WP(4.5),
        letterSpacing: 1,
        fontWeight: '700',
        color: COLORS.blackColor,

    },
})