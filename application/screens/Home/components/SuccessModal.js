import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal"
import { Button } from '../../../components'
import { IMAGES } from '../../../constants/ImagePath'
import { COLORS, FONT_SEMIBOLD, FS, SPACING_PERCENT, WP } from '../../../theme/config'
import { _gotoBookingTabs } from '../../../navigation/navigationServcies'

export default function SuccessModal({ isVisible, onClose }) {

    const navigation = useNavigation()

    return (
        <Modal
            isVisible={isVisible}
            style={Styles._modal}
        >
            <View style={Styles._modalMain}>
                <View style={Styles.dashView} />
                <View style={Styles.detailSty} >
                    <Image source={IMAGES.check} resizeMode='contain' style={{ width: WP(20), height: WP(20) }} />
                    <Text style={Styles._lable} >Your Appointment {'\n'}Booked Successfully</Text>
                </View>

                <View style={Styles._calendarContainer}>
                    <Button
                        onPress={() => { _gotoBookingTabs(navigation) }}
                        buttonStyle={{ alignSelf: 'center', }}
                        title={"View Appointments"} />
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
        height: '35%',
        backgroundColor: COLORS.whiteColor,
        padding: WP(5)
    },
    _iconMain: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: WP(3)
    },
    detailSty: {
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: WP(4),
        // backgroundColor: 'cyan'
    },
    _lable: {
        paddingVertical: WP(2),
        fontWeight: '600',
        textAlign: "center",
        fontSize: FS(2.8),
        fontFamily: FONT_SEMIBOLD,
        color: COLORS.blackColor,
        lineHeight: 32,
        letterSpacing: 1,
    },
    dashView: {
        width: WP(10),
        borderWidth: 1.5,
        borderColor: COLORS.gray500,
        alignSelf: 'center'
    },
    _calendarView: {
        marginTop: WP(5),
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WP(SPACING_PERCENT)
    },
    titleSty: {
        fontSize: WP(4.5),
        color: COLORS.blackColor,
        fontWeight: "600",
        letterSpacing: 1,
        paddingBottom: WP(1.5)
    },

    textSty: {
        fontSize: WP(3.2),
        color: COLORS.blackColor,
        letterSpacing: 1,
    },

})