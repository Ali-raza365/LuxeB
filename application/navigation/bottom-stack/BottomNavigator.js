import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { COLORS, FONT_BOLD, WP, isIOS } from '../../theme/config';
import { Home } from '../../screens';
import HomeStack from '../home-stack/HomeStack';
import BookingStack from '../booking-stack/BookingStack';
import RefferalStack from '../referral-stack/ReferralStack';
import ProfileStack from '../profile-stack/ProfileStack';
// import {Home} from '../screens/Home/Home';

const Tab = createBottomTabNavigator();

function Demo() {
    return <View></View>;
}

export default function BottomNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    display: 'flex',
                    height: isIOS ? WP(20) : WP(18),
                    paddingBottom: 10,
                    borderRadius: WP(6),
                    backgroundColor: COLORS.blackColor,
                    width: WP(95),
                    paddingHorizontal: 10,
                    elevation: WP(0.8),
                    marginBottom: 10,
                    alignSelf: 'center',
                },
                tabBarLabelStyle: {
                    fontSize: WP(3),
                },
                tabBarShowLabel: true,
                tabBarActiveTintColor: COLORS.whiteColor,
                tabBarInactiveTintColor: COLORS.lightGrey,
            })}>
            <Tab.Screen
                name="homestack"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Octicons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="bookingstack"
                component={BookingStack}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="calendar-month-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            {/* <Tab.Screen
        name="Live Chat"
        component={Demo}
        options={{
          tabBarLabel: 'Live Chat',
          headerShown: true,
          tabBarIcon: ({color}) => (
            <AntDesign name="message1" color={color} size={26} />
          ),
        }}
      /> */}
            <Tab.Screen
                name="Referral"
                component={RefferalStack}
                options={{
                    tabBarLabel: 'Referral',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="gift-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
