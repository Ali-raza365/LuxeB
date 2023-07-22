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

export const _gotoBookingTabs = (navigation) => {
    // navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'homenavigator', screen:"bookingstack" }],
    //   });
    navigation.replace("bottomnavigator", { screen: 'bookingstack' })
}

export const _gotoCreateAccount = (navigation) => {
    navigation.navigate('auth', { screen: 'createAccount' })
}



export const _gotophoneNumber = (navigation) => {
    navigation.navigate('auth', { screen: 'phoneNumber' })
}

export const _gotoAskForLocation = (navigation) => {
    navigation.navigate('auth', { screen: 'askForLocation' })
}
export const _gotoVoucherTabs = (navigation) => {
    navigation.navigate('vouchertabs')
}
