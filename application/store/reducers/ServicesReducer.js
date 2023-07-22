import { createSlice } from '@reduxjs/toolkit';

export const ServicesReducer = createSlice({
    name: 'service',
    initialState: {
        speciallistDetail: {
            id: 9,
            name: 'faisal',
            therapist_info: [
                {
                    type: 'gold',
                    about: 'lorem ipusm dolor dummy text',
                },
            ],
            profile_image: '/media/profile_images/Original-6.png',
            is_therapist: true,
            services: [
                {
                    service: {
                        id: 4,
                        service_name: 'Facial',
                        service_image: '/media/service_images/Original-9.png',
                    },
                    sub_services: [
                        {
                            sub_service: {
                                id: 2,
                                sub_service_name: 'full face facial',
                                description: 'lorem ipsum',
                            },
                            price: '12.00',
                            duration: 45,
                            user: 9,
                            quantity: 1,
                            isSelected: false,
                        },
                        {
                            sub_service: {
                                id: 4,
                                sub_service_name: 'full face facial',
                                description: 'lorem ipsum',
                            },
                            price: '12.00',
                            duration: 45,
                            user: 9,
                            quantity: 1,
                            isSelected: false,
                        },
                    ],
                },
            ],
            reviews: {
                all_reviews: [
                    {
                        rating: 3,
                        review_text: 'very professional and polite, recommended 100%',
                        created_at: '2023-06-11T15:35:41.171767Z',
                    },
                    {
                        rating: 4.6,
                        review_text: 'very professional and polite, recommended 100%',
                        created_at: '2023-06-11T15:35:41.171767Z',
                    },
                ],
                average_rating: 3.0,
                total_ratings: 1,
            },
        },
        servicesCategories: null,
        therapistsList: null,
        selectedService: null,
        therapistsLoading: false,
        allAppointments: [],
        appointmentDetail: null,
    },
    reducers: {
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        setFetchingTherapistsLoading: (state, action) => {
            state.therapistsLoading = true;
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
        saveServicesCategories: (state, action) => {
            state.servicesCategories = action.payload;
        },
        saveTherapistsList: (state, action) => {
            state.therapistsList = action.payload;
            state.therapistsLoading = false;
        },
        setSpeciallistDetail: (state, action) => {
            state.speciallistDetail = action.payload;
        },
        saveAppointmentsList: (state, action) => {
            state.allAppointments = action.payload;
        },
        saveAppointmentDetail: (state, action) => {
            state.appointmentDetail = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setSpeciallistDetail,
    decrement,
    incrementByAmount,
    saveServicesCategories,
    saveTherapistsList,
    setFetchingTherapistsLoading,
    setSelectedService,
    saveAppointmentsList,
    saveAppointmentDetail,
} = ServicesReducer.actions;

export default ServicesReducer.reducer;
