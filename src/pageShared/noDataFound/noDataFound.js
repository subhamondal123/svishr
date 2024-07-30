
import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import styles from './style';
import { Color, FontFamily, FontSize, ImageName } from '../../enums';
import { Image, View, Text } from 'react-native';
import { TextComponent } from '../../shared';

function NoDataFound({
    text,
    typesItem
}) {
    // if (isHidden) return null;
    return (
        <View style={styles.imageContainer}>
            <Image style={styles.imageGroup2} source={ImageName.SAD_LOGO} />
            {typesItem && (
                <Image style={styles.imageGroup1} source={ImageName.NO_DATA_FOUND} />
            )}
            <TextComponent text={text} additionalStyles={{ fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
        </View>

    );
}

NoDataFound.defaultProps = {
    text: "",
    typesItem: true

};

NoDataFound.propTypes = {
    text: PropTypes.string,
    typesItem: PropTypes.bool

};


export default NoDataFound;
