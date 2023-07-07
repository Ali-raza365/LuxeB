import React, { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { COLORS, DAYS, HP, SPACING_PERCENT, TEXT_SIZES, WP } from '../../../theme/config'
import { _formatDate, getFullMonthName, isCurrentDate } from '../../../utils/TimeFunctions'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Button } from '../../../components'
import { useNavigation } from '@react-navigation/native'
import actions from '../../../store/actions'

export default function DateTimeModal({ timeSlot, therapist, isVisible, onBackButtonPress, onBackdropPress }) {

    const navigation = useNavigation()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookingDate, setBookingDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false)
    const [dates, setDates] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(timeSlot || '')
    const timeArr = ["7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00"];

    function getMonthDates(d) {

        const year = d.getFullYear();
        const month = d.getMonth();
        const date = new Date(year, month, 1);
        const dates = [];

        while (date.getMonth() === month) {
            const dayIndex = date.getDate();
            const dateString = new Date(date);

            // console.log('main', _formatDate(dateString), _formatDate(Data?.[0]?._id?.transactionDate))

            if (date.getDate() == 1) {
                const prevDate = new Date(year, month, 1);
                prevDate.setDate(prevDate.getDate() - date.getDay());
                for (let i = 0; i < date.getDay(); i++) {
                    dates.push({
                        date: new Date(prevDate),
                        dayIndex: prevDate.getDate(),
                        prevMonth: true,
                    });
                    prevDate.setDate(prevDate.getDate() + 1);
                }
            }
            dates.push({
                date: dateString,
                dayIndex,
            });
            date.setDate(date.getDate() + 1);
        }
        setDates(dates)
    }

    const incrementDate = () => {
        const date = new Date(selectedDate);
        date.setMonth(date.getMonth() + 1);
        setSelectedDate(date)
    }
    const decrementDate = () => {
        const date = new Date(selectedDate);
        date.setMonth(date.getMonth() - 1);
        setSelectedDate(date)
    }

    useEffect(() => {
        onSelectBookingDate(new Date())
    }, [])


    const onSelectBookingDate = async (date) => {
        try {
            setLoading(true)
            let detail = {
                therapist_id: therapist?.id,
                date: _formatDate(date)
            }
            let response = await actions.getTherapistAvailability(detail)
            if (response?.message) {
                Alert.alert(response?.message)
            } else if (response) {
                setLoading(false)
                setSelectedDate(date);
                setBookingDate(date);
                setTimeSlots(response?.[0]?.time_slots || [])
            }

        } catch (error) {
            setLoading(false)
            Alert.alert(error?.message)
        }

    }

    useEffect(() => {
        getMonthDates(new Date)
    }, [selectedDate])

    return (
        <Modal
            isVisible={isVisible}
            style={Styles._modal}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}
        >
            <View style={Styles._modalMain}>
                <View style={Styles.dashView} />
                <Text style={Styles._lable} >What’s your favorite time for treatment?</Text>
                <View style={Styles._calendarContainer}>

                    <View style={Styles._calendarHeaaderContainer}>
                        <Pressable style={Styles._calendarBtn}>
                            <Text style={{ color: COLORS.whiteColor, fontSize: WP(4), fontWeight: '700', paddingRight: WP(3) }} >{getFullMonthName(selectedDate)} {selectedDate.getFullYear()}</Text>
                            <FontAwesome name="caret-down" size={WP(5)} color={COLORS.whiteColor} />
                        </Pressable>
                        <View style={Styles._calendarNexts}>
                            <Feather onPress={decrementDate} name="chevron-left" size={WP(7)} color={COLORS.gary300} />
                            <Feather onPress={incrementDate} name="chevron-right" size={WP(7)} color={COLORS.gary300} />
                        </View>
                    </View>

                    <View style={Styles._calendarView}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }}>
                            {
                                DAYS.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={{ width: '14.2%', padding: WP(2), alignItems: 'center', }}>
                                            <Text numberOfLines={1} style={{ fontSize: WP(3), fontWeight: '500' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        {
                            dates.map((item, index) => {
                                if (!item?.prevMonth) {
                                    // const currDate = _formatDate(selectedDate)
                                    // const calDate = _formatDate(item?.formattedDate)

                                    // console.log(currDate,calDate , currDate==calDate)
                                    let checkDateIsSelected = bookingDate && bookingDate?.getDate() == item.dayIndex;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => { onSelectBookingDate(item.date) }}
                                            style={[Styles.CalBtnStyle, { backgroundColor: checkDateIsSelected ? COLORS.blackColor : COLORS.whiteColor }]}
                                        >
                                            <Text numberOfLines={1} style={[Styles.DateCountSty, { color: checkDateIsSelected ? COLORS.whiteColor : COLORS.blackColor }]}>{item?.dayIndex || ''}</Text>
                                        </TouchableOpacity>
                                    )
                                } else {
                                    return <View key={index} style={Styles.emptyView} />
                                }
                            })
                        }
                    </View>


                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginVertical: WP(3) }}
                    >
                        {
                            bookingDate && timeSlots.length != 0 && timeSlots?.map((item, index) => {
                                return <Text key={index}
                                    onPress={() => setSelectedSlot(item.time_slot)}
                                    style={{
                                        padding: WP(1.5),
                                        paddingHorizontal: WP(3),
                                        marginLeft: WP(2),
                                        borderWidth: 1,
                                        fontSize: WP(4.2),
                                        fontWeight: '600',
                                        backgroundColor: item?.time_slot == selectedSlot ? COLORS.blackColor : COLORS.whiteColor,
                                        color: item?.time_slot == selectedSlot ? COLORS.whiteColor : COLORS.blackColor,
                                        letterSpacing: 1,
                                        borderColor: COLORS.blackColor
                                    }}
                                >{item?.time_slot}</Text>
                            })
                        }
                    </ScrollView>


                    <Button
                        onPress={() => { onBackButtonPress(); navigation.push('checkout') }}
                        buttonStyle={{ alignSelf: 'center' }}
                        title={"Next"} />
                </View>
            </View>
        </Modal>
    )
}

const Styles = StyleSheet.create({
    _modal: {
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 0,
        padding: 0
    },
    _modalMain: {
        width: WP(100),
        height: HP(70),
        backgroundColor: COLORS.whiteColor,
        // borderTopRightRadius: WP(3),
        // borderTopLeftRadius: WP(3),
        // flexDirection: "row",
        // alignItems: "center",
        padding: WP(5)
    },
    _iconMain: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: WP(3)
    },
    _lable: {
        paddingVertical: WP(4),
        fontSize: WP(5),
        color: COLORS.blackColor,
        fontWeight: "bold",
        letterSpacing: 1,
        width: '80%'
    },
    dashView: {
        width: WP(10),
        borderWidth: 1.5,
        borderColor: COLORS.gray500,
        alignSelf: 'center'
    },
    _calendarContainer: {

    },

    _calendarHeaaderContainer: {
        width: '100%',
        backgroundColor: COLORS.whiteColor,
        padding: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    _calendarBtn: {
        // minWidth: '40%',
        paddingHorizontal: WP(2),
        height: HP(4.5),
        backgroundColor: COLORS.blackColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    _calendarNexts: {
        minWidth: '20%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    _calendarView: {
        marginTop: WP(5),
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
    },

    CalBtnStyle: {
        width: '14.2%',
        height: WP(10),
        alignItems: 'center',
        justifyContent: 'center',

    },
    emptyView: {
        width: '14.2%',
        height: WP(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    DateCountSty: {
        fontSize: WP(TEXT_SIZES.info_2),
        paddingLeft: 2,

    },
})