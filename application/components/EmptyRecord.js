import React from 'react'
import { StyleSheet, Text, ScrollView, RefreshControl, Image, } from 'react-native';
import { IMAGES, FONT, TEXT_SIZES, WP, HP, COLORS, SPACING_PERCENT } from '../theme/config';

const EmptyRecord = ({ loading, onRefreshFun }) => {
    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: HP(50),
            }}

            refreshControl={
                onRefreshFun ? <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefreshFun}
                />
                    : null
            }
        >
            <Image
                source={{uri:"https://www.reshot.com/preview-assets/illustrations/TW3X8BGDME/no-results-found-TW3X8BGDME-w1600.jpg"}}
                style={{
                    width: WP('90%'),
                    height: WP('50%'),
                    resizeMode: 'contain',
                    zIndex: 0,
                }}
            />
            <Text style={{
                fontFamily: FONT,
                fontSize: WP(TEXT_SIZES.info_1),
                color: COLORS.blackColor,
                marginTop: WP(SPACING_PERCENT)
            }}
            >
                NO Record Found!
            </Text>
        </ScrollView>
    )
}

export default EmptyRecord

const styles = StyleSheet.create({})