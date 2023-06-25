
import { configureStore } from '@reduxjs/toolkit'
import { UserReducer, ServicesReducer } from './reducers'

export default configureStore({
    reducer: {
        user: UserReducer,
        service: ServicesReducer,
    }
})