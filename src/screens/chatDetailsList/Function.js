function modConversationsData(data) {
    let resData = []
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            modObj = {}
            if (data[i].groupId == undefined || data[i].groupId == null) {
                modObj["groupId"] = "";
            } else {
                modObj["groupId"] = data[i].groupId;
            }
            if (data[i].userId == undefined || data[i].userId == null) {
                modObj["userId"] = "";
            } else {
                modObj["userId"] = data[i].userId;
            }
            if (data[i].content == undefined || data[i].content == null) {
                modObj["content"] = "";
            } else {
                modObj["content"] = data[i].content;
            }
            if (data[i].name == undefined || data[i].name == null) {
                modObj["name"] = "";
            } else {
                modObj["name"] = data[i].name;
            }
            if (data[i].sentAt == undefined || data[i].sentAt == null) {
                modObj["sentAt"] = "";
            } else {
                modObj["sentAt"] = data[i].sentAt;
            }
            if (data[i].profileImgUrl == undefined || data[i].profileImgUrl == null) {
                modObj["profileImgUrl"] = "";
            } else {
                modObj["profileImgUrl"] = data[i].profileImgUrl;
            }
            if (data[i].isSeen == undefined || data[i].isSeen == null) {
                modObj["isSeen"] = "";
            } else {
                modObj["isSeen"] = data[i].isSeen;
            }
            
            resData.push(modObj);
        }
    }
    return resData;
}
export default modConversationsData;