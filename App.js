import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import AppBar from './application/components/AppBar'
import Root from './application/navigation/Root'
import { COLORS } from './application/theme/config'
import { Provider } from 'react-redux'
import store from './application/store/Store'
import { initStripe } from '@stripe/stripe-react-native'

export default function App() {

    useEffect(() => {
        try {
            initStripe({
                publishableKey: 'pk_test_51NJXbWFCp9JuJuBCBdu16IZOOtFmcRli49jp2dLRe9G22ZkqFQZgHGti156Y4zKCLsk0xyxuTFzpCivJcLqZzviP00zhO8GSYC',
                // merchantIdentifier: 'merchant.identifier',
                // urlScheme="your-url-scheme"
            });
        } catch (error) {
            console.log(error)
        }
    }, []);


    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppBar
                    backgroundColor={COLORS.offWhiteColor}
                    type={"light"}
                />
                <Root />
            </NavigationContainer>
        </Provider>

    )
}