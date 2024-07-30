export function selectUnselectTabView(focused) {
    let respViewStyle = {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 500
    };
    if (focused) {
        respViewStyle["backgroundColor"] = "#fef6e5";
    }
    return respViewStyle;
}
