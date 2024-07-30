import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {
    Color,
    Dimension,
    FontFamily,
    FontSize,
    ImageName
} from '../../enums';
import { ScrollView } from 'react-native-gesture-handler';
import { modifyDataAfterSearch, modifyDropdownData } from './function';
import CommonModal from '../modal';
// import SvgComponent from '../../assets/svg';

function SingleSelectModalDropdown({
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    alignListItems,
    borderRadius,
    borderWidth,
    width,
    data,
    selectedValue,
    selectedValueType,
    aditionalTextStyle,
    aditionalDropdownViewStyle,
    aditionalMainViewStyle,
    aditionalListViewStyle,
    borderBottomWidth,
    selectedColor,
    isHidden,
    selectHeadText,
    scrollMaxHeight,
    borderBottomColor,
    onPress,
    isDisabled,
    type,
    activeOpacity,
    onChangeText,
    selectSearchText,
    loaderCheck,

    isVisible,
    containerStyle,
    headerText,
    headerTextStyle,
    isSearchable,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onClose,
    modalHeaderText,
    isApiCall,
    onSearchData,
    fetchMore,
    endReachedLoader
}) {
    if (isHidden) return null;

    const [dropdownData, setDropdownDataValue] = useState([]);
    const [searchText, setSearchText] = useState("");

    var dropdownNameArr = [];

    // modify the data with respect to the module
    if (data.length > 0) {
        var modifyData = modifyDropdownData(data, selectedValueType, selectedValue);
        selectHeadText = modifyData.headerText;
        data = modifyData.data;
        dropdownNameArr = modifyData.arrName;
    }

    useEffect(() => {
        // setDropdownDataValue(data);
        if (JSON.stringify(dropdownData) === JSON.stringify(data)) {

        } else {
            setDropdownDataValue(data);
        }
    }, [data]);

    const itemHeight = 40; // Approximate height of each item
    const maxItems = 12; // Maximum number of items to display before scrolling
    const calculatedHeight = dropdownData.length <= maxItems ? itemHeight * dropdownData.length + 100 : Dimension.height / 1.2;

    const mainWidth = width.toString() + "%";
    const listWidth = (width + 10).toString() + "%";
    const mainViewStyle = {
        width: mainWidth,
        justifyContent: 'center',
        maxHeight: calculatedHeight,
        borderRadius: borderRadius,
        backgroundColor: "#fff",
        paddingLeft: 9,
        paddingRight: 9,
        ...aditionalMainViewStyle,
    }
    const dropdownListStyle = {
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        width: listWidth,
        alignItems: alignListItems,
        ...aditionalListViewStyle,
    }

    const textStyle = {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        fontSize: FontSize.XS,
        width: '90%',
        ...aditionalTextStyle
    }

    if (type === "small") {
        textViewWidth = "87%"
        smallViewWidth = "13%"
    }

    const mainContainerStyle = {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        ...containerStyle,
    }

    const styleHeaderText = {
        ...headerTextStyle
    }

    const onSelect = (item) => {
        onPress(item);
    }

    const onSearchTextChange = async (value) => {
        setSearchText(value);   // value set by chen
        // if (isApiCall) {
        //     onSearchData(value)
        // } else {
        //     setDropdownDataValue(modifyDataAfterSearch(data, dropdownNameArr, value));   //get modify the data for dropdown
        // }

        onSearchData(value)
    }

    const onCloseModal = () => {
        onClose();
    }

    const onRequestCloseModal = () => {
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    // rendering the data
    const RenderContactList = ({ item, key }) => {
        return (
            <TouchableOpacity
                style={[dropdownListStyle, (item.check ? { backgroundColor: selectedColor, borderRadius: 10, marginTop: 1, } : { backgroundColor: "#FAFDFF", borderColor: '#747C90', borderRadius: 10, marginTop: 1, })]}
                onPress={() => onSelect(item)}
                key={key}
                activeOpacity={activeOpacity}
            >
                <Text style={[textStyle, item.check ? { color: "#479690" } : {},]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    // loader for scroll
    const renderLoader = () => {
        return endReachedLoader ? (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 100,
                }}
            >
                <ActivityIndicator
                    size="small"
                    color={Color.COLOR.GRAY.GRAY_LIGHT}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 20 }} />
        );
    };

    return (
        <CommonModal
            isVisible={isVisible}
            additionalStyles={mainContainerStyle}
            // onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            // onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={mainViewStyle}>
                    <View style={{ paddingVertical: 5, marginHorizontal: 5, flexDirection: "row" }}>
                        <Text style={[{ color: "#008080", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD, marginLeft: 5 }, styleHeaderText]} numberOfLines={1}>{modalHeaderText}</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: 25, width: 25, borderRadius: 200, marginTop: 3 }} activeOpacity={0.9} onPress={() => onCloseModal()}>
                            {/* <SvgComponent svgName={"cross"} strokeColor={"#000"} height={10} width={10} /> */}
                            <Image source={ImageName.BLACK_CROSS_ICON} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <React.Fragment>

                        {isSearchable ?
                            <View style={{ marginHorizontal: "2%", marginTop: 5 }}>
                                <TextInput
                                    value={searchText}
                                    style={{
                                        height: 40,
                                        width: mainWidth,
                                        paddingLeft: 10,
                                        borderRadius: 10,
                                        paddingRight: 30,
                                        fontSize: FontSize.MD,
                                        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
                                        color: "#479690",
                                        fontFamily: FontFamily.FONTS.MONTSERRAT.LIGHT,
                                        borderWidth: 1,
                                        backgroundColor: "#C6EFED",
                                        borderColor: "#4F9F9A",
                                    }}
                                    placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                    placeholder="Search..."
                                    keyboardType="name-phone-pad"
                                    onChangeText={onSearchTextChange}
                                />
                            </View>
                            :
                            null
                        }
                        <View style={{ marginTop: 5, flex: 1, }}>
                            {loaderCheck ?
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} style={{ marginTop: 10, marginBottom: 10 }} /> :
                                <FlatList
                                    style={{ maxHeight: scrollMaxHeight }}
                                    data={dropdownData}
                                    renderItem={(item, key) => RenderContactList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    onEndReachedThreshold={0.1}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    onEndReached={fetchMore}
                                    ListFooterComponent={renderLoader}
                                />
                            }
                        </View>
                    </ React.Fragment>
                    {/* } */}
                </View>
            }
        />
    )
}

SingleSelectModalDropdown.defaultProps = {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignListItems: "flex-start",
    borderRadius: 0,
    borderWidth: 0,
    width: 100,
    selectItemAlign: "flex-start",
    data: [],
    selectedValue: "0",
    selectedValueType: "id",    //type can be "id" or "name"
    aditionalMainViewStyle: {},
    aditionalTextStyle: {},
    aditionalDropdownViewStyle: {},
    aditionalListViewStyle: {},
    borderBottomWidth: 1,
    selectedColor: '#FAFDFF',
    selectHeadText: "Select",
    scrollMaxHeight: 250,
    borderBottomColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
    onPress: () => { },
    isDisabled: false,
    type: "big",
    activeOpacity: 0.8,
    selectTextColor: Color.COLOR.GRAY.ROUND_CAMEO,
    aditionalSelectTextStyle: {},
    onChangeText: () => { },
    selectSearchText: "",
    loaderCheck: false,

    isVisible: false,
    containerStyle: {},
    headerText: "",
    headerTextStyle: {},
    isSearchable: false,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onClose: () => { },
    modalHeaderText: "Select",
    isApiCall: false,
    onSearchData: () => { },
    fetchMore: () => { },
    endReachedLoader: false
};

SingleSelectModalDropdown.propTypes = {
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    alignListItems: PropTypes.string,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.array.isRequired,
    selectedValue: PropTypes.string,
    selectedValueType: PropTypes.string,
    dropdownUpImg: PropTypes.number,
    dropdownDownImg: PropTypes.number,
    aditionalMainViewStyle: PropTypes.instanceOf(Object),
    aditionalTextStyle: PropTypes.instanceOf(Object),
    aditionalDropdownViewStyle: PropTypes.instanceOf(Object),
    aditionalListViewStyle: PropTypes.instanceOf(Object),
    borderBottomWidth: PropTypes.number,
    selectedColor: PropTypes.string,
    selectHeadText: PropTypes.string,
    scrollMaxHeight: PropTypes.number,
    borderBottomColor: PropTypes.string,
    onPress: PropTypes.func,
    isDisabled: PropTypes.bool,
    type: PropTypes.string,
    activeOpacity: PropTypes.number,
    onChangeText: PropTypes.func,
    selectSearchText: PropTypes.string,
    loaderCheck: PropTypes.bool,
    isHidden: PropTypes.bool,

    isVisible: PropTypes.bool,
    containerStyle: PropTypes.instanceOf(Object),
    headerText: PropTypes.string,
    headerTextStyle: PropTypes.instanceOf(Object),
    isSearchable: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onClose: PropTypes.func,
    modalHeaderText: PropTypes.string,
    isApiCall: PropTypes.bool,
    onSearchData: PropTypes.func,
    fetchMore: PropTypes.func,
    endReachedLoader: PropTypes.bool
};


export default SingleSelectModalDropdown;