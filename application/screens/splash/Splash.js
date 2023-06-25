import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FS, HP, WP } from '../../theme/config'
import { _gotoBottomTabs, _gotoOnboard } from '../../navigation/navigationServcies'
import { AppBar } from '../../components'

export default function Splash({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            // _gotoOnboard(navigation)
            _gotoBottomTabs(navigation);

        }, 1000)
    }, [])
    return (
        <View style={styles.container}>
            <AppBar type={'dark'} backgroundColor={COLORS.primaryColor} /> 
            <Text style={styles.headerText} >U B E A U T Y</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WP(100),
        height: HP(100),
        display: 'flex',
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: COLORS.primaryColor
    },
    headerText: {
        textAlign: "center",
        fontSize: FS(4),
        fontWeight: '300',
        letterSpacing: 3,
        color: "#000"
    }
})