export function modifyDropdownData(data, selectedValueType, selectedValue) {
    var arrName = [];
    let headText = "";
    for (let i = 0; i < data.length; i++) {
        if (selectedValueType == "id") {
            if (data[i].id == selectedValue && selectedValue != 0) {
                data[i]["check"] = true;
                headText = data[i].name;
            } else {
                data[i]["check"] = false;
            }
        } else if (selectedValueType == "name") {
            if (data[i].name == selectedValue && selectedValue.length > 0 || selectedValue != "") {
                data[i]["check"] = true;
                headText = data[i].name;
            } else {
                data[i]["check"] = false;
            }
        }
        arrName.push(data[i].name + "`|~" + i);
    }
    return { data: data, arrName: arrName, headerText: headText };
}