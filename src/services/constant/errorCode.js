// define all fields error codes

export const ERROR = Object.freeze({
    ERROR: {
        WITHOUT_ERROR: true,
        WITH_ERROR: false
    },
    ERROR_CODE: {
        SUCCESS: 200,
        UNAUTHORIZED_USER: 401,
        EMAIL_NOT_EXIST: 101,
        INCORRECT_PASSWORD: 102,
        USER_NOT_EXIST: 103,
        EMAIL_EXIST: 104,
        PHONE_EXIST: 105,
        EMAIL_PHONE_EXIST: 106,
        ERROR_STATUS:0
    }
});