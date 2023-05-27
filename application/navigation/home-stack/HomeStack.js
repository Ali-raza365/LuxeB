import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home, ServiceDetail, Services } from '../../screens';
import { COLORS, WP } from '../../theme/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='home'
            screenOptions={{
                headerShown: false
                // headerTransparent: true,
                // headerTitle: '',
                // headerBackTitleVisible: false,
                // headerTintColor: COLORS.blackColor,
                // headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name='home'
                component={Home}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitle: 'Choose Services',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons name="ios-location-outline" size={WP(7)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='services'
                component={Services}
            />

            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitle: 'Select specialist',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons name="ios-location-outline" size={WP(7)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='servicedetail'
                component={ServiceDetail}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;