import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FS, WP } from '../../theme/config';
import Ionicons from 'react-native-vector-icons/Ionicons';


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
                <Text style={styles.voucherTitle}>{item.title}</Text>
                <View style={styles.row}>
                    <Text style={styles.codeTextSty}>{item.code || ''}</Text>
                    <View style={{ flexDirection: 'row',alignItems:'center', justifyContent:'center' }}>
                        <Ionicons onPress={{}} name="md-copy-outline" size={FS(4)} color={COLORS.blackColor} />
                        <Text style={{ fontSize: WP(4.5), fontWeight:'600' }}> copy code</Text>
                    </View>
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
        fontWeight: '600'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingVertical:WP(2),
        borderStyle:'dashed',
    
        borderBottomColor:COLORS.blackColor,
        borderBottomWidth:1,
        borderWidth:2,
    },
    codeTextSty: {
        fontSize: WP(7),
        fontWeight: '400',
    }
})