import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button } from '../../components';
import { COLORS, FS, HP, WP } from '../../theme/config';
import { IMAGES } from '../../constants/ImagePath';

export default function AskForLocation({ navigation }) {
    const onPress = () => {
        navigation.navigate('gender');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <AppBar type={'dark'} backgroundColor={COLORS.primaryColor} />

            <View style={styles.container}>
                <View style={styles.mainStyle}>
                    <View style={styles.innerContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Enable Location Permission</Text>
                            <Text style={styles.desc}>
                                We will need your location to give you better experience.
                            </Text>
                        </View>
                        <View>
                            <Image style={styles.imageStyle} source={IMAGES.compass} />
                        </View>
                    </View>

                </View>
                <View style={{ justifyContent: "flex-end", flex: 0.2 }}>
                    <Button
                        title="Sure, Let’s do it"
                        onPress={onPress}
                        textStyle={{ color: COLORS.whiteColor }}
                        buttonStyle={{ marginBottom: HP(1) }}
                    />
                    <Button
                        title="May be Later"
                        textStyle={{ color: COLORS.blackColor }}
                        onPress={onPress}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: HP(100),
        backgroundColor: '#f5f5f5',
    },
    mainStyle: {
        display: 'flex',
        width: WP(100),
        flex: 0.8
    },
    innerContainer: {
        display: 'flex',
        width: WP(100),
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: WP(7),
        paddingTop: HP(6),
        marginBottom: HP(1.5),
    },
    heading: {
        fontWeight: '600',
        textAlign: 'center',
        color: COLORS.blackColor,
        fontSize: FS(3.5),
    },
    desc: {
        paddingTop: HP(1),
        fontSize: FS(2),
        fontWeight: '500',
        width: WP(55),
        alignSelf: 'center',
        lineHeight: 20,
        color: COLORS.blackColor,
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: COLORS.whiteColor,
        color: COLORS.blackColor,
        borderWidth: 0.8,
        borderColor: COLORS.blackColor,
    },
    imageStyle: {
        width: WP(50),
        height: WP(50),
    },
});
