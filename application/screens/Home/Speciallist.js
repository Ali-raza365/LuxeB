import { Image, Pressable,FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, HP, WP } from '../../theme/config'
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import Entypo from 'react-native-vector-icons/Entypo';

const Speciallist = () => {

    const [selectedTab, setSelectedTab] = useState("Services");
    const TabArry = ["Services", "Review", "About", "Products"];
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];


    return (
        <View style={styles.container}>
            <View style={styles.listTopView}>
                <View style={styles.listLeftView}>
                    <View style={styles.listHeaderContainer}>
                        <Text style={styles.listHeading}>Laura</Text>
                        <Text style={styles.listHeading}>CHoutta</Text>
                    </View>
                    <Text style={styles.listText} >Makeup, Facial, Hair</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles._circleView}>
                            <AntDesign name="star" size={WP(5)} color={COLORS.whiteColor} />
                        </View>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={4.5}
                            starSize={WP(5)}
                            containerStyle={{ width: '48%', marginLeft: WP(2) }}
                        />
                        <Text style={{ paddingHorizontal: WP(1.5) }}>4.5</Text>
                        <Text>(2.8)</Text>
                    </View>
                </View>
                <View style={styles.listRightView}>
                    <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" }} />
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer} >
                {
                    TabArry.map((item, index) => {
                        return (
                            <Pressable onPress={() => setSelectedTab(item)} key={index} style={[styles.tabView, { borderBottomWidth: selectedTab == item ? 1 : 0 }]}>
                                <Text style={{ color: selectedTab == item ? COLORS.whiteColor : COLORS.gray500 }} >{item}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index})=>{
                    return (
                        <Pressable  style={styles.listContainer}>
                            <View style={styles.listView}>
                                <Text style={styles.listTitle} >Bespoke blowdry (Long Hair)</Text>
                                <Text style={{ fontSize: WP(3), color: COLORS.darkGrey, padding: WP(1) }}>45 min | $80</Text>
                            </View>
                            <Entypo name="chevron-small-down" size={WP(7)} color={COLORS.blackColor} />
                        </Pressable>
                    )
                }}
            />

        </View>
    )
}

export default Speciallist

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingLeft: WP(3)
    },
    listRightView: {
        width: '30%',
        borderRadius: WP(28),
        overflow: 'hidden',
        height: WP(30),
    },

    listHeaderContainer: {
        alignItems: 'flex-start',
    },
    listHeading: {
        fontSize: WP(6),
        fontWeight: '600',
        paddingRight: WP(2),
    },
    listText: {
        fontSize: WP(3.3),
        paddingVertical: WP(2),
    },
    _circleView: {
        width: WP(8),
        height: WP(8),
        backgroundColor: COLORS.blackColor,
        borderRadius: WP(5),
        alignItems: 'center',
        justifyContent: 'center'
    },

    tabContainer: {
        width: '90%',
        padding: WP(2),
        alignSelf: 'center',
        marginVertical: WP(3),
        backgroundColor: COLORS.blackColor,
        flexDirection: 'row',
    },

    tabView: {
        width: '25%',
        padding: WP(2),
        paddingVertical: WP(2),
        // backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryColor,
    },

    listContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: WP(4),
        backgroundColor: COLORS.whiteColor,
        marginVertical: WP(3),
        flexDirection: 'row',
        alignItems: 'center',
    },
    listView: {
        width: '95%',
    },
    listTitle: {
        fontSize: WP(4),
        fontWeight: '500',
    },

})