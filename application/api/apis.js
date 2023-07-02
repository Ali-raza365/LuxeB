
export const API_BASE_URL = "http://77.68.30.235";
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const SIGN_UP_API = getApiUrl('/api/account/send-registration-otp/');
export const SIGN_UP_VERIFY_OTP_API = getApiUrl('/api/account/register/');
export const LOGIN_API = getApiUrl('/api/account/send-login-otp/');
export const LOGIN_VERIFY_OTP_API = getApiUrl('/api/account/login/');

export const GET_SERVICES_CATEGOIES_API = getApiUrl('/api/customer/getCategories/');
export const GET_THERAPISTS_BY_SERVICE_API = getApiUrl('/api/customer/getTherapistsList/');
export const GET_THERAPISTS_DETAIL_API = getApiUrl('/api/customer/getTherapistDetails/');

