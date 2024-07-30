import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator
} from 'react-native';
import {
    Color,
    FontFamily,
    FontSize,
    ImageName,
    Padding,

} from '../../enums';


function TextComponent({
    fontSize,
    fontColor,
    fontFamily,
    text,
    additionalStyles,
    props,
    numberOfLines
}) {

    const buttonText = {
        fontSize: fontSize,
        color: fontColor,
        fontFamily: fontFamily
    }


    return (
        <Text numberOfLines={numberOfLines} style={[buttonText, { ...additionalStyles }]}>{text}</Text>
    )
}

TextComponent.defaultProps = {
    fontSize: FontSize.MD,
    fontColor: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
    text: "",
    additionalStyles: {},
    numberOfLines: 0

};

TextComponent.propTypes = {
    fontSize: PropTypes.number,
    fontColor: PropTypes.string,
    fontFamily: PropTypes.string,
    text: PropTypes.string,
    additionalStyles: PropTypes.instanceOf(Object),
    numberOfLines: PropTypes.number
};


export default TextComponent;