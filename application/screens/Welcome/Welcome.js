import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FS, HP, WP} from '../../theme/config';
import {IMAGES} from '../../constants/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppBar, Button} from '../../components';
import {_gotoBottomTabs, _gotoCreateAccount} from '../../navigation/navigationServcies';
export default function Welcome({navigation}) {
  const onPress = () => {
    _gotoCreateAccount(navigation);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <AppBar type={'dark'} backgroundColor={COLORS.primaryColor} />
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
                a relaxing massage.
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
    </SafeAreaView>
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
    lineHeight: 20,
    color: COLORS.blackColor,
    textAlign: 'center',
  },
  buttonStyle: {
    bottom: HP(4),
  },
});
