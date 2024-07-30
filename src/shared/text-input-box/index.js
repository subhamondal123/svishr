import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator,
    TextInputState,
    Alert,
} from 'react-native';
import {
    Color,
    Dimension,
    FontFamily,
    FontSize,
    ImageName,
    Padding
} from '../../enums';

function TextInputBox({
    placeholder,
    placeholderTextColor,
    value,
    keyboardType,
    editable,
    borderRadius,
    secureTextEntry,
    onChangeText,
    refName,
    onSubmitEditing,
    returnKeyType,
    blurOnSubmit,
    maxLength,
    multiline,
    onFocus,
    onBlur,
    isActivityLoader,
    isActive,
    inactiveBGColor,
    activeBGColor,
    activeBorderColor,
    inactiveTextColor,
    activeTextColor,
    isLeftIcon,
    leftIcon,
    leftIconStyle,
    onPressLeftIcon,
    isRightIcon,
    rightIcon,
    rightIconStyle,
    activityLoaderStyle,
    activityLoaderSize,
    activityLoaderColor,
    onPressRightIcon,
    height,
    fontSize,
    fontFamily,
    additionalTextInput,
    alignItems,
    //.......
    type,
    additionalBoxStyle,
    labelStyle,
    labelText,
    isLabelVisible,
    isHidden
}) {

    if (isHidden) return null;

    // const [isActive, setIsActive] = useState(false)

    const inputRef = useRef(null);
    // useEffect(() => {
    //     if (inputRef.current) {
    //       inputRef.current.setSelection(0, 0);
    //     }
    //   }, [inputRef]);

    const boxStyle = {
        height: 40,
        backgroundColor: "#E3F9F8",
        elevation: 1,
        borderRadius: borderRadius,
        flexDirection: 'row',
        alignItems: alignItems,
        justifyContent: 'center',
        alignItems: 'center'
    }

    const activeBoxStyle = {
        height: 40,
        backgroundColor: "#C6EFED",
        elevation: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: alignItems,
        borderColor: "#4F9F9A",
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }

    const newBoxStyle = {
        height: 40,
        // backgroundColor: "#2AE5E5",
        flexDirection: 'row',
        alignItems: alignItems,
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

    const activeNewBoxStyle = {
        height: 40,
        backgroundColor: Color.COLOR.BLACK.PURE_BLACK,
        flexDirection: 'row',
        alignItems: alignItems,
        borderColor: "#4F9F9A",
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

    const textInput = {
        height: alignItems == 'flex-start' ? height : undefined,
        fontSize: fontSize,
        color: "#479690",
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        marginLeft: isLeftIcon ? 10 : 21,
        marginRight: isRightIcon ? 10 : 21,
        flex: 1,
        textAlignVertical: 'center', // Center the text vertically
        paddingVertical: 0, // Remove vertical padding
        includeFontPadding: false // Remove extra padding from some fonts
    }

    const activeTextInput = {
        fontSize: fontSize,
        color: "#479690",
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        marginLeft: isLeftIcon ? 10 : 21,
        marginRight: isRightIcon ? 10 : 21,
        flex: 1,
        textAlignVertical: 'center', // Center the text vertically
        paddingVertical: 0, // Remove vertical padding
        includeFontPadding: false // Remove extra padding from some fonts

    }

    const newTextInput = {
        height: alignItems == 'flex-start' ? height : undefined,
        fontSize: fontSize,
        color: "#479690",
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        marginLeft: isLeftIcon ? 10 : 0,
        marginRight: isRightIcon ? 10 : 5,
        flex: 1,
        textAlignVertical: 'center', // Center the text vertically
        paddingVertical: 0, // Remove vertical padding
        includeFontPadding: false // Remove extra padding from some fonts
    }

    const activeNewTextInput = {
        fontSize: fontSize,
        color: "#479690",
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        marginLeft: isLeftIcon ? 10 : 0,
        marginRight: isRightIcon ? 10 : 5,
        flex: 1,
        textAlignVertical: 'center', // Center the text vertically
        paddingVertical: 0, // Remove vertical padding
        includeFontPadding: false // Remove extra padding from some fonts
    }



    const focusedInput = () => {
        // Clipboard.setString('');
        onFocus();
        // setIsActive(true)
    }

    const blurredInput = () => {
        onBlur();
        // setIsActive(true)
    }

    const changeText = async (value) => {
        onChangeText(value);
    }

    const onSubmit = () => {
        onSubmitEditing();
    }

    const onLeftIconPress = () => {
        onPressLeftIcon();
    }

    const onRightIconPress = () => {
        onPressRightIcon();
    }

    // const onRef = (input) => {
    //     ref(input);
    // }

    if (type == undefined || type == null) {
        return (
            <View style={[isActive ? activeBoxStyle : boxStyle, additionalBoxStyle]}>
                {isLeftIcon ?
                    <TouchableOpacity
                        onPress={() => onLeftIconPress()}
                        style={{ marginLeft: 21, alignItems: 'center', justifyContent: 'center' }}
                        activeOpacity={1}>
                        <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, leftIconStyle]} source={leftIcon} />
                    </TouchableOpacity>
                    :
                    null
                }

                <TextInput
                    style={[isActive ? activeTextInput : textInput, additionalTextInput]}
                    placeholder={placeholder}
                    placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                    value={value}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    multiline={multiline}
                    // autoComplete={"email"}
                    editable={editable}
                    onChangeText={(value) => changeText(value)}
                    ref={refName}
                    onSubmitEditing={() => onSubmit()}
                    returnKeyType={returnKeyType}
                    blurOnSubmit={blurOnSubmit}
                    onFocus={() => focusedInput()}
                    onBlur={() => blurredInput()}
                    contextMenuHidden={true}
                    selectTextOnFocus={false}
                // onSelectionChange={handleSelectionChange}

                />

                {isRightIcon ?
                    <TouchableOpacity
                        onPress={() => onRightIconPress()}
                        style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}
                        activeOpacity={1}>
                        {/* {isActivityLoader ?
                            <ActivityIndicator color={activityLoaderColor} size={activityLoaderSize} style={[{height: 20, width: 20,},activityLoaderStyle]} />
                            :
                           null
                        } */}
                        <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, rightIconStyle]} source={rightIcon} />
                    </TouchableOpacity>
                    :
                    null
                }
                {isActivityLoader ?
                    <View
                        style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ActivityIndicator color={activityLoaderColor} size={activityLoaderSize} style={[{ height: 20, width: 20, }, activityLoaderStyle]} />
                    </View>
                    :
                    null
                }
            </View>
        )
    } else {
        return (
            <>
                {isLabelVisible ?
                    <View>
                        <Text style={labelStyle}>{labelText}</Text>
                    </View>
                    :
                    null
                }

                <View style={isActive ? activeNewBoxStyle : newBoxStyle}>
                    {isLeftIcon ?
                        <TouchableOpacity
                            onPress={() => onLeftIconPress()}
                            style={{ marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}
                            activeOpacity={1}>
                            <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, leftIconStyle]} source={leftIcon} />
                        </TouchableOpacity>
                        :
                        null
                    }

                    <TextInput
                        style={[isActive ? activeNewTextInput : newTextInput, additionalTextInput]}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        value={value}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        maxLength={maxLength}
                        multiline={multiline}
                        // autoComplete={"email"}
                        editable={editable}
                        onChangeText={(value) => changeText(value)}
                        ref={refName}
                        onSubmitEditing={() => onSubmit()}
                        returnKeyType={returnKeyType}
                        blurOnSubmit={blurOnSubmit}
                        onFocus={() => focusedInput()}
                        onBlur={() => blurredInput()}
                        contextMenuHidden={true}
                        selectTextOnFocus={false}
                        height={height}
                    // onSelectionChange={handleSelectionChange}

                    />

                    {isRightIcon ?
                        <TouchableOpacity
                            onPress={() => onRightIconPress()}
                            style={{ marginRight: 0, alignItems: 'center', justifyContent: 'center' }}
                            activeOpacity={1}>
                            {/* {isActivityLoader ?
                            <ActivityIndicator color={activityLoaderColor} size={activityLoaderSize} style={[{height: 20, width: 20,},activityLoaderStyle]} />
                            :
                           null
                        } */}
                            <Image style={[{ height: 20, width: 20, resizeMode: 'contain' }, rightIconStyle]} source={rightIcon} />
                        </TouchableOpacity>
                        :
                        null
                    }
                    {isActivityLoader ?
                        <View
                            style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ActivityIndicator color={activityLoaderColor} size={activityLoaderSize} style={[{ height: 20, width: 20, }, activityLoaderStyle]} />
                        </View>
                        :
                        null
                    }
                </View>
            </>

        )
    }


}

TextInputBox.defaultProps = {
    isHidden: false,
    placeholder: "Please Enter ...",
    placeholderTextColor: Color.COLOR.GRAY.SILVER,
    value: "",
    keyboardType: "default",
    borderRadius: 0,
    editable: true,
    secureTextEntry: false,
    onChangeText: () => { },
    refName: () => { },
    onSubmitEditing: () => { },
    returnKeyType: "default",
    blurOnSubmit: true,
    maxLength: 250,
    multiline: false,
    onFocus: () => { },
    onBlur: () => { },
    isActive: false,
    inactiveBGColor: Color.COLOR.WHITE.WHITE_SMOKE,
    activeBGColor: Color.COLOR.WHITE.PURE_WHITE,
    activeBorderColor: Color.COLOR.BLACK.PURE_BLACK,
    inactiveTextColor: Color.COLOR.GRAY.DARK_GRAY_COLOR,
    activeTextColor: "#0A0A0A",
    activityLoaderColor: "#454545",
    activityLoaderSize: "large",
    isLeftIcon: false,
    leftIcon: ImageName.EMAIL,
    leftIconStyle: {
        height: 20,
        width: 20
    },
    onPressLeftIcon: () => { },
    isRightIcon: false,
    rightIcon: ImageName.SMS_NOTIFICATION,
    rightIconStyle: {
        height: 20,
        width: 20
    },
    activityLoaderStyle: {
        height: 20,
        width: 20
    },
    onPressRightIcon: () => { },
    height: 55,
    fontSize: 14,
    fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
    additionalTextInput: {},
    alignItems: 'center',
    isActivityLoader: false,
    additionalBoxStyle: {},
    labelStyle: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    labelText: "Label",
    isLabelVisible: false
};

TextInputBox.propTypes = {
    isHidden: PropTypes.bool,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    keyboardType: PropTypes.string,
    borderRadius: PropTypes.number,
    editable: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChangeText: PropTypes.func,
    refName: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    returnKeyType: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    isActive: PropTypes.bool,
    inactiveBGColor: PropTypes.string,
    activeBGColor: PropTypes.string,
    activeBorderColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    isLeftIcon: PropTypes.bool,
    activityLoaderColor: PropTypes.string,
    leftIcon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string
    ]),
    leftIconStyle: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    onPressLeftIcon: PropTypes.func,
    isRightIcon: PropTypes.bool,
    rightIcon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string
    ]),
    rightIconStyle: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    activityLoaderStyle: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    activityLoaderSize: PropTypes.string,
    onPressRightIcon: PropTypes.func,
    height: PropTypes.number,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    additionalTextInput: PropTypes.instanceOf(Object),
    alignItems: PropTypes.string,
    isActivityLoader: PropTypes.bool,
    additionalBoxStyle: PropTypes.instanceOf(Object),
    labelStyle: PropTypes.instanceOf(Object),
    labelText: PropTypes.string,
    isLabelVisible: PropTypes.bool,
};


export default TextInputBox;