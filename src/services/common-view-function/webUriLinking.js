//  link to the web browser by link

import { Linking } from "react-native";
import { Regex } from "../config";
import { WebUri } from "../constant";

// for linking with any browser
export function linkWebBrowserUri(url) {
    try {
        // if (url == undefined || url == null || url == "") {
        //     url = WebUri.URI.PRIVACY_POLICY;
        // }
        Linking.openURL(url);
        return true;
    } catch (e) {
        console.log(e);
    }
}

// // for check the strong is url or not
// export function validURLCheck(urlString) {
//     var urlPattern = new RegExp(Regex.LINK_CHECK_REGEX); // validate fragment locator
// 	  return !!urlPattern.test(urlString);
// }