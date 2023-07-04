import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import AppBar from './application/components/AppBar'
import Root from './application/navigation/Root'
import store from './application/store/Store'
import { COLORS } from './application/theme/config'

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