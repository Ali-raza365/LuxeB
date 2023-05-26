import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, Button } from '../../components';
import { _gotoBottomTabs } from '../../navigation/navigationServcies';
import { COLORS, FS, HP, WP } from '../../theme/config';


export default function PhoneNumber({ navigation }) {

  const [selectType, setselectType] = useState('Client')
  const onPress = () => {
    _gotoBottomTabs(navigation);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={styles.container}>
        <AppBar type={'dark'} backgroundColor={COLORS.primaryColor} />
        <View style={styles.backgroundImage}>
          <View style={styles.innerContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>What’s your phone number?</Text>
              <Text style={styles.desc}>
                Create An account and start browsing
              </Text>


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
    textAlign: "center",
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

});
