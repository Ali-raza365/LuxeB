import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Profile, Referral } from '../../screens';
import { COLORS, FS, WP } from '../../theme/config';
import VoucherTabs from './VoucherTabs';
import { _gotoVoucherTabs } from '../navigationServcies';

const Stack = createStackNavigator();

const ProfileStack = ({ navigation }) => {
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
                    headerTitle: 'Profile',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons onPress={() => navigation.goBack()} name="close" size={FS(4)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='profile'
                component={Profile}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.whiteColor,
                    headerTitleAlign: 'center',
                    headerTitle: 'Vouchers',
                    headerRightContainerStyle: { paddingRight: WP(4) },
                    headerLeftContainerStyle: { paddingLeft: WP(4) },
                    headerRight: () => (<Ionicons onPress={() => navigation.navigate('profile')} name="close" size={FS(4)} color={COLORS.whiteColor} />),
                    headerStyle: {
                        backgroundColor: COLORS.blackColor,
                    }
                }}
                name='vouchertabs'
                component={VoucherTabs}
            />
        </Stack.Navigator>
    );
}

export default ProfileStack;