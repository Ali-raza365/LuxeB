import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';




import { COLORS, SPACING_PERCENT, WP } from '../../theme/config';
import { CreateAccount, PhoneNumber } from '../../screens';

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
          
        </Stack.Navigator>
    );
}

export default AuthStack;