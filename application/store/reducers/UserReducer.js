import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        signup_name: "",
        signup_phone: "",
        phoneNumber:"",

    },
    reducers: {
        saveSignUpCredentials: (store, action) => {
            store.signup_name = action.payload.name;
            store.signup_phone = action.payload.phone;
        },
        savePhoneNumber:(store, action) => {
            store.phoneNumber = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { saveSignUpCredentials , savePhoneNumber} = UserReducer.actions

export default UserReducer.reducer