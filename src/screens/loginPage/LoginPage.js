import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MenteeLogin, MentorLogin } from './sub-component';
import { Header } from '../../pageShared';
import styles from './Style';
import { TextComponent } from '../../shared';


// this is login page 
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelect: false,
            type: this.props.route.params ? this.props.route.params.loginType : this.props.route.loginType,
            pageNum: this.props.route.params ? this.props.route.params && this.props.route.params.loginType == "Mentee" ? 2 : 1 : this.props.route.loginType == "Mentee" ? 2 : 1,
            allData: {},
            hasUnsavedChanges: false,
            examStart: false,
            isAbort: false,

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
    }

    // this function used for back button press
    _onBack = () => {
        // if (this.props.route.params) {
        //     this.props.navigation.goBack()
        // } else {
        //     this.props.navigation.addListener('beforeRemove', (e) => {
        //         if (!this.state.hasUnsavedChanges) {
        //             return;
        //         }
        //         e.preventDefault();
        //         if (this.state.examStart && !this.state.isAbort) {
        //         } else {
        //             this.props.navigation.dispatch(e.data.action);
        //         }
        //     });
        // }

    }

    // here  tab button selected
    onTabSelect = (type) => {
        let pageNumber = type == "Mentee" ? 2 : 1;
        switch (type) {
            case "Mentor":
                pageNumber = 1;
                break;
            case "Mentee":
                pageNumber = 2;
                break;
        }
        this.setState({
            pageNum: pageNumber,
        });
    }

    // this is tab section design implement here
    tabSection = () => {
        return (
            <View style={styles.tabSec}>
                <TouchableOpacity style={{ width: "45%", height: "100%", borderTopLeftRadius: 30, borderBottomLeftRadius: 30, borderWidth: this.state.pageNum == 1 ? 1 : 1, borderColor: this.state.pageNum == 1 ? '#008080' : '#008080', borderRightWidth: 0 }} onPress={() => this.onTabSelect("Mentor")} activeOpacity={0.7}>
                    <LinearGradient colors={this.state.pageNum == 1 ? ['#47b8b8', '#008080'] : ['#FFFFFF', '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 15, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 20 }}>

                            {
                                this.state.pageNum == 1 ?
                                    <Image source={ImageName.TICK_IMAGE} style={styles.imageTick} />
                                    : null
                            }
                            <TextComponent text={"Mentor"} additionalStyles={{ textAlign: 'center', color: this.state.pageNum == 1 ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD, fontSize: FontSize.XS }} props={this.props} />

                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "45%", height: "100%", borderTopRightRadius: 30, borderBottomRightRadius: 30, borderWidth: this.state.pageNum == 2 ? 1 : 1, borderColor: this.state.pageNum == 2 ? '#008080' : '#008080', borderLeftWidth: 0 }} onPress={() => this.onTabSelect("Mentee")} activeOpacity={0.7}>
                    <LinearGradient colors={this.state.pageNum == 2 ? ['#47b8b8', '#008080'] : ['#FFFFFF', '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 15, borderTopRightRadius: 30, borderBottomRightRadius: 30, }} >

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 20 }}>
                            {
                                this.state.pageNum == 2 ?
                                    <Image source={ImageName.TICK_IMAGE} style={styles.imageTick} />
                                    : null
                            }
                            <TextComponent text={"Mentee"} additionalStyles={{ textAlign: 'center', color: this.state.pageNum == 2 ? Color.COLOR.WHITE.PURE_WHITE : Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD, fontSize: FontSize.XS }} props={this.props} />

                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    // this is the main render function this page 
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.containView}>
                <SafeAreaView style={styles.containView}>
                    <Header {...this.props} goBack={() => this._onBack()} />
                    {this.tabSection()}
                    <View style={{}}>
                        {this.state.pageNum == 1 ?
                            <MentorLogin  {...this.props} userType={this.state.type} />
                            :
                            null}
                        {this.state.pageNum == 2 ?
                            <MenteeLogin {...this.props} userType={this.state.type} />
                            :
                            null
                        }
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);


