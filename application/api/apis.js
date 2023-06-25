
export const API_BASE_URL = "http://77.68.30.235";
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const GET_SERVICES_CATEGOIES_API = getApiUrl('/api/customer/getCategories/');
export const GET_THERAPISTS_BY_SERVICE_API = getApiUrl('/api/customer/getTherapistsList/');
