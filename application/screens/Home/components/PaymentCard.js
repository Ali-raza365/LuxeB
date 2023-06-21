import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, WP } from '../../../theme/config'
import { IMAGES } from '../../../constants/ImagePath'

const PaymentCard = ({select = false}) => {
    return (
        <View style={[styles.paymentCardContainer, { borderWidth: select ? 1 : 0 }]}>
            <Image source={IMAGES.visa} style={{ width: WP(10), height: WP(10) }} resizeMode='contain' />
            <View style={styles.row}>
                <Text style={{ fontSize: WP(4), fontWeight: '500' }}>Visa</Text>
                <Text>**** <Text>4096</Text> </Text>
            </View>

            <View style={styles.circleView}>
                {
                    select && <View style={styles.dot} />
                }

            </View>
        </View>
    )
}

export default PaymentCard

const styles = StyleSheet.create({
    paymentCardContainer: {
        width: '100%',
        marginTop: WP(3),
        width: '100%',
        padding: WP(3),
        borderColor: '#000',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        width: '75%',
        paddingLeft: WP(5),
        // backgroundColor:'red',

    },
    circleView: {
        width: WP(9),
        height: WP(9),
        borderRadius: WP(8),
        borderColor: '#000',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: WP(6),
        height: WP(6),
        borderRadius: WP(6),
        backgroundColor: '#000',
    }
})