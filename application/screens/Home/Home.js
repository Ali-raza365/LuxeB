import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AppBar, CardBox } from '../../components';
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP, isIOS } from '../../theme/config';
import ImageCarousel from '../../components/ImageCarousel';
import { IMAGES } from '../../constants/ImagePath';
import actions from '../../store/actions';
import { API_BASE_URL } from '../../api/apis';
import { _formatDate } from '../../utils/TimeFunctions';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [serviceData, setServiceData] = useState(null);

    const data = [
        {
            id: 1,
            service_name: 'Massage',
            service_image: 'https://i.pinimg.com/564x/2f/7e/b3/2f7eb3481c784348eb68dc5aebe298b0.jpg',
        },
        {
            id: 2,
            service_name: 'Hair',
            service_image: 'https://i.pinimg.com/564x/49/a1/ce/49a1ce33783fee8af2fc5697ba3cda72.jpg',
        },
        {
            id: 3,
            service_name: 'Tanning',
            service_image: 'https://i.pinimg.com/564x/33/e9/80/33e9803ef3fdec124fd7964246553f1c.jpg',
        },
        {
            id: 4,
            service_name: 'Facial',
            service_image: 'https://i.pinimg.com/564x/e7/2a/59/e72a594b01db6c989b1b2ed6de69b805.jpg',
        },
        {
            id: 5,
            service_name: 'Makeup',
            service_image: 'https://i.pinimg.com/564x/d6/6f/59/d66f59128ef3d474f90cc34a2ecda7e1.jpg',
        },
        {
            id: 6,
            service_name: 'Nails',
            service_image: 'https://i.pinimg.com/564x/0a/95/ab/0a95abb7f9cbc9bd62a18e9169122716.jpg',
        },
        {
            id: 7,
            service_name: 'Eye Brow',
            service_image: 'https://i.pinimg.com/564x/a8/3d/f2/a83df26d25e6951ab6bd66c35c30072b.jpg',
        },
        {
            id: 8,
            service_name: 'Lashes',
            service_image: 'https://i.pinimg.com/736x/f0/b1/31/f0b131562b54e2e2f77b1ef01783e1cb.jpg',
        },
        {
            id: 9,
            service_name: 'Waxing',
            service_image: 'https://i.pinimg.com/564x/78/2d/00/782d006582d9d33e3bb4096dd04e0fcb.jpg',
        },
        {
            id: 10,
            service_name: 'Hair Extension',
            service_image: 'https://i.pinimg.com/564x/e1/ad/9e/e1ad9eb6ac0672cb2d8e71167c60bc1a.jpg',
        },
    ];

    const _handleRefresh = async () => {
        try {
            setLoading(true)
            let res = await actions.fetchServicesCategories()
            setServiceData(res)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("error riased in sevices api", error)
            alert(error.message)
        }
    }

    useEffect(() => {
        _handleRefresh()
    }, [])


    const onServiceClick = async (service) => {
        try {
            await actions.onServiceSelect(service, navigation)
        } catch (error) {
            console.log("error riased in on services api", error)
            alert(error?.message)
        }
    }

    let dataSliider = [
        { image: IMAGES.slider1 },
        { image: IMAGES.slider2 },
        { image: IMAGES.slider3 },
    ]

    const renderItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => onServiceClick(item)} style={styles.CardBoxConatiner} >
                <Image
                    source={{ uri: API_BASE_URL + item.service_image }}
                    style={{ width: '100%', height: '100%' }}
                />
                <View style={styles.cardBox}>
                    <Text style={styles.cardText}>{item.service_name}</Text>
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
                <AppBar type={'dark'} backgroundColor={COLORS.offWhiteColor} />
                <View style={styles._headerContainer}>
                    <Text style={styles.headerText} >L U X E B E A U T Y</Text>
                </View>

                <ScrollView>
                    <View style={[styles._sectionOne, { paddingBottom: 0 }]}>
                        {/* <FlatList
                            data={[{}, {}, {}]}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            scrollEventThrottle={16}
                            decelerationRate={'fast'}
                            snapToInterval={WP(100)}
                            renderItem={renderSlider}
                        /> */}
                        <ImageCarousel data={dataSliider} />
                    </View>
                    {/* <View style={styles._sectionTwo}>
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
                    </View> */}

                    <View style={styles.FilterView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable style={[styles.FilterBox]}>
                                <Text style={{ color: COLORS.whiteColor }}>Female</Text>
                            </Pressable>
                            <Pressable style={[styles.FilterBox, { backgroundColor: COLORS.whiteColor }]}>
                                <Text style={{ color: COLORS.blackColor }}>Male</Text>
                            </Pressable>
                        </View>
                        {/* <FontAwesome name="sliders" size={WP(7)} color={COLORS.blackColor} /> */}
                    </View>

                    <View style={styles._sectionThree}>
                        <FlatList
                            scrollEnabled={false}
                            initialNumToRender={6}
                            refreshControl={
                                <RefreshControl
                                    tintColor={COLORS.blackColor}
                                    refreshing={loading}
                                    onRefresh={_handleRefresh}
                                />
                            }
                            data={serviceData}
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
    headerText: {
        width: '90%',
        fontSize: WP(8),
        fontWeight: '300',
        letterSpacing: 2.5,
        color: "#000",
        textAlign: 'center'
    },
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
        resizeMode: 'center',
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
        marginTop: WP(4),
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