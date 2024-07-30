import { getData, multipleRemove, singleRemove, storeData } from "../async-storage";

const AUTH_DATA = "#IPcfvPi11#-X8HM";
const USER_DATA = "#IPcfvPi11opjoimhshshhkhdhhjhyugyuntuhiu#-X8HM";
const TYPE_DATA = "#IPcfvPi11opjoimhyugyuntuhiu#-X8HM";
const SETUP_TYPE_DATA = "#IPcfvPi11opjoimhyugyuntuhiu#-X8HMjfrwjkuytdfft";
//  Here define all the storage data key
export const allStorageVariable = [
    AUTH_DATA,
    USER_DATA,
    TYPE_DATA,
    SETUP_TYPE_DATA
]

// for remove the data which is stored in login
export async function removeLoginData() {
    await multipleRemove([
        AUTH_DATA,
        USER_DATA,
        TYPE_DATA,
        SETUP_TYPE_DATA
    ]);
}

export async function removeAllStorageData() {
    await multipleRemove(allStorageVariable);
}

// For Auth Data
export async function authData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(AUTH_DATA, data);
            }
            return true;
        case "get":
            return await getData(AUTH_DATA);

        case "clear":
            return await singleRemove(AUTH_DATA);

        default:
            return true;
    }
}
export async function userData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(USER_DATA, data);
            }
            return true;
        case "get":
            return await getData(USER_DATA);

        case "clear":
            return await singleRemove(USER_DATA);

        default:
            return true;
    }
}

export async function loginTypeData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(TYPE_DATA, data);
            }
            return true;
        case "get":
            return await getData(TYPE_DATA);

        case "clear":
            return await singleRemove(TYPE_DATA);

        default:
            return true;
    }
}
export async function SetupTypeData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData(SETUP_TYPE_DATA, data);
            }
            return true;
        case "get":
            return await getData(SETUP_TYPE_DATA);

        case "clear":
            return await singleRemove(SETUP_TYPE_DATA);

        default:
            return true;
    }
}

