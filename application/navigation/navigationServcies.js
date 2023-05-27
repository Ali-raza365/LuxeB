export const _gotoOnboard = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'onboard' }]
    })
}

export const _gotoWelcomeScr = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'welcome' }]
    })
}

export const _gotoBottomTabs = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'homenavigator' }]
    })
}

export const _gotoCreateAccount = (navigation) => {
    navigation.navigate('auth',{screen:'createAccount'})
}



export const _gotophoneNumber = (navigation) => {
    navigation.navigate('auth',{screen:'phoneNumber'})
}

export const _gotoAskForLocation = (navigation) => {
    navigation.navigate('auth',{screen:'askForLocation'})
}
