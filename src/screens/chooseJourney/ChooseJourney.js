import React, { Component } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Style';
import { BigTextButton, ImageUploadModal, TextComponent } from '../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FileUpload } from '../../services/common-view-function';

// this is choose journey page
class ChooseJourney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasUnsavedChanges: true
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this.props.navigation.addListener('beforeRemove', (e) => {
            if (!this.state.hasUnsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
        })
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
    }

    // this function used for navigate mentor login page
    _onMentor = (type) => {
        // this.props.navigation.navigate("MentorSignUp", { userTypeId: 2, loginType: type });
        this.props.navigation.push("MentorSignUp", { userTypeId: 2, loginType: type });

    }

    // this function used for navigate  mentee login page
    _onMentee = (type) => {
        // this.props.navigation.navigate("MenteeSignUp", { userTypeId: 3, loginType: type });
        this.props.navigation.push("MenteeSignUp", { userTypeId: 3, loginType: type });

    }
    onLogin = (type) => {
        // this.props.navigation.navigate("LoginPage", { loginType: type });

        this.props.navigation.push("LoginPage", { loginType: type })
    }

    // this is choose journey design Sec
    chooseJourneySec = () => {
        return (
            <LinearGradient colors={['#2AE5E5', '#008080',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: Dimension.height }} >
                <View style={{ marginTop: 35, justifyContent: 'center', alignItems: 'center' }}>
                    <TextComponent text={"Choose your Journey"} additionalStyles={styles.chooseJourneyText} props={this.props} />
                    <View style={styles.buttonView}>
                        <BigTextButton
                            backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                            text={"Mentor"}
                            fontColor={"#008080"}
                            borderRadius={24}
                            height={50}
                            fontFamily={FontFamily.FONTS.MONTSERRAT.REGULAR}
                            onPress={() => this._onMentor("Mentor")}
                        />
                        <View style={{ width: 20 }} />
                        <BigTextButton
                            backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                            text={"Mentee"}
                            fontColor={"#008080"}
                            borderRadius={24}
                            height={50}
                            fontFamily={FontFamily.FONTS.MONTSERRAT.REGULAR}
                            onPress={() => this._onMentee("Mentee")}
                        />
                    </View>
                    <View style={{ height: Dimension.height / 25 }} />
                    <View style={styles.logInSec}>
                        <TextComponent text={"Already have an account? "} additionalStyles={styles.accountText} props={this.props} />
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.onLogin("Login")} >
                            <TextComponent text={"Login"} additionalStyles={styles.logInText} props={this.props} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        )
    }


    // this is the main render function to this page 
    render() {
        return (
            <SafeAreaView style={styles.contain}>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={styles.marginSec}>
                    <TextComponent text={"SvishR!"} additionalStyles={styles.svishrText} props={this.props} />
                </View>
                <ImageBackground source={ImageName.MENTOR_MENTEE_IMAGE} resizeMode='cover' style={styles.imageSec} >
                    <View style={styles.rowSec}>
                        <TextComponent text={"a platform that fosters growth, knowledge sharing, and meaningful connections."} additionalStyles={styles.platfromText} props={this.props} />
                        <View style={{ flex: 1 }} />
                    </View>
                </ImageBackground>
                {this.chooseJourneySec()}
                {/* </ScrollView> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseJourney);





