import { PropTypes } from 'prop-types';
import React, { useState } from 'react'
import { Modal, TextButton } from '../';
import styles from './Style';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../enums';

function WarningModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    isHidden,
    isLoading,
    onOK,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    warningHeaderText
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing



    const _onClose = () => {
        onCloseModal();
    }

    const _onOk = () => {
        onOK();
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


    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <React.Fragment>
                        <View style={styles.modalHeaderSec}>
                            <View style={styles.crossImgSec}>
                                <Image source={ImageName.CHANGE_PASSWORD_ICON} style={styles.redCrossImg} />
                            </View>
                        </View>
                        {isLoading ?
                            <View style={styles.pageLoaderViewStyle}>
                                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                            </View>
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles.modalMainMarginSec}>
                                    <Text style={styles.headerModalText}>{warningHeaderText}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: '10%', justifyConfor: 'center', alignContent: 'center', }}>
                                        <TouchableOpacity style={styles.cancelButton}
                                            onPress={() => _onClose()}
                                            activeOpacity={0.9}>
                                            <Text style={styles.cancelText}>Cancle</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: '5%' }} />
                                        <TouchableOpacity style={styles.logoutButton} onPress={() => _onOk()} activeOpacity={0.9}>
                                            <Text style={styles.cancelText}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        }
                    </React.Fragment>
                </View>
            }
        />
    );
}

WarningModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    isLoading: false,
    onOK: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    warningHeaderText: "",
};

WarningModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onOK: PropTypes.func,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    warningHeaderText: PropTypes.string
};


export default WarningModal;