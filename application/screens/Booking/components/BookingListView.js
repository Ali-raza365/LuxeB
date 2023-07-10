import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONT_BOLD, FS, WP } from '../../../theme/config';
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const BookingListView = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('bookingdetail')}
            style={styles.ListContainer}>
            <View style={styles.reviewInfoContainer}>
                <Text style={styles.reviewHeading}>faisal</Text>
                <View style={styles.row}>
                    <MatComIcons name="map-marker-outline" size={WP(4.5)} color={COLORS.blackColor} />
                    <Text style={styles.reviewText} >{item?.review_text || 'South Bank University SE1 OAA'}</Text>
                </View>
                <View style={[styles.row, { borderBottomWidth: 0, paddingTop: 0, marginTop: 0 }]}>
                    <Feather name="clock" size={WP(4.5)} color={COLORS.blackColor} />
                    <Text style={styles.reviewText} >{item?.review_text || '  9:00 AM - 12:00 PM'}</Text>
                </View>
            </View>
            <View style={styles.reviewImageContainer}>
                <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: "https://i.pinimg.com/564x/8f/fc/25/8ffc25b311fd7222ff60cf49d99189df.jpg" }} />
            </View>
        </TouchableOpacity>
    )
}

export default BookingListView

const styles = StyleSheet.create({
    ListContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: WP(2),
        backgroundColor: COLORS.whiteColor,
        paddingHorizontal: WP(5),
        paddingVertical: WP(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewImageContainer: {
        width: WP(20),
        borderRadius: WP(20),
        overflow: 'hidden',
        height: WP(20),
    },
    reviewHeading: {
        fontSize: FS(2.2),
        fontWeight: '700',
        color: COLORS.blackColor,
        fontFamily:FONT_BOLD,
    },
    reviewText: {
        fontSize: WP(2.8),
        paddingVertical: WP(1),
        color: COLORS.blackColor,
    },
    reviewInfoContainer: {
        width: '70%',
    },
    row: {
        flexDirection: 'row',
        marginVertical: WP(1),
        paddingVertical: WP(1),
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderBottomColor: COLORS.grey,
    }

})