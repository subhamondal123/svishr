import axios from 'axios';
import { CryptoDecoder, CryptoEncoder } from '../../auth';
import { StorageDataModification, Toaster } from '../../common-view-function';
import { ApiConfigUrl } from "./";


export function ApiCall(uriName, payload) {
    return new Promise(async function (resolved, reject) {
        try {
            if (ApiConfigUrl.APP_LAST_URI[uriName].isAuth == true) {
                const token = await StorageDataModification.authData({}, "get");
                axios.interceptors.request.use(
                    config => {
                        if (config.headers.authorization === undefined) {
                            config.headers.authorization = `Bearer ` + token;
                        }
                        return config;
                    },
                    error => {
                        console.log(error);
                    }
                );
            }

            if (ApiConfigUrl.APP_LAST_URI[uriName].method == "POST") {
                // if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                //     payload = { payload: CryptoEncoder.CryptoEncode(payload) };
                // }
                axios.post(ApiConfigUrl.APP_LAST_URI[uriName].path, payload)
                    .then(res => {
                        let response = res.data;
                       
                        // if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                        //     response = CryptoDecoder.CryptoDecode(response);
                        // }
                        resolved(response);
                    })
                    .catch(error => {
                        // handle error
                        Toaster.ShortCenterToaster("Network error !")
                        reject(error);
                        // console.log("error:::",error)

                    })
            } else if (ApiConfigUrl.APP_LAST_URI[uriName].method == "GET") {
                axios.get(ApiConfigUrl.APP_LAST_URI[uriName].path)
                    .then(res => {
                        let response = res.data;
                        // if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                        //     response = CryptoDecoder.CryptoDecode(response);
                        // }
                        resolved(response);
                    })
                    .catch(error => {
                        // handle error
                        reject(error);
                    })
            }
        } catch (e) {
            reject(e);
        }
    })
}


export function ApiFileCall(uriName, payload) {
    return new Promise(async function (resolved, reject) {
        try {
            axios.post(ApiConfigUrl.APP_LAST_URI[uriName].path, payload)
                .then(res => {
                    let response = res.data;
                    // if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                    //     response = CryptoDecoder.CryptoDecode(response);
                    // }
                    resolved(response);
                })
                .catch(error => {
                    Toaster.ShortCenterToaster("Network Error, Please try again later !")
                    console.log(error)
                    // handle error
                    resolved(true);
                })
        } catch (e) {
            reject(e);
        }
    })
}



// for upload the file
// export function ApiFileCall(uriName, payload) {
//     return new Promise(async function (resolved, reject) {
//         try {
//             // let token = await StorageDataModification.authData({}, "get");
//             // var myHeaders = new Headers();
//             // if (token) {
//             //     myHeaders.append("Authorization", "Bearer " + token);
//             // }
//             const apiUriData = ApiConfigUrl.APP_LAST_URI[uriName];
//             let apiUri = uriName;
//             if (apiUriData !== undefined && apiUriData !== null) {
//                 apiUri = apiUriData.path;
//             }
//             var requestOptions = {
//                 method: 'POST',
//                 // headers: myHeaders,
//                 body: payload,
//                 redirect: 'follow'
//             };
//             fetch(apiUri, requestOptions)
//                 .then(response => response.text())
//                 .then(result => resolved(result))
//                 .catch(error => {
//                     console.log('error>>>>>>>', error)
//                     resolved(true);
//                 });
//         } catch (e) {
//             reject(e);
//         }
//     });
// }