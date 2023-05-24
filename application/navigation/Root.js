import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomNavigator from './BottomNavigator';


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
                name='homenavigator'
                component={BottomNavigator}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}