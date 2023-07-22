import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppBar } from '../../components'
import { COLORS, HP, WP } from '../../theme/config'
import BookingListView from './components/BookingListView'
import actions from '../../store/actions'
import { useSelector } from 'react-redux'

const CompleteBooking = ({ navigation }) => {

    const allAppointments = useSelector(store => store.service.allAppointments);
    const currency = useSelector(state => state.user.currency);
    const userDetail = useSelector(store => store.user.userDetail);


    const [loading, setLoading] = useState(false)
    const _handleRefresh = async () => {
        try {
            setLoading(true)
            const customer_id = userDetail?.id;
            let data = { customer_id }
            await actions.fetchAppointments(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        _handleRefresh()
    }, [])

    const filterBookingData = useCallback(() => {
        // Filter the bookings array to get only items with status "pending"
        return allAppointments.filter(booking => booking.booking_status === 'completed');
    }, [allAppointments]);


    console.log(filterBookingData())


    return (
        <View style={styles.container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />
            <FlatList
                refreshControl={(
                    <RefreshControl
                        tintColor={COLORS.blackColor}
                        refreshing={loading}
                        onRefresh={_handleRefresh}
                    />)}
                data={filterBookingData() || []}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <BookingListView item={item} navigation={navigation} />}
                ListEmptyComponent={(
                    <View style={{ height: HP(60), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.listHeading} >No Bookings Found!</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default CompleteBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.offWhiteColor
    },
    listHeading: {
        fontSize: WP(4.5),
        fontWeight: '600',
        paddingRight: WP(2),
    },
})