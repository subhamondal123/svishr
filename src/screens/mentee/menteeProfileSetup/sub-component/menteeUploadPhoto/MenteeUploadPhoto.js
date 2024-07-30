import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
import { ImageUploadModal, Modal, TextComponent } from '../../../../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SvgComponent from '../../../../../assets/svg';
import { FileUpload } from '../../../../../services/common-view-function';
import { App_uri } from '../../../../../services/config';
import { MiddlewareFileCheck } from '../../../../../services/middleware';
import { ErrorCode } from '../../../../../services/constant';
import styles from './Style';

// this is mentee upload photo component 
class MentorUploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.allData,
            isVisible: false,
            avaterData: []

        }
    }
    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let lookUpData = this.props.SvishrRedux.stateLookupData;
        this.state.avaterData = lookUpData.AVATAR_PROFILE
        this.setState(this.state)
    }
    // this function used for upload profile 
    _onProfileUpload = (value) => {
        this.state.allData.visibleProfileImgUploadModal = value
        this.setState({ allData: this.state.allData });
    }
    // this is function used for close profile upload modal 
    _onCloseModal = () => {
        this.setState({ visibleProfileImgUploadModal: false })
    }
    // this function used for implementation of image upload 
    _imageUploadModalSection = () => {
        const OnChooseGallery = async () => {
            this._onProfileUpload();
            let uploadData = await FileUpload.uploadImg();
            this.state.allData.profileImg = uploadData
            this.state.allData.visibleProfileImgUploadModal = false
            this.setState({ allData: this.state.allData });
            await this.ImageUploadApiCall(uploadData);
        };
        const OnChooseCamera = async () => {
            this.setState({ cameraVisible: true });
        };
        return (
            <ImageUploadModal
                isVisible={this.state.allData.visibleProfileImgUploadModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={() => this._onProfileUpload(false)}
            />
        );
    };
    // this function used for open image upload modal 
    onOpenModal = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }
    // this function used for image upload api call 
    ImageUploadApiCall = async (uploadData) => {
        this.state.allData.profileImgLoader = true;
        this.setState({ allData: this.state.allData });
        let imgData = await MiddlewareFileCheck("imageupload", uploadData, this.props);
        if (imgData) {
            if (imgData.error === ErrorCode.ERROR.ERROR_CODE.ERROR_STATUS) {
                this.state.allData.profileImg = imgData.data.filename;
                this.state.allData.profileRaw = imgData.data.url;
                this.setState({ allData: this.state.allData });
                this.props.onImageChange(this.state.allData.profileRaw);
            }
        }
        this.state.allData.profileImgLoader = false;
        this.setState({ allData: this.state.allData });
    }
    _onAvatarUpload = (item) => {
        this.state.allData.profileRaw = item.others;
        this.state.allData.profileImgError = "";
        this.setState({ allData: this.state.allData });
        this.setState({ isVisible: false })
    }
    // this function used for implementation of avatar modal section 
    avatarMOdalSec = () => {
        return (
            <Modal
                isVisible={this.state.isVisible}
                onBackdropPress={() => this.onOpenModal()}
                onBackButtonPress={() => this.onOpenModal()}
                onRequestClose={() => this.onOpenModal()}
                children={
                    <View style={{
                        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
                        // paddingBottom: 30,
                        borderRadius: 12,
                        maxHeight: Dimension.height,
                        right: 0,
                        left: 0,
                        marginHorizontal: "10%"
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    this.state.avaterData.map((item, index) => (
                                        <TouchableOpacity key={index} style={{ backgroundColor: '#E3F9F8', borderRadius: 240, height: 90, width: 90, alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 10 }} onPress={() => this._onAvatarUpload(item)} activeOpacity={0.7}>
                                            <Image source={{ uri: App_uri.IMAGE_VIEW_URI + item.others }} style={{ height: 90, width: 90, resizeMode: 'contain', borderRadius: 240 }} />
                                        </TouchableOpacity>

                                    ))
                                }
                            </View>
                        </ScrollView>

                    </View>
                }
            />
        )
    }
    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._imageUploadModalSection()}
                {this.avatarMOdalSec()}
                <View style={{ marginHorizontal: '10%', marginTop: '10%' }}>
                    <TextComponent text={"Let's add a personal touch!Upload your profile picture"} additionalStyles={styles.titleText} props={this.props} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.allData.profileRaw.length > 0 ?
                            <TouchableOpacity style={styles.profileUploadTab} onPress={() => this._onProfileUpload(true)} activeOpacity={0.7}>
                                {this.state.allData.profileImgLoader ?
                                    <View style={styles.loaderSec}>
                                        <ActivityIndicator size="small" color={Color.COLOR.BLUE.VIOLET_BLUE} />
                                    </View> :
                                    <Image source={{ uri: App_uri.IMAGE_VIEW_URI + this.state.allData.profileRaw }} style={styles.imgStyle} />
                                }
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.profileUploadTab} onPress={() => this._onProfileUpload(true)} activeOpacity={0.7}>
                                <SvgComponent svgName={"plus"} strokeColor={"#2f807f"} height={30} width={30} />
                            </TouchableOpacity>
                        }
                        <TextComponent text={this.state.allData.profileImgError} additionalStyles={styles.errorMsgText} props={this.props} />
                        <View style={{ height: Dimension.height / 25 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TextComponent text={'Prefer to use '} additionalStyles={styles.avaterTitleText} props={this.props} />
                            <TouchableOpacity onPress={() => this.onOpenModal()} activeOpacity={0.7}>
                                <TextComponent text={'avatar '} additionalStyles={styles.avaterText} props={this.props} />
                            </TouchableOpacity>
                            <TextComponent text={'instead?'} additionalStyles={styles.avaterTitleText} props={this.props} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { SvishrRedux } = state
    return { SvishrRedux }

};

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MentorUploadPhoto);