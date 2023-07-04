
import { FlatList, Image, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppBar } from '../../components'
import { COLORS, HP, WP } from '../../theme/config'
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux';
import actions from '../../store/actions';
import { API_BASE_URL } from '../../api/apis';

const ServiceDetail = ({ navigation }) => {

    const [filterValue, setFilterValue] = useState("")
    const therapistData = useSelector(store => store.service.therapistsList);
    const service = useSelector(store => store.service.selectedService);

    const filterArray = [
        { name: "Silver", icon: (<AntDesign name="heart" size={WP(4)} color={COLORS.whiteColor} />) },
        { name: "Gold", icon: (<AntDesign name="star" size={WP(4)} color={COLORS.whiteColor} />) },
        { name: "Diamond", icon: (<MatComIcons name="diamond" size={WP(4)} color={COLORS.whiteColor} />) },
    ];


    console.log()

    const timeArr = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"]

    const onFilterTabClik = async (type) => {
        try {
            setFilterValue(type)
            await actions.onServiceSelect(service, navigation, type?.toLowerCase())
        } catch (error) {
            console.log("error riased in on services api", error)
        }
    }

    const onSpeciallistClick = async (item) => {

        try {
            await actions.onSpeciallistClick(item, navigation)
        } catch (error) {
            console.log("error riased in on Speciallist detail api", error)
            alert(error?.message)
        }
    }

    let SpeciallistArr = [
        {
            "id": 8,
            "username": "faraz",
            "therapist_info": [
                {
                    "type": "silver",
                    "about": "lorem ipusm dolor dummy text"
                }
            ],
            "profile_image": "/media/profile_images/Original-9.png",
            "is_therapist": true,
            "services": [
                {
                    "services-1": "Facial"
                },
                {
                    "services-2": "Tanning"
                }
            ],
            "reviews": {
                "average_rating": 4.5,
                "total_ratings": 2
            },
            "availability": [
                {
                    "date": "2023-06-17",
                    "time_slots": [

                    ]
                }
            ]
        },
        {
            "id": 10,
            "username": "tariq",
            "therapist_info": [
                {
                    "type": "silver",
                    "about": "lorem"
                }
            ],
            "profile_image": "/media/profile_images/Original-9_w6C5Emo.png",
            "is_therapist": true,
            "services": [
                {
                    "services-1": "Facial"
                }
            ],
            "reviews": {
                "average_rating": null,
                "total_ratings": 0
            },
            "availability": [
                {
                    "date": "2023-06-17",
                    "time_slots": [
                        {
                            "id": 9,
                            "time_slot": "09:00"
                        },
                        {
                            "id": 10,
                            "time_slot": "10:00"
                        }
                    ]
                }
            ]
        },
        {
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
                    "services-1": "Facial"
                }
            ],
            "reviews": {
                "average_rating": 3.0,
                "total_ratings": 1
            },
            "availability": [
                {
                    "date": "2023-06-17",
                    "time_slots": [
                        {
                            "id": 7,
                            "time_slot": "09:00"
                        },
                        {
                            "id": 8,
                            "time_slot": "10:00"
                        }
                    ]
                }
            ]
        },
        {
            "id": 8,
            "username": "faraz",
            "therapist_info": [
                {
                    "type": "silver",
                    "about": "lorem ipusm dolor dummy text"
                }
            ],
            "profile_image": "/media/profile_images/Original-9.png",
            "is_therapist": true,
            "services": [
                {
                    "services-1": "Facial"
                },
                {
                    "services-2": "Tanning"
                }
            ],
            "reviews": {
                "average_rating": 4.5,
                "total_ratings": 2
            },
            "availability": [
                {
                    "date": "2023-06-17",
                    "time_slots": [

                    ]
                }
            ]
        },
        {
            "id": 10,
            "username": "tariq",
            "therapist_info": [
                {
                    "type": "silver",
                    "about": "lorem"
                }
            ],
            "profile_image": "/media/profile_images/Original-9_w6C5Emo.png",
            "is_therapist": true,
            "services": [
                {
                    "services-1": "Facial"
                }
            ],
            "reviews": {
                "average_rating": null,
                "total_ratings": 0
            },
            "availability": [
                {
                    "date": "2023-06-17",
                    "time_slots": [
                        {
                            "id": 9,
                            "time_slot": "09:00"
                        },
                        {
                            "id": 10,
                            "time_slot": "10:00"
                        }
                    ]
                }
            ]
        }
    ]

    const renderItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => onSpeciallistClick(item)} style={styles.listContainer}>
                <View style={styles.listTopView}>
                    <View style={styles.listLeftView}>
                        <View style={styles.listHeaderContainer}>
                            <Text style={styles.listHeading}>{item?.username || ''}</Text>
                            <View style={styles._circleView}>
                                {
                                    item?.therapist_info?.[0]?.type == 'silver' ?
                                        <AntDesign name="heart" size={WP(4)} color={COLORS.whiteColor} />
                                        : item?.therapist_info?.[0]?.type == 'gold' ?
                                            <AntDesign name="star" size={WP(4)} color={COLORS.whiteColor} />
                                            : <MatComIcons name="diamond" size={WP(4)} color={COLORS.whiteColor} />
                                }
                            </View>
                        </View>
                        <Text style={styles.listText} >Makeup • Facial • Hair</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={item?.reviews?.average_rating || 0}
                                starSize={WP(5)}
                                containerStyle={{ width: '50%' }}
                            />
                            <Text style={{ paddingHorizontal: WP(1.5) }}>{item?.reviews?.average_rating || 0}</Text>
                            <Text>({item?.reviews?.total_ratings || 0})</Text>
                        </View>
                    </View>
                    <View style={styles.listRightView}>
                        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: API_BASE_URL + item?.profile_image || '' }} />
                    </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listBottomView}>
                    {
                        item?.availability?.[0]?.time_slots.map((item, index) => {
                            return (
                                <Pressable key={index}
                                    // onPress={() => setFilterValue(item.name)}
                                    style={[styles.TimeView, { backgroundColor: filterValue == item?.time_slot ? COLORS.primaryColor : COLORS.whiteColor }]}
                                >
                                    <Text style={styles.TimeTextSty}>{item.time_slot}</Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
            </Pressable>
        )
    }

    return (
        <View style={styles._container}>
            <AppBar type='light' backgroundColor={COLORS.blackColor} />

            {/* filter */}
            <View style={styles.filterContainer}>
                {
                    filterArray.map((item, index) => {
                        return (
                            <Pressable key={index}
                                onPress={() => onFilterTabClik(item.name)}
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
                    data={therapistData || []}
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
        // alignItems: 'center',
        // justifyContent: 'center',
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
        paddingHorizontal: WP(2),
        color: COLORS.blackColor
    }
})