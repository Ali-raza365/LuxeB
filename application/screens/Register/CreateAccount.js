import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button } from '../../components';
import { _gotoBottomTabs, _gotophoneNumber } from '../../navigation/navigationServcies';
import { COLORS, FS, HP, WP } from '../../theme/config';
import AntDesign from 'react-native-vector-icons/AntDesign'


export default function CreateAccount({ navigation }) {

    const [selectType, setselectType] = useState('Client')
    const onPress = () => {
        navigation.navigate('phoneNumber')
        // _gotoBottomTabs(navigation);
    };
    const AccountTypes = [{ name: "Client" }, { name: "Therapist" }]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <View style={styles.container}>
                <AppBar type={'dark'} backgroundColor={COLORS.primaryColor} />
                <View style={styles.backgroundImage}>
                    <View style={styles.innerContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Who you are?</Text>
                            <Text style={styles.desc}>
                                Create an account by choosing your type
                            </Text>


                            <View style={styles.outerContainer}>
                                {AccountTypes.map((item, index) => (
                                    <TouchableOpacity onPress={() => { setselectType(item?.name) }} key={index} style={[styles.boxContainer, { backgroundColor: selectType == item?.name ? '#D9D9D9' : COLORS.whiteColor }]}>
                                        <AntDesign name='checkcircle' color={selectType == item?.name ? COLORS.blackColor : '#D9D9D9'} style={styles.checkCircle} size={FS(3)} />
                                        <Text style={styles.Iamm}>I am a</Text>
                                        <Text style={styles.type}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <Button
                            title="Continue"
                            onPress={onPress}
                            buttonStyle={styles.buttonStyle}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
    backgroundImage: {
        display: 'flex',
        width: WP(100),
        flex: 1,
    },
    innerContainer: {
        display: 'flex',
        width: WP(100),
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: WP(7),
        paddingTop: HP(6),
    },
    heading: {
        fontWeight: '600',
        color: COLORS.blackColor,
        fontSize: FS(3.5),
    },
    desc: {
        paddingTop: HP(1),
        fontSize: FS(2.2),
        fontWeight: '500',
        width: WP(55),
        alignSelf: "center",
        lineHeight: 20,
        color: COLORS.blackColor,
        textAlign: 'center',
    },
    buttonStyle: {
        bottom: HP(4),
    },
    outerContainer: {
        marginTop: HP(7),
        display: "flex",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    boxContainer: {
        width: WP(45),
        height: HP(30),
        justifyContent: "flex-end",
        alignItems: "center",
        marginLeft: WP(2.5),
        paddingBottom: HP(3),
    },
    checkCircle: {
        position: "absolute",
        top: WP(3.6),
        right: WP(4),
    },
    Iamm: {
        fontSize: FS(1.4),
        fontWeight: "500",
        color:COLORS.darkGrey,
    },
    type: {
        fontSize: FS(2.4),
        fontWeight: "600",
        color:COLORS.blackColor,

    },
});
