import React from 'react';
import {
    Platform,
    Dimensions,
    useWindowDimensions,
} from 'react-native';
// import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { IMAGES } from '../constants/ImagePath';

//CONSTANTS USED IN APP
export const APP_NAME = 'luxeB';
export const PLATFORM = Platform.OS;
export const isIOS = Platform.OS == 'ios' ? true : false;
export const WP = responsiveWidth;
export const HP = responsiveHeight;
export const FS = responsiveFontSize;
export const MOBILE_WIDTH = Dimensions.get('window').width;
export const MOBILE_HEIGHT = Dimensions.get('window').height;
export const RADIUS = 3;
export const SPACING = 12;
export const SPINNER_SIZE = 32;
export const FONT = null;
export const FONT_BOLD = null;
export const FONT_MEDIUM = null;
export const FONT_LIGHT = null;
export const FONT_SEMIBOLD = null;
export const BUTTON_HEIGHT = 5;
export const INPUT_HEIGHT = 6;
export const SCREEN_ICON_SIZE = 6;
export const HOME_TAB_ICON_SIZE = 6;
export const TAB_ICON_SIZE = 6;

//COLORS USED IN APPLICATION
export const COLORS = {
    primaryColor: '#F6EAE6',
    secondaryColor: '#414260',
    primaryRGB: 'rgba(90,44,102,',
    territoryColor: '#9D4DB3',
    primaryColor2: '#9E2654',
    secondaryColor2: '#BC2E65',
    territoryColor2: '#D34D80',
    lightGrey: '#757575',
    gary300:'#555555',
    gray500: "#ABABAB", // gray text color
    darkGrey: '#7E7E7E',
    grey: 'rgba(192, 192, 192, 0.3)',
    blackColor: '#151515',
    whiteColor: '#ffffff',
    borderColor: '#AFAFAF',
    redColor: '#E6344A',
    greenColor: '#21CE99',
    yellowColor: '#F5BA03',
    offWhiteColor: '#F5F5F5',

};


//FONT SIZES USED IN APP
export const FONT_SIZES = {
    h1: 28,
    h2: 22,
    h3: 18,
    info_1: 16,
    info_2: 14,
};

//FONT SIZES USED IN APP
export const TEXT_SIZES = {
    h1: 7,
    h2: 6,
    h3: 5,
    info_1: 4,
    info_2: 3.5,
};

export const SPACING_PERCENT = 5;



//MONTHS
export const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export const ONBOARD_DATA = [
    {
        key: 1,
        title: "Men’s grooming & shaving, make it count.",
        text: "Buy products from truly green brands. Let’s help our planet to become beautiful again.",
        image: IMAGES.onboard1,
        backgroundColor: "#febe29",
    },
    {
        key: 2,
        title: "Men’s grooming & shaving, make it count.",
        text: "Write blogs or post status online. Share Slate has everything you need to expand your reach.",
        image: IMAGES.onboard2,
        backgroundColor: "#febe29",
        size: true,
    },

];











