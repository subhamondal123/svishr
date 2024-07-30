import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import {
    Color,
    Dimension,
    FontFamily,
    FontSize,
    ImageName,
    Padding
} from '../../enums';
import { SingleSelectModalDropdown } from '../';
import SvgComponent from '../../assets/svg';

function DropdownInputBox({
    height,
    selectedText,
    selectedTextColor,
    unSelectedTextColor,
    selectedValue,
    selectedValueType,
    data,
    upDownImages,
    upDownImgStyle,
    isDisabled,
    onSelect,
    headerText,
    borderRadius,
    isBackButtonPressRequired,
    isBackdropPressRequired,
    isSearchable,
    onChangeSearch,
    modalHeaderText,
    selectedColor
}) {

    const [modalVisible, setModalVisible] = useState(false);

    const inputBoxStyle = {
        height: height,
        backgroundColor: "#E3F9F8",
        elevation: 1,
        borderRadius: borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
    }

    const inputBoxText = {
        fontSize: 14,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        marginLeft: 25,
        marginRight: 10,
        flex: 1,
        // color: "#888"
    }


    const onOpenAndCloseModal = () => {
        if (isDisabled == false) {
            setModalVisible(!modalVisible);
        }
    }

    const onSelectData = async (value) => {
        await onSelect(value);

        onOpenAndCloseModal();
    }

    const onBackButtonPress = () => {
        if (isBackButtonPressRequired) {
            onOpenAndCloseModal();
        }
    }

    const onRequestClose = () => {
        if (isBackButtonPressRequired) {
            onOpenAndCloseModal();
        }
    }

    const onBackdropPress = () => {
        if (isBackdropPressRequired) {
            onOpenAndCloseModal();
        }
    }
    const onSearch = async (value) => {
        onChangeSearch(value)
    }
    let findData = false;
    for (let i = 0; i < data.length; i++) {
        if (selectedValueType == "id") {
            if (data[i].id == selectedValue) {
                headerText = data[i].name;
                findData = true;
                break;
            }
        } else {
            if (data[i][selectedValueType] == selectedValue) {
                headerText = data[i].name;
                findData = true;
                break;
            }
        }
    }

    return (
        <>
            <TouchableOpacity style={inputBoxStyle} onPress={() => onOpenAndCloseModal()} activeOpacity={0.9} disabled={isDisabled}>
                <Text style={[inputBoxText, { color: findData == true ? selectedTextColor : unSelectedTextColor }]} numberOfLines={1}>{headerText}</Text>
                <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Image style={[{ height: 15, width: 15, resizeMode: 'contain' }, upDownImgStyle]} source={modalVisible ? upDownImages[0] : upDownImages[1]} /> */}
                    <SvgComponent svgName={"dropdown"} strokeColor={"#2f807f"} height={15} width={15} />
                </View>
            </TouchableOpacity>
            <SingleSelectModalDropdown
                isSearchable={isSearchable}
                selectedValue={selectedValue}
                selectedValueType={selectedValueType}
                data={data}
                onPress={(value) => onSelectData(value)}
                isVisible={modalVisible}
                // headerText={headerText}
                borderRadius={borderRadius}
                onClose={() => onOpenAndCloseModal()}
                onBackButtonPress={() => onBackButtonPress()}
                onBackdropPress={() => onBackdropPress()}
                onRequestClose={() => onRequestClose()}
                onSearchData={(value) => onSearch(value)}
                modalHeaderText={modalHeaderText}
                selectedColor={selectedColor}
                scrollMaxHeight={Dimension.height /1.5}
                aditionalMainViewStyle={{flex:1}}
                
            />
        </>
    )
}


DropdownInputBox.defaultProps = {
    height: 45,
    selectedText: "",
    selectedTextColor: "#0A0A0A",
    unSelectedTextColor: "#C0C0C0",
    selectedValue: "",
    selectedValueType: "id",
    data: [],
    upDownImages: [
        ImageName.BLACK_UP_ARROW,
        ImageName.BLACK_DOWN_ARROW
    ],
    upDownImgStyle: {},
    isDisabled: false,
    onSelect: () => { },
    onChangeSearch: () => { },
    headerText: "",
    borderRadius: 15,
    isBackButtonPressRequired: false,
    isBackdropPressRequired: false,
    isSearchable: false,
    modalHeaderText: "Select",
    selectedColor: "",
};

DropdownInputBox.propTypes = {
    height: PropTypes.number,
    selectedText: PropTypes.string,
    selectedTextColor: PropTypes.string,
    unSelectedTextColor: PropTypes.string,
    selectedValue: PropTypes.string,
    selectedValueType: PropTypes.string,
    data: PropTypes.array.isRequired,
    upDownImages: PropTypes.array.isRequired,
    upDownImgStyle: PropTypes.instanceOf(Object),
    isDisabled: PropTypes.bool,
    onSelect: PropTypes.func,
    onChangeSearch: PropTypes.func,
    headerText: PropTypes.string,
    borderRadius: PropTypes.number,
    isBackButtonPressRequired: PropTypes.bool,
    isBackdropPressRequired: PropTypes.bool,
    isSearchable: PropTypes.bool,
    modalHeaderText: PropTypes.string,
    selectedColor: PropTypes.string
};


export default DropdownInputBox;