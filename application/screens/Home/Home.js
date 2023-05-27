import React from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AppBar, CardBox } from '../../components';
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP, isIOS } from '../../theme/config';

const Home = ({ navigation }) => {

    const data = ["Massage", "Hair", "Make up", "Nails", "Eyebrow", "Waxing", "Hair Extension", "Lashes"]
    const onServiceClick = () => {
        navigation.navigate('services')
    }

    const renderItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => onServiceClick(item)} style={styles.CardBoxConatiner}>
                <View style={styles.cardBox}>
                    <Text style={styles.cardText}>{item}</Text>
                </View>
            </Pressable>
        )
    }

    const renderSlider = ({ item, index }) => {
        return (
            <CardBox
                onPress={() => { navigation.navigate("eventdetail", { detail: item }) }}
                showsHorizontalScrollIndicator={false}
                data={item}
            />
        )
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <AppBar type={'dark'} />
                <View style={styles._headerContainer}>
                    <Text style={styles.headerText} >U B E A U T Y</Text>
                </View>

                <ScrollView>
                    <View style={[styles._sectionOne, { paddingBottom: 0 }]}>
                        <FlatList
                            data={[{}, {}, {}]}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            scrollEventThrottle={16}
                            decelerationRate={'fast'}
                            snapToInterval={WP(100)}
                            renderItem={renderSlider}
                        />
                    </View>
                    <View style={styles._sectionTwo}>
                        <View style={styles.dateView}>
                            <Text style={styles._month}>Sep</Text>
                            <Text style={styles._day}>30</Text>
                            <Text style={styles._year}>22</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoHeading}>Haircuts and trims</Text>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoDetails}>
                                    <View style={styles._circleView}>
                                        <AntDesign name="heart" size={WP(3.5)} color={COLORS.whiteColor} />
                                    </View>
                                    <Text style={styles.infoTitle}>  Prime Label  </Text>
                                </View>
                                <View style={styles.infoIcons}>
                                    <View style={styles._circleView}>
                                        <Fontisto name="clock" size={WP(3.5)} color={COLORS.whiteColor} />
                                    </View>
                                    <Text style={styles.infoTime}>  15:00</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.nextView}>
                            <Entypo name="chevron-small-right" size={WP(7)} color={COLORS.whiteColor} />
                        </View>
                    </View>

                    <View style={styles.FilterView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable style={[styles.FilterBox]}>
                                <Text style={{ color: COLORS.whiteColor }}>Female</Text>
                            </Pressable>
                            <Pressable style={[styles.FilterBox, { backgroundColor: COLORS.whiteColor }]}>
                                <Text style={{ color: COLORS.blackColor }}>male</Text>
                            </Pressable>
                        </View>
                        <FontAwesome name="sliders" size={WP(7)} color={COLORS.blackColor} />
                    </View>

                    <View style={styles._sectionThree}>
                        <FlatList
                            data={data}
                            numColumns={2}
                            renderItem={renderItem}
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.offWhiteColor,
    },

    _headerContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: WP(SPACING_PERCENT),
        alignItems: 'center',
        justifyContent: "center"


    },
    headerText: { fontSize: WP(8), fontWeight: '300', letterSpacing: 3, color: "#000" },
    _sectionTwo: {
        marginVertical: WP(4),
        width: '90%',
        height: isIOS ? HP(12) : HP(15),
        alignSelf: 'center',
        backgroundColor: COLORS.whiteColor,
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: WP(RADIUS),
        padding: WP(2),
    },

    dateView: {
        width: '15%',
        backgroundColor: COLORS.blackColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoView: {
        width: '78%',
        backgroundColor: COLORS.whiteColor,
        paddingTop: WP(2),
        paddingLeft: WP(3),

    },
    _circleView: {
        width: WP(7),
        height: WP(7),
        backgroundColor: COLORS.blackColor,
        borderRadius: WP(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    _month: {
        color:
            COLORS.gray500,
        fontSize: WP(TEXT_SIZES.info_1)
    },
    _year: {
        color: COLORS.gray500,
        fontSize: WP(TEXT_SIZES.info_1)
    },
    _day: {
        color: COLORS.whiteColor,
        fontSize: WP(TEXT_SIZES.h3)
    },
    infoHeading: {
        color: COLORS.blackColor,
        fontSize: WP(5)
    },
    infoContainer: {
        flexDirection: 'row',
        padding: WP(3),
        paddingLeft: 0
    },
    infoDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: WP(1)
    },
    infoTitle: {
        color: COLORS.lightGrey,
        fontSize: WP(3)
    },
    infoIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoTime: {
        color: COLORS.lightGrey,
        fontSize: WP(3)
    },
    nextView: {
        width: '7%',
        backgroundColor: COLORS.blackColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    CardBoxConatiner: {
        width: WP(42),
        height: WP(42),
        backgroundColor: COLORS.primaryColor,
        margin: WP(2),
    },
    cardBox: {
        paddingHorizontal: WP(3),
        paddingVertical: WP(2),
        backgroundColor: COLORS.blackColor,
        position: 'absolute',
        left: 15,
        bottom: 12,
    },
    cardText: { color: COLORS.whiteColor },
    FilterView: {
        marginVertical: WP(2),
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        // backgroundColor: COLORS.redColor,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    FilterBox: {
        width: WP(20),
        height: WP(10),
        backgroundColor: COLORS.blackColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    _sectionThree: {
        width: "95%",
        alignSelf: "center",
        padding: WP(2),
        paddingBottom: WP(5),
    },
})