import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, HP, WP } from '../theme/config'

export default function CardBox({ data, onPress }) {
    return (
        <View style={Styles._mainContainer}>
            <Text style={Styles._subHeading} >It’s time to bloom!</Text>
            <Text style={Styles._heading} >Art of make up</Text>
            <Text style={Styles._detail} >Valentine’s Week only</Text>
            <View style={Styles._chip}>
                <Text style={Styles._discount}>50%</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        width: WP(90),
        height: HP(23),
        overflow: "hidden",
        backgroundColor:'rgba(0,0,0,0.2)',
        // margin: WP(1),
        // borderWidth: 1,
        // marginHorizontal: 10,
        padding: WP(7),
    },
    _subHeading: {
        fontWeight: "300",
        fontSize: 12,
        lineHeight: 18,
        color: "#FFFFFFFF"
    },
    _heading: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff"
    },
    _detail: {
        paddingTop: 10,
        color: "#FFC3AF",
        fontSize: 11,
        fontWeight: '400',
    },
    _chip: {
        backgroundColor: "#151515",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 30,
        width: 70,
        position: "absolute",
        bottom: WP(4),
        left: WP(4),

    },
    _discount: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 20,
    },


})