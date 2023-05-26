import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, WP } from '../theme/config'

const Button = ({ title, onPress, buttonStyle, textStyle }) => {
    return (
        <>
            <TouchableOpacity style={[styles.BtnContainer, buttonStyle]} onPress={onPress}>
                <Text style={[styles.BtnText, textStyle]}>{title}</Text>
            </TouchableOpacity>
        </>

    )
}

export default Button

const styles = StyleSheet.create({
    BtnContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: WP(80),
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: COLORS.blackColor,
    },
    BtnText: {
        color: COLORS.whiteColor,
        fontWeight: '600'

    }
})