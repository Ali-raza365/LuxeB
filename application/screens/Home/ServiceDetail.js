
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppBar } from '../../components'
import { COLORS, WP } from '../../theme/config'
import Entypo from 'react-native-vector-icons/Entypo';

const ServiceDetail = ({ navigation }) => {

    const servicesData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    const onServiceClick = () => {
        navigation.navigate("servicedetail")
    }

    const renderItem = ({ item, index }) => {
        return (
            <Pressable onPress={onServiceClick} style={styles.listContainer}>
                <View style={styles.listView}>
                    <Text style={styles.listText} >Manicure extension acrylic fghtrdej</Text>
                    <Text style={{ fontSize: WP(2.8), color: COLORS.lightGrey, padding: WP(1) }}>45 min</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles._container}>
            <AppBar type='light' />

            <View style={styles.filterContainer}>

            </View>

            <View >
                <FlatList
                    data={servicesData}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ServiceDetail

const styles = StyleSheet.create({
    _container: {
        flex: 1,
    },

    filterContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.primaryColor,
        marginVertical: WP(3),
    },

    listContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: WP(4),
        backgroundColor: COLORS.whiteColor,
        marginVertical: WP(3),
        flexDirection: 'row',
    },
    listView: {
        width: '95%',
    },
    listText: {
        fontSize: WP(3),
        fontWeight: '600',
    }
})