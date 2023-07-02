import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { COLORS, FONT, RADIUS, TEXT_SIZES, WP } from '../../theme/config';
import { View } from 'react-native';
import { AvailableVoucher, CancelBooking, CompleteBooking, UpComingBookings } from '../../screens';

const Tabs = createMaterialTopTabNavigator();


function Demo() {
    return <View></View>;
}

const VoucherTabs = () => {
    return (
        <Tabs.Navigator
            initialRouteName='upcomingbooking'
            tabBarStyle={{
                shadowColor: COLORS.blackColor,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: WP(RADIUS),
            }}
            screenOptions={{
                tabBarActiveTintColor: COLORS.blackColor,
                tabBarLabelStyle: { fontSize: WP(3), fontWeight: '500' },
                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.blackColor
                },
                tabBarStyle: {
                    shadowColor: COLORS.blackColor,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.2,
                    shadowRadius: WP(RADIUS),
                }
            }}
            sceneContainerStyle={{
                backgroundColor: COLORS.offWhiteColor
            }}
        >
            <Tabs.Screen
                name='upcomingbooking'
                component={AvailableVoucher}
                options={{
                    tabBarLabel: 'Available',
                }}
            />
            <Tabs.Screen
                name='completebooking'
                component={CompleteBooking}
                options={{
                    tabBarLabel: 'Redeemed',
                }}
            />
            <Tabs.Screen
                name='cancelbooking'
                component={CancelBooking}
                options={{
                    tabBarLabel: 'Expired'
                }}
            />


        </Tabs.Navigator>
    );
}

export default VoucherTabs;