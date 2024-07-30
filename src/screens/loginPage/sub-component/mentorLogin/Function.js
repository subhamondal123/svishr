import { useState } from "react";
import { AlertMessage } from "../../../../enums";
import { Toaster } from "../../../../services/common-view-function";


export async function loginApiCall(stateData, type, props) {
    stateData.emailText = stateData.emailText.replace(/\s+/g, '');
    stateData.passwordText = stateData.passwordText.replace(/\s+/g, '');
    let errorCount = 0;
    let emailMsg = "";
    let passMsg = ""
    if (stateData.emailText == null || stateData.emailText == undefined || stateData.emailText == "") {
        errorCount++;
        emailMsg = AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY;
    } else if (stateData.passwordText == null || stateData.passwordText == undefined || stateData.passwordText.length == 0) {
        errorCount++;
        passMsg = AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY;
    }
    // this.setState({ emialAlertMessage: emailMsg, passAlertMessage: passMsg })
    if (errorCount === 0) {
        props.navigation.navigate("HomePage")
    }

    return stateData;
}

// for emmail validate
export function emailModValidator(email) {
    if (email === undefined || email === null) {
        return false;
    } else {
        if (email.length === 0) {
            return false;
        } else {
            if (validateEmail(email)) {   // validate the email by email-validator module
                return true;
            } else {
                return false;
            }
        }
    }
};