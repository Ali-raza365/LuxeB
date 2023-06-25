import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BookingDetail, Referral } from '../../screens';
import { COLORS, FS, WP } from '../../theme/config';

const Stack = createStackNavigator();

const RefferalStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName='home'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitleAlign: 'center',
                    headerTitle: 'Referral',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons onPress={() => navigation.goBack()} name="close" size={FS(4)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='referral'
                component={Referral}
            />
        </Stack.Navigator>
    );
}

export default RefferalStack;