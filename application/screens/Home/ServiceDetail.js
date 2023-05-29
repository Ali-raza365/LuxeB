
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AppBar } from '../../components'
import { COLORS, HP, WP } from '../../theme/config'
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';

const ServiceDetail = ({ navigation }) => {

    const servicesData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];
    const [filterValue, setFilterValue] = useState("Classic")
    const filterArray = [
        { name: "Classic", icon: (<AntDesign name="heart" size={WP(4)} color={COLORS.whiteColor} />) },
        { name: "Elite", icon: (<AntDesign name="star" size={WP(4)} color={COLORS.whiteColor} />) },
        { name: "Diamond", icon: (<MatComIcons name="diamond" size={WP(4)} color={COLORS.whiteColor} />) },
    ];
    const timeArr = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"]


    const onServiceClick = () => {
        navigation.navigate("speciallist")
    }

    const renderItem = ({ item, index }) => {
        return (
            <Pressable onPress={onServiceClick} style={styles.listContainer}>
                <View style={styles.listTopView}>
                    <View style={styles.listLeftView}>
                        <View style={styles.listHeaderContainer}>
                            <Text style={styles.listHeading}>Suzie</Text>
                            <View style={styles._circleView}>
                                <AntDesign name="star" size={WP(4)} color={COLORS.whiteColor} />
                            </View>
                        </View>
                        <Text style={styles.listText} >Makeup • Facial • Hair</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={4.5}
                                starSize={WP(5)}
                                containerStyle={{ width: '50%' }}
                            />
                            <Text style={{ paddingHorizontal: WP(1.5) }}>4.5</Text>
                            <Text>(2.8)</Text>
                        </View>
                    </View>
                    <View style={styles.listRightView}>
                        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" }} />
                    </View>
                </View>
                <View style={styles.listBottomView}>
                    {
                        timeArr.map((item, index) => {
                            return (
                                <Pressable key={index}
                                    // onPress={() => setFilterValue(item.name)}
                                    style={[styles.TimeView, { backgroundColor: filterValue == item?.name ? COLORS.primaryColor : COLORS.whiteColor }]}
                                >
                                    <Text style={styles.TimeTextSty}>{item}</Text>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles._container}>
            <AppBar type='light' />

            {/* filter */}
            <View style={styles.filterContainer}>
                {
                    filterArray.map((item, index) => {
                        return (
                            <Pressable key={index}
                                onPress={() => setFilterValue(item.name)}
                                style={[styles.filterView, { backgroundColor: filterValue == item?.name ? COLORS.primaryColor : COLORS.whiteColor }]}
                            >
                                <View style={styles._circleView}>
                                    {item.icon}
                                </View>
                                <Text style={styles.filterText}>{item?.name}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>

            <View >
                <FlatList
                    data={servicesData}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: WP(30) }}
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
        flexDirection: 'row',
    },
    filterView: {
        width: "33%",
        height: WP(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    _circleView: {
        width: WP(7),
        height: WP(7),
        backgroundColor: COLORS.blackColor,
        borderRadius: WP(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterText: {
        fontSize: WP(3.3),
        paddingLeft: WP(2),
        color: COLORS.darkGrey
    },

    listContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: WP(2),
        backgroundColor: COLORS.whiteColor,
        marginVertical: WP(3),
    },
    listTopView: {
        width: '100%',
        padding: WP(2),
        paddingVertical: WP(3),
        backgroundColor: COLORS.whiteColor,
        flexDirection: 'row',
    },
    listLeftView: {
        width: '65%',
        // backgroundColor: COLORS.territoryColor,
        paddingLeft: WP(3)
    },
    listRightView: {
        width: '30%',
        borderRadius: WP(25),
        overflow: 'hidden',
        height: WP(25),
    },

    listHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listHeading: {
        fontSize: WP(4.5),
        fontWeight: '600',
        paddingRight: WP(2),
    },
    listText: {
        fontSize: WP(3.3),
        paddingVertical: WP(2),
    },
    listBottomView: {
        borderTopColor: COLORS.grey,
        borderTopWidth: 1,
        width: '100%',
        // backgroundColor: 'cyan',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TimeView: {
        // width:'24%',
        padding: WP(2),
        paddingHorizontal: WP(1),
        borderWidth: 0.8,
        borderColor: COLORS.borderColor,
        margin: WP(1),
        marginTop: WP(3),
        alignItems: 'center',
        justifyContent: 'center'
    },
    TimeTextSty: {
        fontSize: WP(3.3),
        paddingLeft: WP(2),
        color: COLORS.blackColor
    }
})