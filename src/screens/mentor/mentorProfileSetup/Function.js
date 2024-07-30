export function modProfileInfoData(data){
    if (data) {
        if (data.userId == undefined || data.userId == null) {
            data.userId = "";
        } else {
            data.userId = data.userId;
        }
        if (data.userTypeId == undefined || data.userTypeId == null) {
            data.userTypeId = "";
        } else {
            data.userTypeId = data.userTypeId;
        }
        if (data.name == undefined || data.name == null) {
            data.name = "";
        } else {
            data.name = data.name;
        }
        if (data.email == undefined || data.email == null) {
            data.email = "";
        } else {
            data.email = data.email;
        }
        if (data.phone == undefined || data.phone == null) {
            data.phone = "";
        } else {
            data.phone = data.phone;
        }
        if (data.profileImgUrl == undefined || data.profileImgUrl == null) {
            data.profileImgUrl = "";
        } else {
            data.profileImgUrl = data.profileImgUrl;
        }
        if (data.gender == undefined || data.gender == null) {
            data.gender = "";
        } else {
            data.gender = data.gender;
        }
        if (data.nationality == undefined || data.nationality == null) {
            data.nationality = "";
        } else {
            data.nationality = data.nationality;
        }
        if (data.country == undefined || data.country == null) {
            data.country = "";
        } else {
            data.country = data.country;
        }
        if (data.countryId == undefined || data.countryId == null) {
            data.countryId = "";
        } else {
            data.countryId = data.countryId;
        }
        if (data.University == undefined || data.University == null) {
            data.University = "";
        } else {
            data.University = data.University;
        }
        if (data.degree == undefined || data.degree == null) {
            data.degree = "";
        } else {
            data.degree = data.degree;
        }
        if (data.field == undefined || data.field == null) {
            data.field = "";
        } else {
            data.field = data.field;
        }
        if (data.specialization == undefined || data.specialization == null) {
            data.specialization = "";
        } else {
            data.specialization = data.specialization;
        }
        if (data.expectedGraduation == undefined || data.expectedGraduation == null) {
            data.expectedGraduation = "";
        } else {
            data.expectedGraduation = data.expectedGraduation;
        }
        if (data.hobbies == undefined || data.hobbies == null) {
            data.hobbies = "";
        } else {
            data.hobbies = data.hobbies;
        }
        if (data.userStory == undefined || data.userStory == null) {
            data.userStory = "";
        } else {
            data.userStory = data.userStory;
        }
        if (data.status == undefined || data.status == null) {
            data.status = "";
        } else {
            data.status = data.status;
        }
        if (data.countryCode == undefined || data.countryCode == null) {
            data.countryCode = "";
        } else {
            data.countryCode = data.countryCode;
        }
        if (data.countryIso2 == undefined || data.countryIso2 == null) {
            data.countryIso2 = "";
        } else {
            data.countryIso2 = data.countryIso2;
        }
        if (data.discoverable == undefined || data.discoverable == null) {
            data.discoverable = "";
        } else {
            data.discoverable = data.discoverable;
        }


    }
    return data;
}


export function modDateData(data) {
    let modDate = []
    if (data) {
        for (let i = 0; i < data.length; i++) {
            // let dateObj = new Date(data[i]);
            // let year = dateObj.getFullYear();
            // let monthNum = String(dateObj.getMonth() + 1).padStart(2, '0');
            // let startDate = '01'
            // let options = { month: 'short' };
            // let month = dateObj.toLocaleString('en-US', options);

            // const firstDayOfMonth = new Date(year, monthNum, 1);
            // const lastDayOfMonth = new Date(year, monthNum + 1, 0);
            // let endDate = lastDayOfMonth.getDate();

            modDate.push(
                {
                    "id": i + 1,
                    // "name": `${data[i]}`,
                    // "startDate": startDate,
                    // "endDate": endDate,
                    "name": data[i],
                    // "monthNum": monthNum
                }
            )
        }

    }
    return modDate;
}