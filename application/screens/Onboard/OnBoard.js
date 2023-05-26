import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';

// import { _gotoAuthStack ,_gotoHomeNavigator } from '../../navigation/NavigationService';
import {
  COLORS,
  TEXT_SIZES,
  FONT,
  FONTS,
  MOBILE_WIDTH,
  ONBOARD_DATA,
  SPACING_PERCENT,
  WP,
  HP,
  RADIUS,
  FS,
} from '../../theme/config';
import {AppBar} from '../../components';
import {
  _gotoOnboard,
  _gotoWelcomeScr,
} from '../../navigation/navigationServcies';
// import { _setItem } from '../../utils/async';

const Onboard = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, MOBILE_WIDTH + SPACING_PERCENT * 2);
  const flatListRef = useRef(null);

  //On Skip Click
  const _onSkipClick = () => {
    _gotoWelcomeScr(navigation);
    // _setItem('onboard', '1')
    //     .then(() => {
    //         _gotoHomeNavigator(navigation);
    //     })
    //     .catch((err) => {
    //         alert(err);
    //     })
  };
  const _onNextClick = index => {
    if (index == 1) {
      _gotoWelcomeScr(navigation);
    } else {
      flatListRef.current.scrollToIndex({index: index + 1});
    }
  };

  return (
    <View style={Styles._mainContainer}>
      <AppBar type="dark" backgroundColor={COLORS.whiteColor} hidden={true} />

      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        snapToInterval={WP(100)}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        style={{flexGrow: 0}}
        contentContainerStyle={Styles._scrollContainer}
        data={ONBOARD_DATA}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * WP(100),
            index * WP(100),
            (index + 1) * WP(100),
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [WP(100), 0, -WP(100)],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });

          return (
            <ImageBackground
              resizeMode="cover"
              source={item.image}
              style={[Styles._image]}>
              <View style={Styles._contentContainer}>
                <View style={Styles.hr}>
                  <View style={Styles.line}></View>
                </View>
                <Animated.Text
                  style={[Styles._title, {transform: [{translateX}]}]}>
                  {item.title}
                </Animated.Text>
                <Animated.Text
                  style={[Styles._text, {transform: [{translateX}]}]}>
                  {item.text}
                </Animated.Text>
                <View style={Styles._btnContainer}>
                  {/* Skip Button */}
                  <TouchableOpacity
                    onPress={() => {
                      _onSkipClick();
                    }}
                    style={Styles._skipBtn}>
                    <Text style={Styles._skipText}>Skip</Text>
                  </TouchableOpacity>

                  {/* Skip Button */}
                  <TouchableOpacity
                    onPress={() => {
                      _onNextClick(index);
                    }}
                    style={Styles._NextBtn}>
                    <Text style={Styles._NextText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  _mainContainer: {
    flex: 1,
  },
  _scrollContainer: {
    // width:WP(100),
    // height:HP(100),
    // flex:1
  },
  _skipBtn: {},
  _skipText: {
    color: COLORS.whiteColor,
    fontWeight: '500',
    fontSize: WP(TEXT_SIZES.info_1),
  },
  _itemContainer: {
    width: WP(100),
    height: HP(100),
    padding: WP(SPACING_PERCENT),
    justifyContent: 'center',
  },
  _image: {
    width: WP(100),
    height: HP(100),
  },
  _contentContainer: {
    position: 'absolute',
    padding: WP(7),
    bottom: 0,
    left: 0,
    width: WP(100),
    height: HP(40),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  _title: {
    paddingTop: HP(6),
    fontFamily: FONT,
    fontSize: FS(3.7),
    color: COLORS.whiteColor,
    fontWeight: '600',
    lineHeight: 28,
  },
  _text: {
    marginTop: HP(3),
    fontSize: WP(4),
    color: COLORS.whiteColor,
    fontWeight: '400',
  },
  hr: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: WP(45),
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.17)',
    borderRadius: WP(50),
  },
  line: {
    width: WP(15),
    height: 4,
    backgroundColor: COLORS.primaryColor,
    borderRadius: WP(50),
  },
  _btnContainer: {
    marginTop: HP(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  _NextBtn: {
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: WP(5),
    paddingVertical: HP(1.2),
  },
  _NextText: {
    color: COLORS.blackColor,
    fontWeight: '600',
  },
});

export default Onboard;
