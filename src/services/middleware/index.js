import { ApiConfigUrl, ApiModule } from "../api";
import { Toaster } from "../common-view-function";
import { DeviceInfo } from "../config";
import { Platform } from "react-native";


export function MiddlewareCheck(uriName, payload, props) {
    return new Promise(async function (resolved, reject) {
        try {
            if (await DeviceInfo.CheckConnection()) {
                if (ApiConfigUrl.APP_LAST_URI[uriName]) {
                    if (props) {
                        resolved(await ApiModule.ApiCall(uriName, payload));
                    } else {
                        resolved(await ApiModule.ApiCall(uriName, payload));
                    }
                }
            } else {
                if (props) {
                    props.navigation.navigate("NetworkError");
                }
                resolved(false)
            }

        } catch (e) {
            reject(e);
        }
    });
}


export function MiddlewareOnlyApiCheck(uriName, payload, props) {
    return new Promise(async function (resolved, reject) {
        try {
            if (await DeviceInfo.CheckConnection()) {
                payload = {
                    platform: Platform.OS,
                    ...payload
                }
                if (props) {
                    resolved(await ApiModule.ApiCall(uriName, payload));
                } else {
                    resolved(await ApiModule.ApiCall(uriName, payload));
                }
            } else {
                if (props) {
                    props.navigation.navigate("NetworkError");
                }
                resolved(false)
            }
        } catch (e) {
            reject(e);
        }
    });
}


export function MiddlewareFileCheck(uriName, payload, props) {
    return new Promise(async function (resolved, reject) {
        try {
            if (await DeviceInfo.CheckConnection()) {
                const formData = new FormData();
                formData.append(
                    "file",
                    payload
                )
                resolved(await ApiModule.ApiFileCall(uriName, formData));
                // }
            } else {
                Toaster.ShortCenterToaster("Network error !")
                resolved(false)
            }
        } catch (e) {
            reject(e);
        }
    });
}
