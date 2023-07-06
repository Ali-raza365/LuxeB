import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home, ServiceDetail, Services, SpeciallistDetail } from '../../screens';
import { COLORS, FS, WP } from '../../theme/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
                    headerTitleAlign:'center',
                    headerTitle: 'Choose Services',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons name="ios-location-outline" size={FS(3)} color={COLORS.whiteColor} />),
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
                    headerTitleAlign:'center',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    // headerRight: () => (<FontAwesome name="sliders" size={FS(3)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='servicedetail'
                component={ServiceDetail}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.blackColor,
                    headerTitleAlign:'center',
                    headerTitle: 'Specialist',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<AntDesign name="hearto" size={FS(3)} color={COLORS.blackColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.whiteColor,
                    }
                }}
                name='speciallistdetail'
                component={SpeciallistDetail}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;