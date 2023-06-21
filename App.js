import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AppBar from './application/components/AppBar'
import Root from './application/navigation/Root'
import { COLORS } from './application/theme/config'
import { Provider } from 'react-redux'
import store from './application/store/Store'

export default function App() {



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