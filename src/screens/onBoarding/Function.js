export function modOnBoardingData(data) {
    let response = []
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            modObj = {}
            if (data[i].id == undefined || data[i].id == null) {
                modObj["id"] = "";
            } else {
                modObj["id"] = data[i].id;
            }
            if (data[i].userTypeId == undefined || data[i].userTypeId == null) {
                modObj["userTypeId"] = "";
            } else {
                modObj["userTypeId"] = data[i].userTypeId;
            }
            if (data[i].contentType == undefined || data[i].contentType == null) {
                modObj["contentType"] = "";
            } else {
                modObj["contentType"] = data[i].contentType;
            }
            if (data[i].contentTitle == undefined || data[i].contentTitle == null) {
                modObj["contentTitle"] = "";
            } else {
                modObj["contentTitle"] = data[i].contentTitle;
            }
            if (data[i].contentBody == undefined || data[i].contentBody == null) {
                modObj["contentBody"] = "";
            } else {
                modObj["contentBody"] = data[i].contentBody;
            }
            if (data[i].contentImg == undefined || data[i].contentImg == null) {
                modObj["contentImg"] = "";
            } else {
                modObj["contentImg"] = data[i].contentImg;
            }
            if (data[i].others == undefined || data[i].others == null) {
                modObj["others"] = "";
            } else {
                modObj["others"] = data[i].others;
            }
            response.push(modObj)
        }
    }
    return response
}
