
export const API_BASE_URL = "http://77.68.30.235";
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const SIGN_UP_API = getApiUrl('/api/account/send-registration-otp/');
export const SIGN_UP_VERIFY_OTP_API = getApiUrl('/api/account/register/');
export const LOGIN_API = getApiUrl('/api/account/send-login-otp/');
export const LOGOUT_API = getApiUrl('/api/account/logout/');
export const LOGIN_VERIFY_OTP_API = getApiUrl('/api/account/login/');
export const GET_USER_DETAIL_API = getApiUrl('/api/customer/getCustomerDetails/');

export const GET_DISTRICTS_API = getApiUrl('/api/customer/getDistricts/');
export const GET_SUBDISTRICTS_API = getApiUrl('/api/customer/getSubDistricts/');
export const SAVE_USER_LOCATION_API = getApiUrl('/api/customer/customerLocation/');

export const GET_SLIDER_API = getApiUrl('/api/customer/getSliderItems/');
export const GET_SERVICES_CATEGOIES_API = getApiUrl('/api/customer/getCategories/');
export const GET_THERAPISTS_BY_SERVICE_API = getApiUrl('/api/customer/getTherapistsList/');
export const GET_THERAPISTS_AVAILIBLE_API = getApiUrl('/api/customer/getTherapistAvailability/');
export const GET_THERAPISTS_DETAIL_API = getApiUrl('/api/customer/getTherapistDetails/');

export const SAVE_PAYMENT_METHOD_API = getApiUrl('/api/customer/addPaymentMethod/');
export const SET_DEFAULT_PAYMENT_METHOD_API = getApiUrl('/api/customer/setDefaultPaymentMethod/');


