import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONT_BOLD, FS, HP, WP } from '../../theme/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _formatFullDate } from '../../utils/TimeFunctions';
import { AppBar } from '../../components';
import actions from '../../store/actions';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';



const AvailableVoucher = () => {

    const userDetail = useSelector(store => store.user.userDetail);
    const currency = useSelector(state => state.user.currency);

    const [loading, setLoading] = useState(false)


    const _handleRefresh = async () => {
        try {
            setLoading(true)
            await actions.getUserDetails()
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleCopy = (voucherCode) => {
        try {
            Clipboard.setString(voucherCode || '');
        } catch (error) {
            console.log(error)
        }
    };

    const voucherCard = ({ item, index }) => {
        return (
            <View style={styles.voucherContainer}>
                <AppBar type='light' backgroundColor={COLORS.blackColor} />
                <Text style={styles.voucherTitle}>{item?.voucher?.title || ''}</Text>
                <View style={styles.row}>
                    <Text style={styles.codeTextSty}>{item?.voucher?.code || ''}</Text>
                    <TouchableOpacity
                        onPress={() => { handleCopy(item?.voucher?.code) }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons onPress={{}} name="md-copy-outline" size={FS(4)} color={COLORS.blackColor} />
                        <Text style={{ fontSize: WP(4), fontWeight: '600' }}> copy code</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontSize: WP(4), width:'40%', fontWeight: '600' }}>Min Spend: <Text style={{ fontSize: WP(4), fontWeight: '400' }}>{currency} {item?.voucher?.usage_limit || ''}</Text></Text>
                    <Text style={{ fontSize: WP(4), fontWeight: '600' }}>Expires on: <Text style={{ fontSize: WP(4), fontWeight: '400' }}>{_formatFullDate(new Date(item?.voucher?.expiry_date || null))}</Text></Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                refreshControl={(
                    <RefreshControl
                        tintColor={COLORS.blackColor}
                        refreshing={loading}
                        onRefresh={_handleRefresh}
                    />)}
                data={userDetail?.vouchers || []}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 100,
                }}
                renderItem={voucherCard}
                ListEmptyComponent={(
                    <View style={{ height: HP(60), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.listHeading} >No voucher Found!</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default AvailableVoucher

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    voucherContainer: {
        width: WP(90),
        backgroundColor: COLORS.whiteColor,
        padding: WP(5),
        marginTop: WP(5)
    },
    voucherTitle: {
        fontSize: WP(8),
        fontWeight: '700',
        fontFamily: FONT_BOLD,
        color: COLORS.blackColor,

    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: WP(2),
        borderColor: "black",
        borderBottomWidth: 0.8,
        borderBottomColor: COLORS.borderColor
    },
    codeTextSty: {
        fontSize: WP(7),
        fontWeight: '400',
        color: COLORS.blackColor,
    },
    listHeading: {
        fontSize: WP(4.5),
        fontWeight: '600',
        paddingRight: WP(2),
    },
})