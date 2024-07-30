export function modRequestList(data) {
    let resData = []
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            modObj = {}
            if (data[i].userId == undefined || data[i].userId == null) {
                modObj["userId"] = "";
            } else {
                modObj["userId"] = data[i].userId;
            }
            if (data[i].userTypeId == undefined || data[i].userTypeId == null) {
                modObj["userTypeId"] = "";
            } else {
                modObj["userTypeId"] = data[i].userTypeId;
            }
            if (data[i].name == undefined || data[i].name == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].name;
            }
            if (data[i].email == undefined || data[i].email == null) {
                modObj["email"] = "";
            } else {
                modObj["email"] = data[i].email;
            }
            if (data[i].countryCode == undefined || data[i].countryCode == null) {
                modObj["countryCode"] = "";
            } else {
                modObj["countryCode"] = data[i].countryCode;
            }
            if (data[i].countryIso2 == undefined || data[i].countryIso2 == null) {
                modObj["countryIso2"] = "";
            } else {
                modObj["countryIso2"] = data[i].countryIso2;
            }
            if (data[i].phone == undefined || data[i].phone == null) {
                modObj["phone"] = "";
            } else {
                modObj["phone"] = data[i].phone;
            }
            if (data[i].profileImgUrl == undefined || data[i].profileImgUrl == null) {
                modObj["profileImgUrl"] = "";
            } else {
                modObj["profileImgUrl"] = data[i].profileImgUrl;
            }
            if (data[i].gender == undefined || data[i].gender == null) {
                modObj["gender"] = "";
            } else {
                modObj["gender"] = data[i].gender;
            }
            if (data[i].nationality == undefined || data[i].nationality == null) {
                modObj["nationality"] = "";
            } else {
                modObj["nationality"] = data[i].nationality;
            }
            if (data[i].country == undefined || data[i].country == null) {
                modObj["country"] = "";
            } else {
                modObj["country"] = data[i].country;
            }
            if (data[i].university == undefined || data[i].university == null) {
                modObj["university"] = "";
            } else {
                modObj["university"] = data[i].university;
            }
            if (data[i].degree == undefined || data[i].degree == null) {
                modObj["degree"] = "";
            } else {
                modObj["degree"] = data[i].degree;
            }
            if (data[i].field == undefined || data[i].field == null) {
                modObj["field"] = "";
            } else {
                modObj["field"] = data[i].field;
            }
            if (data[i].userStory == undefined || data[i].userStory == null) {
                modObj["userStory"] = "";
            } else {
                modObj["userStory"] = data[i].userStory;
            }
            if (data[i].expectedGraduation == undefined || data[i].expectedGraduation == null) {
                modObj["expectedGraduation"] = "";
            } else {
                modObj["expectedGraduation"] = data[i].expectedGraduation;
            }
            if (data[i].hobbies == undefined || data[i].hobbies == null) {
                modObj["hobbies"] = "";
            } else {
                modObj["hobbies"] = data[i].hobbies;
            }
            if (data[i].loginType == undefined || data[i].loginType == null) {
                modObj["loginType"] = "";
            } else {
                modObj["loginType"] = data[i].loginType;
            }
            if (data[i].specialization == undefined || data[i].specialization == null) {
                modObj["specialization"] = "";
            } else {
                modObj["specialization"] = data[i].specialization;
            }
            if (data[i].discoverable == undefined || data[i].discoverable == null) {
                modObj["discoverable"] = "";
            } else {
                modObj["discoverable"] = data[i].discoverable;
            }
            if (data[i].isActive == undefined || data[i].isActive == null) {
                modObj["isActive"] = "";
            } else {
                modObj["isActive"] = data[i].isActive;
            }
            if (data[i].createdAt == undefined || data[i].createdAt == null) {
                modObj["createdAt"] = "";
            } else {
                modObj["createdAt"] = data[i].createdAt;
            }
            if (data[i].modifiedAt == undefined || data[i].modifiedAt == null) {
                modObj["modifiedAt"] = "";
            } else {
                modObj["modifiedAt"] = data[i].modifiedAt;
            }
            if (data[i].isDelete == undefined || data[i].isDelete == null) {
                modObj["isDelete"] = "";
            } else {
                modObj["isDelete"] = data[i].isDelete;
            }
            if (data[i].countryEmoji == undefined || data[i].countryEmoji == null) {
                modObj["countryEmoji"] = "";
            } else {
                modObj["countryEmoji"] = data[i].countryEmoji;
            }
            resData.push(modObj);
        }
    }
    return resData;
}