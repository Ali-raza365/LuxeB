import { FlatList, Pressable, RefreshControl, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT_BOLD, FS, WP } from '../../theme/config'
import { Button } from '../../components'
import { useSelector } from 'react-redux'
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewAddressModal from './components/NewAddressModal'
import { GetLocation } from '../../utils/GetLocation'
import actions from '../../store/actions'

const Addresses = ({ navigation }) => {

    const userDetail = useSelector(store => store.user.userDetail);
    const [selectAddress, setSelectAddress] = useState(null);
    const [addressModal, setAddressModal] = useState(false)
    const [coordinate, setCoordinate] = useState(null);
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


    useEffect(() => {
        if (selectAddress) {
            navigation.setOptions({
                headerRight: () => (
                    <Ionicons name="close" onPress={() => setSelectAddress(null)} size={FS(4)} color={COLORS.whiteColor} />
                )
            })
        } else {
            navigation.setOptions({
                headerRight: () => (
                    <MatComIcon onPress={() => onAddAddreeBtnClick()} name="pencil-outline" size={FS(4)} color={COLORS.whiteColor} />
                )
            })
        }
    }, [selectAddress])

    const onAddAddreeBtnClick = async () => {
        try {
            await GetLocation().then((loc) => {
                console.log({ loc })
                setCoordinate(loc)
                setAddressModal(true)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const setAsBooking = async (item) => {
        try {
            let detail = {
                customer: userDetail?.id,
                is_booking: true,
                is_billing: selectAddress?.is_billing,
                location_id: selectAddress.id,
            }
            await actions.onSetDefaultAddress(detail).then((loc) => {
               setSelectAddress(false)
            })
        } catch (error) {
            console.log('error', error)
        }
    }
    const setAsBillking = async (item) => {
        try {
            let detail = {
                customer: userDetail?.id,
                is_booking: selectAddress?.is_booking,
                is_billing: true,
                location_id: selectAddress.id,
            }
            await actions.onSetDefaultAddress(detail).then((loc) => {
               setSelectAddress(false)
            })
        } catch (error) {
            console.log('error', error)
        }
    }


    return (
        <View style={styles.container}>
            <NewAddressModal
                isVisible={addressModal}
                coordinate={coordinate}
                onBackButtonPress={() => { setAddressModal(false) }}
                onBackdropPress={() => { setAddressModal(false) }}
            />
            <FlatList
                refreshControl={(
                    <RefreshControl
                        tintColor={COLORS.blackColor}
                        refreshing={loading}
                        onRefresh={_handleRefresh}
                    />)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: WP(30) }}
                keyExtractor={(_, i) => i.toString()}
                data={userDetail?.locations || []}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable
                            onPress={() => (setSelectAddress(item))}
                            style={[styles.listContainer, { borderWidth: selectAddress == item ? 1 : 0 }]}>
                            <Text style={styles.heading}>Address</Text>
                            <Text style={styles.addressText}>{item?.address}</Text>
                            <View style={styles.tabBubbleContainer}>
                                {item?.is_booking && <Text style={[styles.tabBubbleText]} >Booking</Text>}
                                {item?.is_billing && <Text style={[styles.tabBubbleText]} >Billing</Text>}
                            </View>
                        </Pressable>
                    )
                }}
            />
            {
                selectAddress ?
                    <View style={styles.btnContainer}>
                        <Button
                            onPress={setAsBooking}
                            buttonStyle={{ width: '45%' }}
                            title={'Set As Booking'}
                        />
                        <Button
                            onPress={setAsBillking}
                            buttonStyle={{ width: '45%' }}
                            title={'Set As Billing'}
                        />
                    </View>
                    : null
            }
        </View>
    )
}

export default Addresses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: WP(6),
    },
    listContainer: {
        padding: WP(3),
        // borderWidth: 1,
        borderColor: COLORS.blackColor,
        marginVertical: WP(1),
        // borderRadius: WP(4),
    },
    heading: {
        paddingBottom: WP(1.2),
        fontSize: WP(4),
        letterSpacing: 1,
        fontWeight: '700',
        fontFamily:FONT_BOLD,
        color: COLORS.blackColor,
    },
    addressText: {
        width: '70%',
        fontSize: WP(3.5),
        letterSpacing: 1,
        color: COLORS.blackColor,
    },
    tabBubbleContainer: {
        position: 'absolute',
        right: 5,
    },
    tabBubbleText: {
        textAlign: 'center',
        backgroundColor: COLORS.blackColor,
        color: COLORS.whiteColor,
        paddingHorizontal: WP(4),
        paddingVertical: WP(1.2),
        marginTop: WP(1),
        borderRadius: WP(4),
        fontWeight: '700',
        overflow: 'hidden',
    },
    btnContainer: {
        width: '100%',
        position: 'absolute',
        bottom: WP(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    }
})