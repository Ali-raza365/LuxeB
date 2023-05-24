export const _gotoHomeNavigator = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'homenavigator' }]
    })
}
