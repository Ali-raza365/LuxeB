import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        currency:"THB",
        signup_name: "",
        signup_phone: "",
        phoneNumber: "",
        districts: [],
        userDetail: null,
        userLocation: null,


    },
    reducers: {
        saveSignUpCredentials: (store, action) => {
            store.signup_name = action.payload.name;
            store.signup_phone = action.payload.phone;
        },
        savePhoneNumber: (store, action) => {
            store.phoneNumber = action.payload;
        },
        saveDistricts: (store, action) => {
            store.districts = action.payload;
        },
        saveUserDetail: (store, action) => {
            store.userDetail = action.payload;
        },
        saveUserLocation: (store, action) => {
            store.userLocation = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { saveSignUpCredentials, savePhoneNumber, saveDistricts, saveUserDetail, saveUserLocation } = UserReducer.actions

export default UserReducer.reducer