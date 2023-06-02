import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomNavigator from './bottom-stack/BottomNavigator';
import { Onboard, Splash, Welcome } from '../screens';
import AuthStack from './auth-stack/AuthStack';
import BottomStack from './bottom-stack/BottomStack';


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
                component={BottomStack}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}