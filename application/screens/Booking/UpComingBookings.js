import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppBar } from '../../components'
import { COLORS } from '../../theme/config'
import BookingListView from './components/BookingListView'

const UpComingBookings = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />
            <FlatList
                data={[1, 1, 1, 11, 1, 1]}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <BookingListView item={item} navigation={navigation} />}
            />
        </View>
    )
}

export default UpComingBookings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.offWhiteColor
    }
})