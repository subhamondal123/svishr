import { AlertMessage } from "../enums";
import { Toaster } from "../services/common-view-function";
import { ErrorCode } from "../services/constant";

// for api response error validate
export function errorValidator(response) {
    if(response.respondcode === ErrorCode.ERROR.ERROR_CODE.INTERNAL_SERVER_ERROR){
        Toaster.ShortCenterToaster(AlertMessage.MESSAGE.SERVER.INTERNAL_SERVER_ERROR);
    } else {
        Toaster.ShortCenterToaster(response.message);
    }
}