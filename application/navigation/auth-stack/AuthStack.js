import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AskForLocation, CreateAccount, PhoneNumber, VerifyOtp } from '../../screens';
import { COLORS } from '../../theme/config';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='login'
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerBackTitleVisible: false,
                headerTintColor: COLORS.blackColor,
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name='createAccount'
                component={CreateAccount}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name='phoneNumber'
                component={PhoneNumber}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name='verifyotp'
                component={VerifyOtp}
            />
              <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name='askForLocation'
                component={AskForLocation}
            />
            

        </Stack.Navigator>
    );
}

export default AuthStack;