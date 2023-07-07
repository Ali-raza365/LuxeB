import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, WP } from '../../theme/config'
import { Button } from '../../components'

const Addresses = () => {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: WP(30) }}
                keyExtractor={(_, i) => i.toString()}
                data={[3, 3, 3, 3, 3, 3, 3, 3, 3]}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable style={styles.listContainer}>
                            <Text style={styles.heading}>Address</Text>
                            <Text style={styles.addressText}>Bales College Kilubrn Lane, Bang Bon 2,Bang Bon</Text>
                            <Text style={[styles.tabBubbleText]} >Booking</Text>
                        </Pressable>
                    )
                }}
            />

            <View style={styles.btnContainer}>
                <Button
                    onPress={() => { }}
                    buttonStyle={{ width:'45%' }}
                    title={'Set As Booking'}
                />
                 <Button
                    onPress={() => { }}
                    buttonStyle={{ width:'45%' }}
                    title={'Set As Billing'}
                />
            </View>
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
        marginVertical: WP(3),
    },
    heading: {
        paddingBottom: WP(1.2),
        fontSize: WP(4),
        letterSpacing: 1,
        fontWeight: '700',
        color: COLORS.blackColor,
    },
    addressText: {
        width: '70%',
        fontSize: WP(3.5),
        letterSpacing: 1,
        color: COLORS.blackColor,
    },
    tabBubbleText: {
        // width:'25%',
        textAlign: 'center',
        backgroundColor: COLORS.blackColor,
        color: COLORS.whiteColor,
        paddingHorizontal: WP(4),
        paddingVertical: WP(1.5),
        borderRadius: WP(4),
        fontWeight: '700',
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
    },
    btnContainer: {
        width:'100%',
        position: 'absolute',
        bottom: WP(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:'center',
    }
})