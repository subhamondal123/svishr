
import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, TouchableWithoutFeedback, Modal, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle, interpolate, ReduceMotion } from 'react-native-reanimated';
import styles from './style';
import { Color, ImageName } from '../../enums';
import SvgComponent from '../../assets/svg';
import { modifyDropdownData } from './function';
import TextInputBox from '../text-input-box';


function DropDown({
    options,
    onSelect,
    padding,
    height,
    Heading,
    endReachedLoader,
    modalHeaderText,
    selectedValue,
    selectedValueType,
    headerText,
    onChangeText,
    isSearchable,
    value,
    placeholder,


}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    const [dropdownData, setDropdownDataValue] = useState([]);

    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef(null);

    const translateY = useSharedValue(0);
    const animation = useSharedValue(0);


    var dropdownNameArr = [];
    // modify the data with respect to the module
    if (options.length > 0) {
        var modifyData = modifyDropdownData(options, selectedValueType, selectedValue);
        selectHeadText = modifyData.headerText;
        options = modifyData.data;
        dropdownNameArr = modifyData.arrName;
    }

    useEffect(() => {
        if (JSON.stringify(dropdownData) === JSON.stringify(options)) {
        } else {
            setDropdownDataValue(options);
        }
    }, [options]);

    const toggleDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
            animation.value = 0;
        } else {
            dropdownRef.current.measure((fx, fy, width, height, px, py) => {
                setModalPosition({ top: py + height, left: px, width });
            });
            setIsOpen(prevState => !prevState);
            // animation.value = 1;
            animation.value = withTiming(isOpen ? 0 : 1, {
                duration: 500,
                easing: Easing.out(Easing.ease),
            });
        }

    };

    const handleSelectOption = (item) => {
        setSelectedOption(item); 
        toggleDropdown();
        onSelect(item);
    };

    const animatedOptionContainerStyle = useAnimatedStyle(() => {
        const ITEM_HEIGHT = 40;
        const itemHeight = ITEM_HEIGHT * (dropdownData.length < 5 ? dropdownData.length : 5);
        const height = interpolate(animation.value, [0, 1], [0, itemHeight]);
        const elevation = interpolate(animation.value, [0, 1], [0, 5]);
        return {
            height: withTiming(height, {
                duration: 500,
                easing: Easing.out(Easing.ease),
                reduceMotion: ReduceMotion.System,
            }),
            elevation: elevation,
        };
    }, [isOpen, dropdownData]);

    let findData = false;
    for (let i = 0; i < options.length; i++) {
        if (selectedValueType == "id") {
            if (options[i].id == selectedValue) {
                headerText = options[i].name;
                findData = true;
                break;
            }
        } else if (selectedValueType == "name") {
            if (options[i].name == selectedValue) {
                headerText = options[i].name;
                findData = true;
                break;
            }
        }
    }

    const changeText = async (value) => {
        onChangeText(value);
    }
    return (
        // <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableOpacity
                ref={dropdownRef}
                activeOpacity={1}
                onPress={toggleDropdown}

                style={[isOpen ? styles.headerOpen : styles.headerClosed,
                {
                    borderColor: isOpen ? "#E3F9F8" : (selectedOption.name != headerText ? "#E3F9F8" : "#479690"),
                },

                { padding }

                ]}

            >
                <Text style={[selectedOption.name === headerText ? styles.headerText3 : styles.headerText2]}>{headerText}</Text>
                <SvgComponent svgName={"dropdown"} strokeColor={"#2f807f"} height={15} width={15} />
            </TouchableOpacity>
            {
                isOpen && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isOpen}
                        onRequestClose={() => setIsOpen(!isOpen)}
                    >
                        <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
                            <View style={styles.modalOverlay}>
                                <View style={[styles.modalContent, { top: modalPosition.top, left: modalPosition.left, width: modalPosition.width }]}>
                                    <View style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}>
                                        {
                                            isSearchable ?

                                                <TextInputBox
                                                    onChangeText={(value) => changeText(value)}
                                                    value={value}
                                                    placeholder={placeholder}

                                                />
                                                :
                                                null
                                        }

                                        <Animated.View style={[styles.dropdown, animatedOptionContainerStyle]}>
                                            <FlatList
                                                data={dropdownData}
                                                keyExtractor={(item) => item.id.toString()}
                                                renderItem={({ item }) => (
                                                    <View style={[styles.optionContainer]}>
                                                        <TouchableOpacity
                                                            style={styles.option}
                                                            onPress={() => {
                                                                handleSelectOption(item);
                                                            }}
                                                        >
                                                            <Text style={styles.optionText}>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                        </Animated.View>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )
            }
        </KeyboardAvoidingView>
        // </View >
    )


}

DropDown.defaultProps = {
    onSelect: () => { },
    options: [],
    padding: 20,
    endReachedLoader: false,
    modalHeaderText: "Select",
    selectedValue: "0",
    selectedValueType: "id",
    headerText: "",
    onChangeText: () => { },
    isSearchable: true,
    value: "",
};

DropDown.propTypes = {
    onSelect: PropTypes.func,
    options: PropTypes.array,
    padding: PropTypes.number,
    endReachedLoader: PropTypes.bool,
    modalHeaderText: PropTypes.string,
    selectedValue: PropTypes.string,
    selectedValueType: PropTypes.string,
    headerText: PropTypes.string,
    onChangeText: PropTypes.func,
    isSearchable: PropTypes.bool,
    value: PropTypes.string,

};


export default DropDown;



































