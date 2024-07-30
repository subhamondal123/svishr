export function modProfileInfoData(data) {
    if (data) {
        if (data.userId == null || data.userId == undefined) {
            data.userId = ""
        } else {
            data.userId = data.userId
        }
        if (data.userTypeId == null || data.userTypeId == undefined) {
            data.userTypeId = ""
        } else {
            data.userTypeId = data.userTypeId
        }
        if (data.name == null || data.name == undefined) {
            data.name = ""
        } else {
            data.name = data.name
        }
        if (data.email == null || data.email == undefined) {
            data.email = ""
        } else {
            data.email = data.email
        }
        if (data.countryId == null || data.countryId == undefined) {
            data.countryId = ""
        } else {
            data.countryId = data.countryId
        }
        if (data.countryCode == null || data.countryCode == undefined) {
            data.countryCode = ""
        } else {
            data.countryCode = data.countryCode
        }
        if (data.countryIso2 == null || data.countryIso2 == undefined) {
            data.countryIso2 = ""
        } else {
            data.countryIso2 = data.countryIso2
        }
        if (data.phone == null || data.phone == undefined) {
            data.phone = ""
        } else {
            data.phone = data.phone
        }
        if (data.profileImgUrl == null || data.profileImgUrl == undefined) {
            data.profileImgUrl = ""
        } else {
            data.profileImgUrl = data.profileImgUrl
        }
        if (data.university == null || data.university == undefined) {
            data.university = ""
        } else {
            data.university = data.university
        }
        if (data.hobbies == null || data.hobbies == undefined) {
            data.hobbies = ""
        } else {
            data.hobbies = data.hobbies
        }
        if (data.userStory == null || data.userStory == undefined) {
            data.userStory = ""
        } else {
            data.userStory = data.userStory
        }
        if (data.loginType == null || data.loginType == undefined) {
            data.loginType = ""
        } else {
            data.loginType = data.loginType
        }
        if (data.gender == null || data.gender == undefined) {
            data.gender = ""
        } else {
            data.gender = data.gender
        }
        if (data.degree == null || data.degree == undefined) {
            data.degree = ""
        } else {
            data.degree = data.degree
        }
        if (data.field == null || data.field == undefined) {
            data.field = ""
        } else {
            data.field = data.field
        }
        if (data.specialization == null || data.specialization == undefined) {
            data.specialization = ""
        } else {
            data.specialization = data.specialization
        }
        if (data.nationality == null || data.nationality == undefined) {
            data.nationality = ""
        } else {
            data.nationality = data.nationality
        }
        if (data.country == null || data.country == undefined) {
            data.country = ""
        } else {
            data.country = data.country
        }
        if (data.invitationStatus == null || data.invitationStatus == undefined) {
            data.invitationStatus = ""
        } else {
            data.invitationStatus = data.invitationStatus
        }
        if (data.bookmarkUser == null || data.bookmarkUser == undefined) {
            data.bookmarkUser = ""
        } else {
            data.bookmarkUser = data.bookmarkUser
        }
        if (data.universityData == null || data.universityData == undefined) {
            data.universityData = []
        } else {
            data.universityData = data.universityData
        }
        if (data.hobbiesData == null || data.hobbiesData == undefined) {
            data.hobbiesData = []
        } else {
            data.hobbiesData = data.hobbiesData
        }
        if (data.isInvited == null || data.isInvited == undefined) {
            data.isInvited = ""
        } else {
            data.isInvited = data.isInvited
        }
        if (data.isInvitedId == null || data.isInvitedId == undefined) {
            data.isInvitedId = ""
        } else {
            data.isInvitedId = data.isInvitedId
        }
        if (data.expectedGraduation == null || data.expectedGraduation == undefined) {
            data.expectedGraduation = ""
        } else {
            data.expectedGraduation = data.expectedGraduation
        }
        if (data.countryEmoji == null || data.countryEmoji == undefined) {
            data.countryEmoji = ""
        } else {
            data.countryEmoji = data.countryEmoji
        }
    }
    return data;
}