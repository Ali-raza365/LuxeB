import { Image, Pressable, FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FS, HP, WP } from '../../theme/config'
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import Entypo from 'react-native-vector-icons/Entypo';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { Button } from '../../components';



const Speciallist = () => {

    const [selectedTab, setSelectedTab] = useState("Services");
    const TabArry = ["Services", "Review", "About", "Products"];
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];


    const CollapsibleViewHeader = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <View style={styles.listView}>
                    <Text style={styles.listTitle} >Bespoke blowdry (Long Hair)</Text>
                    <Text style={styles.timeAndDate}>45 min | $80</Text>
                </View>
                <Entypo name="chevron-small-down" size={WP(7)} color={COLORS.blackColor} />
            </View>
        )
    }


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
                            starSize={FS(2.2)}
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
                contentContainerStyle={{ padding: WP(2), }}
                renderItem={({ item, index }) => {
                    return (
                        <CollapsibleView
                            noArrow={true}
                            style={styles.CollapsibleView}
                            title={<CollapsibleViewHeader item={item} />} >
                            <View style={styles.CollapsibleViewContentContainer}>
                                <Text style={styles.CollapsibleViewContent}>Acupuncture is a form of Chinese and Japanese medicine that involves using tiny needles to stimulate the sensory nerves under the skin to relieve pain.</Text>
                                <View style={styles.QuantityStyle}>
                                    <Text style={styles.headingText}>Quantity:</Text>
                                    <TouchableOpacity activeOpacity={0.7} style={[styles.box]}><Text style={styles.boxText}>-</Text></TouchableOpacity>
                                    <Text style={styles.Qty}>2</Text>
                                    <TouchableOpacity activeOpacity={0.7} style={[styles.box]}><Text style={styles.boxText}>+</Text></TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.headingText}>Price:</Text>
                                    <Text style={styles.price}>$80</Text>
                                </View>
                                <Button buttonStyle={styles.buttonStyle} title={'Select'} />
                            </View>
                        </CollapsibleView>

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
        paddingLeft: 0,
        backgroundColor: COLORS.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listView: {
        width: '98%',
    },
    listTitle: {
        fontSize: WP(4),
        fontWeight: '500',
        // flexDirection:""
    },
    timeAndDate: {
        fontSize: FS(1.8),
        color: COLORS.darkGrey,
        paddingVertical: WP(1)
    },
    CollapsibleView: {
        borderWidth: 0,
        backgroundColor: "#fff",
        width: '95%'
    },
    CollapsibleViewContentContainer: {
        width: WP(90),
        // height: HP(25),
        paddingHorizontal: WP(4)
    },
    CollapsibleViewContent: {
        color: "#555555",
        fontWeight: '400',
        fontSize: FS(2),
    },
    QuantityStyle: {
        paddingVertical: HP(2),
        flexDirection: "row",
        alignItems: "center"
    },
    headingText: { color: COLORS.gary300, fontWeight: "400", fontSize: FS(2), marginRight: WP(2) },
    box: {
        width: WP(8),
        height: WP(8),
        backgroundColor: "#000",
        color: COLORS.whiteColor,
        fontWeight: "500",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    boxText: { color: COLORS.whiteColor, fontSize: FS(2) },
    Qty: {
        padding: WP(2),
    },
    price: {
        fontSize: FS(2),
        fontWeight: "500",
    },
    buttonStyle: {
        marginVertical: WP(4),
    }

})