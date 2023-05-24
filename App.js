import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AppBar from './application/components/AppBar'
import Root from './application/navigation/Root'
import { COLORS } from './application/theme/config'

export default function App() {



  return (
      <NavigationContainer>
        <AppBar
          backgroundColor={COLORS.primaryColor}
          type={"light"}
        />
        <Root />
      </NavigationContainer>
  )
}