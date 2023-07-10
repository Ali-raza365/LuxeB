import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FS, HP, WP } from '../../theme/config'
import { _gotoAskForLocation, _gotoBottomTabs, _gotoOnboard, _gotoWelcomeScr } from '../../navigation/navigationServcies'
import { AppBar } from '../../components'
import { getItem } from '../../utils/axios'
import actions from '../../store/actions'

export default function Splash({ navigation }) {

    useEffect(() => {
        setTimeout(async () => {
            try {
                await getItem('token')
                    .then(async (value) => {
                        if (value) {
                            await actions.checkUserStatus(navigation)
                        } else {
                            await getItem('onboard')
                                .then(async (value) => {
                                    if (value == '1')
                                        _gotoWelcomeScr(navigation);
                                    else {
                                        _gotoOnboard(navigation);
                                    }
                                })
                        }
                    })
            } catch (error) {
                console.log('splash error', error)
            }

            // _gotoBottomTabs(navigation);

        }, 1000)
    }, [])
    return (
        <View style={styles.container}>
            <AppBar type={'dark'} backgroundColor={COLORS.primaryColor} />
            <Text style={styles.headerText} >L U X E B E A U T Y</Text>
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