import { StyleSheet, View, Image, useWindowDimensions, ImageBackground, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
} from 'react-native-reanimated';
import CardBox from './CardBox';
import { HP } from '../theme/config';
import { API_BASE_URL } from '../api/apis';
const ImageCarousel = ({ data, autoPlay, }) => {
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const [newData] = useState([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' },
    ]);
    const { width } = useWindowDimensions();
    const SIZE = width * 0.85;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
        if (isAutoPlay === true) {
            let _offSet = offSet.value;
            interval.current = setInterval(() => {
                if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
                    _offSet = 0;
                } else {
                    _offSet = Math.floor(_offSet + SIZE);
                }
                scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
            }, 2000);
        } else {
            clearInterval(interval.current);
        }
    }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

    return (
        <View>
            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                }}
                onMomentumScrollEnd={e => {
                    offSet.value = e.nativeEvent.contentOffset.x;
                    setIsAutoPlay(autoPlay);
                }}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={SIZE}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}>
                {newData.map((item, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.88, 1, 0.88],
                        );
                        return {
                            transform: [{ scale }],
                        };
                    });
                    if (!item.image) {
                        return <View style={{ width: SPACER, }} key={index} />;
                    }
                    return (
                        <View style={{ width: SIZE, }} key={index}>
                            <Animated.View style={[styles.imageContainer, style]}>
                                <ImageBackground source={{ uri: API_BASE_URL + item.image }} style={styles.image} >
                                    <CardBox
                                        onPress={() => { navigation.navigate("eventdetail", { detail: item }) }}
                                        showsHorizontalScrollIndicator={false}
                                        data={item}
                                    />
                                </ImageBackground>
                            </Animated.View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
};

export default ImageCarousel;

const styles = StyleSheet.create({
    imageContainer: {
        // borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: 'pink',
        height: HP(23),

    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 16 / 9,
    },
});