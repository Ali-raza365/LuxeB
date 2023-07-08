import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, HP, WP } from '../theme/config';
import Button from './Button';
import LabelInput from './LabelInput';

export default function BottomSheetInput({ lable, isVisible, onCloseModal, onPressItem }) {

    const [inputValue, setinputValue] = useState('')
    return (
        <Modal
            isVisible={isVisible}
            style={Styles._modal}
            onBackButtonPress={onCloseModal}
            onBackdropPress={onCloseModal}
            avoidKeyboard
        >
            <View style={[Styles._modalMain, {}]}>
                {/* <View style={Styles.dashView} /> */}
                {lable && <Text style={Styles._lable} >{lable}</Text>}
                <View style={Styles.detailSty} >
                    <LabelInput
                        value={inputValue}
                        containerStyle={Styles.InputContainer}
                        placeholder={lable}
                        onChangeText={(val) => setinputValue(val)}
                    />

                </View>
                <Button
                    onPress={() => { onPressItem(inputValue),onCloseModal() }}
                    buttonStyle={{ alignSelf: 'center', }}
                    title={"Save"} />
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
        height: HP(38),
        backgroundColor: COLORS.whiteColor,
        paddingTop: WP(5),
        borderTopRightRadius: WP(5),
        borderTopLeftRadius: WP(5),
    },
    _lable: {
        padding: WP(5),
        paddingVertical: WP(1),
        fontSize: WP(5),
        color: '#000',
        fontWeight: "bold",
        letterSpacing: 1,
        width: '80%',

    },
    dashView: {
        width: WP(10),
        borderWidth: 1.5,
        borderColor: COLORS.gray500,
        alignSelf: 'center'
    },
    detailSty: {
        width: '95%',
        alignSelf: 'center',
        // backgroundColor: 'cyan'
    },
    titleSty: {
        fontSize: WP(4.5),
        color: COLORS.blackColor,
        // fontWeight: "600",
        letterSpacing: 1,
    },
    InputContainer: {
        width: '95%',
        padding: WP(2),
        margin: WP(2),
        marginVertical: WP(1),
        // backgroundColor: "#DDDDDD",
        // borderRadius: WP(2.5),
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 1,
    },

    textSty: {
        fontSize: WP(3),
        color: COLORS.darkGrey,
        letterSpacing: 1,
    },


})