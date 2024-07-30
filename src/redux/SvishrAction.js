export const setDeviceId = (loginData) => ({
    type: "SET_LOGIN_DATA",
    payload: loginData,
});
export const stateLookupData = (stateLookupData) => ({
    type: "SET_LOOKUP",
    payload: stateLookupData,
});