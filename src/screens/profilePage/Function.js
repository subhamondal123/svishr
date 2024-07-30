export function modifyProfileData(data) {
    let userData = data.userInfo
    if (userData) {
        if (userData.userId == undefined || userData.userId == null) {
            userData.userId = "";
        } else {
            userData.userId = userData.userId;
        }
        if (userData.userTypeId == undefined || userData.userTypeId == null) {
            userData.userTypeId = "";
        } else {
            userData.userTypeId = userData.userTypeId;
        }
        if (userData.name == undefined || userData.name == null) {
            userData.name = "";
        } else {
            userData.name = userData.name;
        }
        if (userData.email == undefined || userData.email == null) {
            userData.email = "";
        } else {
            userData.email = userData.email;
        }
        if (userData.phone == undefined || userData.phone == null) {
            userData.phone = "";
        } else {
            userData.phone = userData.phone;
        }
        if (userData.profileImgUrl == undefined || userData.profileImgUrl == null) {
            userData.profileImgUrl = "";
        } else {
            userData.profileImgUrl = userData.profileImgUrl;
        }
        if (userData.gender == undefined || userData.gender == null) {
            userData.gender = "";
        } else {
            userData.gender = userData.gender;
        }
        if (userData.nationality == undefined || userData.nationality == null) {
            userData.nationality = "";
        } else {
            userData.nationality = userData.nationality;
        }
        if (userData.country == undefined || userData.country == null) {
            userData.country = "";
        } else {
            userData.country = userData.country;
        }
        if (userData.countryId == undefined || userData.countryId == null) {
            userData.countryId = "";
        } else {
            userData.countryId = userData.countryId;
        }
        if (userData.University == undefined || userData.University == null) {
            userData.University = [];
        } else {
            userData.University = userData.University.split(",");
        }
        if (userData.degree == undefined || userData.degree == null) {
            userData.degree = "";
        } else {
            userData.degree = userData.degree;
        }
        if (userData.field == undefined || userData.field == null) {
            userData.field = "";
        } else {
            userData.field = userData.field;
        }
        if (userData.specialization == undefined || userData.specialization == null) {
            userData.specialization = "";
        } else {
            userData.specialization = userData.specialization;
        }
        if (userData.expectedGraduation == undefined || userData.expectedGraduation == null) {
            userData.expectedGraduation = "";
        } else {
            userData.expectedGraduation = userData.expectedGraduation;
        }
        if (userData.hobbies == undefined || userData.hobbies == null) {
            userData.hobbies = "";
        } else {
            userData.hobbies = userData.hobbies;
        }
        if (userData.userStory == undefined || userData.userStory == null) {
            userData.userStory = "";
        } else {
            userData.userStory = userData.userStory;
        }
        if (userData.status == undefined || userData.status == null) {
            userData.status = "";
        } else {
            userData.status = userData.status;
        }
        if (userData.isActive == undefined || userData.isActive == null) {
            userData.isActive = "";
        } else {
            userData.isActive = userData.isActive;
        }
        if (userData.createdAt == undefined || userData.createdAt == null) {
            userData.createdAt = "";
        } else {
            userData.createdAt = userData.createdAt;
        }
        if (userData.modifiedAt == undefined || userData.modifiedAt == null) {
            userData.modifiedAt = "";
        } else {
            userData.modifiedAt = userData.modifiedAt;
        }
        if (userData.isDeleted == undefined || userData.isDeleted == null) {
            userData.isDeleted = "";
        } else {
            userData.isDeleted = userData.isDeleted;
        }
        if (userData.discoverable == undefined || userData.discoverable == null) {
            userData.discoverable = "";
        } else {
            userData.discoverable = userData.discoverable;
        }


    }
    return userData;
}