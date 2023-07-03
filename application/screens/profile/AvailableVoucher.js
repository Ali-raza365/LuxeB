import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FS, WP } from '../../theme/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _formatFullDate } from '../../utils/TimeFunctions';
import { AppBar } from '../../components';


const AvailableVoucher = () => {

    let data = [
        {
            title: "25% off",
            code: "Welcome25",
            minSpend: 200,
            date: new Date(),
        },
        {
            title: "$150 Sorry Voucher",
            code: "Welcome25",
            minSpend: 200,
            date: new Date(),
        },
    ]

    const voucherCard = ({ item, index }) => {
        return (
            <View style={styles.voucherContainer}>
                <AppBar type='light' backgroundColor={COLORS.blackColor} />
                <Text style={styles.voucherTitle}>{item.title}</Text>
                <View style={styles.row}>
                    <Text style={styles.codeTextSty}>{item.code || ''}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons onPress={{}} name="md-copy-outline" size={FS(4)} color={COLORS.blackColor} />
                        <Text style={{ fontSize: WP(4), fontWeight: '600' }}> copy code</Text>
                    </View>
                </View>
                <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <Text style={{ fontSize: WP(4), fontWeight: '600' }}>Min Spend: <Text style={{ fontSize: WP(4), fontWeight: '400' }}>${item.minSpend || ''}</Text></Text>
                    <Text style={{ fontSize: WP(4), fontWeight: '600' }}>Expires on: <Text style={{ fontSize: WP(4), fontWeight: '400' }}>{_formatFullDate(new Date())}</Text></Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 100,
                }}
                renderItem={voucherCard}
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
        fontWeight: '600',
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
    }
})