import React from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    I18nManager,
} from 'react-native';
import { COLORS, FONT, HP, INPUT_HEIGHT, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../theme/config';

const LabelInput = ({ label, placeholder, value, onChangeText, editable, stric, edit, width, inputStyle, containerStyle, keyboard }) => {
    return (
        <View style={containerStyle}>
            {label && <Text style={Styles._label}>{label} {stric ? "*" : ''}</Text>}
            <TextInput
                selectionColor={COLORS.secondaryColor}
                editable={editable || edit}
                placeholder={placeholder}
                placeholderTextColor={COLORS.darkGrey}
                // maxLength={13}
                value={value}
                keyboardType={keyboard == 'default' || keyboard == null || keyboard == undefined ? 'default' : 'number-pad'}
                onChangeText={onChangeText}
                style={[Styles._inputStyle, { width: width, backgroundColor: editable == false ? COLORS.primaryColor : COLORS.whiteColor, color: editable == false ? COLORS.whiteColor : COLORS.blackColor }, inputStyle,]}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    _inputStyle: {
        height: HP(INPUT_HEIGHT),
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        //color: COLORS.blackColor,
        borderWidth: 1,
        borderColor: COLORS.blackColor,
        // borderRadius: WP(RADIUS),
        paddingHorizontal: WP(SPACING_PERCENT),
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    _label: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
        marginBottom: WP(SPACING_PERCENT / 2),
        textAlign: 'left',
        fontWeight: '600',
    },
});

export default LabelInput;