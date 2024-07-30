export function modArrData(data) {
    var respData = { "hobbiesList": [] };
    if (data) {
        let hobbiesData = data;
        if (hobbiesData && hobbiesData.length > 0) {
            for (let i = 0; i < hobbiesData.length; i++) {
                let modObj = {};
                if (hobbiesData[i].id == undefined || hobbiesData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = hobbiesData[i].id;
                }
                if (hobbiesData[i].name == undefined || hobbiesData[i].name == null) {
                    modObj["name"] = "";
                } else {
                    modObj["name"] = hobbiesData[i].name;
                }
                modObj["check"] = false;
                respData.hobbiesList.push(modObj);
            }
        }
    }
    return (respData);
}