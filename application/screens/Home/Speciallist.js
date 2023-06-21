import { Image, Pressable, FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FS, HP, WP } from '../../theme/config'
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import Entypo from 'react-native-vector-icons/Entypo';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { AppBar, Button } from '../../components';
import DateTimeModal from './components/DateTimeModal';



const Speciallist = () => {

    const [selectedTab, setSelectedTab] = useState("Services");
    const TabArry = ["Services", "Review", "About", "Products"];
    const [selected, setSelected] = useState(false);
    const [serviceQuanity, setServiceQuanity] = useState(1);
    const [data, setdata] = useState(speciallistData)

    const [showDateTimeModal, setShowDateTimeModal] = useState(false);
    const toggleDateTimeModal = () => {
        setShowDateTimeModal(!showDateTimeModal)
    }

    const incrementQuantity = (subServiceId) => {
        speciallistData.services.forEach(service => {
            service.sub_services.forEach(subService => {
                if (subService.sub_service.id === subServiceId) {
                    subService.quantity += 1;
                }
            });
        });
    };

    const decrementQuantity = (subServiceId) => {
        speciallistData.services.forEach(service => {
            service.sub_services.forEach(subService => {
                if (subService.sub_service.id === subServiceId && subService.quantity > 0) {
                    subService.quantity -= 1;
                }
            });
        });
    };

    let speciallistData = {
        "id": 9,
        "username": "faisal",
        "therapist_info": [
            {
                "type": "gold",
                "about": "lorem ipusm dolor dummy text"
            }
        ],
        "profile_image": "/media/profile_images/Original-6.png",
        "is_therapist": true,
        "services": [
            {
                "service": {
                    "id": 4,
                    "service_name": "Facial",
                    "service_image": "/media/service_images/Original-9.png"
                },
                "sub_services": [
                    {
                        "sub_service": {
                            "id": 2,
                            "sub_service_name": "full face facial",
                            "description": "lorem ipsum"
                        },
                        "price": "12.00",
                        "duration": 45,
                        "user": 9,
                        "quantity": 1,
                        "isSelected": false

                    },
                    {
                        "sub_service": {
                            "id": 4,
                            "sub_service_name": "full face facial",
                            "description": "lorem ipsum"
                        },
                        "price": "12.00",
                        "duration": 45,
                        "user": 9,
                        "quantity": 1,
                        "isSelected": false
                    }
                ]
            }
        ],
        "reviews": {
            "all_reviews": [
                {
                    "rating": 3,
                    "review_text": "very professional and polite, recommended 100%",
                    "created_at": "2023-06-11T15:35:41.171767Z"
                }
            ],
            "average_rating": 3.0,
            "total_ratings": 1
        }
    }


    const CollapsibleViewHeader = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <View style={styles.listView}>
                    <Text style={styles.listTitle} >{item?.sub_service?.sub_service_name || ''}</Text>
                    <Text style={styles.timeAndDate}>{item?.duration} min | ${item?.price || ''}</Text>
                </View>
                <Entypo name="chevron-small-down" size={WP(7)} color={COLORS.blackColor} />
            </View>
        )
    }


    return (
        <View style={styles.container}>

            <AppBar type='dark' backgroundColor={COLORS.whiteColor} />


            <DateTimeModal
                onBackButtonPress={toggleDateTimeModal}
                onBackdropPress={toggleDateTimeModal}
                isVisible={showDateTimeModal}
            />

            <View style={styles.listTopView}>
                <View style={styles.listLeftView}>
                    <View style={styles.listHeaderContainer}>
                        <Text style={styles.listHeading}>{speciallistData?.username || ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            speciallistData.services.map((service, index) => {
                                return <Text style={styles.listText} >{service?.service?.service_name || ''}{speciallistData?.services.length != index + 1 ? ',' : ''} </Text>
                            })
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles._circleView}>
                            {
                                speciallistData?.therapist_info?.[0]?.type == 'silver' ?
                                    <AntDesign name="heart" size={WP(4.5)} color={COLORS.whiteColor} />
                                    : speciallistData?.therapist_info?.[0]?.type == 'gold' ?
                                        <AntDesign name="star" size={WP(4.5)} color={COLORS.whiteColor} />
                                        : speciallistData?.therapist_info?.[0]?.type == 'diamond' ?
                                            <MatComIcons name="diamond" size={WP(4.5)} color={COLORS.whiteColor} />
                                            : null
                            }
                        </View>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={speciallistData?.reviews?.average_rating || 0}
                            starSize={FS(2.2)}
                            containerStyle={{ width: '48%', marginLeft: WP(2) }}
                        />
                        <Text style={{ paddingHorizontal: WP(1.5) }}>{speciallistData?.reviews?.average_rating || 0}</Text>
                        <Text>({speciallistData?.reviews?.total_ratings || 0})</Text>
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
            {
                selectedTab == 'Services' ?
                    <FlatList
                        data={speciallistData?.services[0]?.sub_services || []}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: WP(2), }}
                        renderItem={({ item, index }) => {
                            return (
                                <CollapsibleView
                                    noArrow={true}
                                    style={[styles.CollapsibleView, { backgroundColor: selected ? COLORS.grey : COLORS.whiteColor }]}
                                    title={<CollapsibleViewHeader item={item} />} >
                                    <View style={styles.CollapsibleViewContentContainer}>
                                        <Text style={styles.CollapsibleViewContent}>{item?.sub_service?.description || ''}</Text>
                                        <View style={styles.QuantityStyle}>
                                            <Text style={styles.headingText}>Quantity:</Text>
                                            <TouchableOpacity onPress={() => decrementQuantity(item?.sub_service?.id)} activeOpacity={0.7} style={[styles.box]}><Text style={styles.boxText}>-</Text></TouchableOpacity>
                                            <Text style={styles.Qty}>{item?.quantity}</Text>
                                            <TouchableOpacity onPress={() => incrementQuantity(item?.sub_service?.id)} activeOpacity={0.7} style={[styles.box]}><Text style={styles.boxText}>+</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={styles.headingText}>Price:</Text>
                                            <Text style={styles.price}>${Number(item?.price * serviceQuanity)}</Text>
                                        </View>
                                        <Button
                                            onPress={() => setSelected(!selected)}
                                            buttonStyle={[styles.buttonStyle, { backgroundColor: selected ? COLORS.whiteColor : COLORS.blackColor }]}
                                            textStyle={{ color: selected ? COLORS.blackColor : COLORS.whiteColor }}
                                            title={selected ? "Unselect" : 'Select'} />
                                    </View>
                                </CollapsibleView>

                            )
                        }}
                    /> :
                    selectedTab == 'Review' ?
                        <View />
                        : selectedTab == 'About' ?
                            <View style={styles.CollapsibleView}>
                                <Text>{speciallistData?.therapist_info?.[0]?.about || ''}</Text>
                            </View>
                            : selectedTab == 'Products' ?
                                <View />
                                : null
            }


            {
                selected &&
                <Button
                    onPress={toggleDateTimeModal}
                    buttonStyle={[styles.buttonStyle]}
                    title={"Next"} />
            }


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
        // backgroundColor: COLORS.whiteColor,
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