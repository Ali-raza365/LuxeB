import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AppBar, Button } from '../../components';
import { IMAGES } from '../../constants/ImagePath';
import { _gotophoneNumber } from '../../navigation/navigationServcies';
import { COLORS, FONT_BOLD, FS, HP, WP } from '../../theme/config';
export default function Welcome({ navigation }) {
    const onPress = () => {
        _gotophoneNumber(navigation);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <AppBar type={'dark'} backgroundColor={'#E7E1DE'} />
                <ImageBackground
                    source={IMAGES.welcome}
                    style={styles.backgroundImage}
                    resizeMode="cover">
                    <View style={styles.innerContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Welcome!</Text>
                            <Text style={styles.desc}>
                                {' '}
                                Find a new stylist, book last-minute nails, or teat yourself to
                                a relaxing {'\n'} massage.
                            </Text>
                        </View>
                        <Button
                            title="Get Started"
                            onPress={onPress}
                            buttonStyle={styles.buttonStyle}
                        />
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingTop: HP(12),
    },
    heading: {
        fontWeight: '700',
        color: COLORS.blackColor,
        fontSize: FS(3.5),
        fontFamily:FONT_BOLD,
    },
    desc: {
        paddingTop: HP(2),
        fontSize: FS(2.2),
        fontWeight: '500',
        lineHeight: 20,
        color: COLORS.blackColor,
        textAlign: 'center',
    },
    buttonStyle: {
        bottom: HP(4),
    },
});
