function modChatList(data) {

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
            if (data[i].profileImgUrl == undefined || data[i].profileImgUrl == null) {
                modObj["profileImgUrl"] = "";
            } else {
                modObj["profileImgUrl"] = data[i].profileImgUrl;
            }
            if (data[i].content == undefined || data[i].content == null) {
                modObj["content"] = "";
            } else {
                modObj["content"] = data[i].content;
            }
            if (data[i].lastMessageTime == undefined || data[i].lastMessageTime == null) {
                modObj["lastMessageTime"] = "";
            } else {
                modObj["lastMessageTime"] = data[i].lastMessageTime;
            }
            if (data[i].unseenMessageCount == undefined || data[i].unseenMessageCount == null) {
                modObj["unseenMessageCount"] = "";
            } else {
                modObj["unseenMessageCount"] = data[i].unseenMessageCount;
            }

            resData.push(modObj);
        }
    }
    return resData;
}
export default modChatList;