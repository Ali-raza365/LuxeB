import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomNavigator from './BottomNavigator';
import { Onboard, Splash, Welcome } from '../screens';
import AuthStack from './auth-stack/AuthStack';


export default function Root() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='splash'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='splash'
                component={Splash}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='onboard'
                component={Onboard}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='welcome'
                component={Welcome}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen
                name='auth'
                component={AuthStack}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='homenavigator'
                component={BottomNavigator}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}