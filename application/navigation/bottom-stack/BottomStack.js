import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AddPaymentMethod, Addresses, Checkout, PaymentMethods, SelectPaymentMethod, ServiceDetail, SpeciallistDetail } from '../../screens';
import { COLORS, FS, WP } from '../../theme/config';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();

const BottomStack = () => {
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
                name='bottomnavigator'
                component={BottomNavigator}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitleAlign:'center',
                    headerTitle: 'Checkout',
                    headerTitleStyle: { textTransform: 'uppercase', letterSpacing: 1, },
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons name="close" size={FS(3)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='checkout'
                component={Checkout}
            />
               <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitleAlign: 'center',
                    headerTitle: 'Addresses',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='addresses'
                component={Addresses}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitle: 'PAYMENT',
                    headerTitleAlign:'center',
                    headerTitleStyle: { textTransform: 'uppercase', letterSpacing: 1, },
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons name="close" size={FS(3)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='addPaymentMethod'
                component={AddPaymentMethod}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitle: 'PAYMENT',
                    headerTitleAlign:'center',
                    headerTitleStyle: { textTransform: 'uppercase', letterSpacing: 1, },
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons name="close" size={FS(3)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='selectpaymentmethod'
                component={PaymentMethods}
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
                    headerRight: () => (<Ionicons name="ios-location-outline" size={FS(3)} color={COLORS.whiteColor} />),
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
                    headerTitle: 'Specialist',
                    headerTitleAlign:'center',
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

export default BottomStack;