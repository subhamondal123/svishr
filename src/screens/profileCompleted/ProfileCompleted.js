import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { BigTextButton, TextComponent } from '../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CommonActions } from '@react-navigation/native';
import styles from './Style';


// this is profile completed page
class ProfileCompleted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: "",

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
    }

    // this function used for navigate to home Page
    _onHome = () => {
        // this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'HomePage' }] }));
        this.props.navigation.push('HomePage')
        // this.props.navigation.navigate('HomePage')
    }
    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.textSec}>
                        <TextComponent text={this.props.route.params.loginType == "Mentor" ? "WooHoo!" : "HOORAY!"} additionalStyles={styles.hoorayText} props={this.props} />
                        <Image source={ImageName.HOORAY_IMG} style={styles.hoorayImg} />
                        {
                            this.props.route.params.loginType == "Mentor" ?
                                <TextComponent text={"You're officially a mentor!"} additionalStyles={styles.titleText} />
                                :
                                <TextComponent text={"You're officially a mentee!"} additionalStyles={styles.titleText} />

                        }
                        {
                            this.props.route.params.loginType == "Mentor" ?
                                <TextComponent text={"It's go time to make those connections and light the way!"} additionalStyles={styles.titleSummeryText} />
                                :
                                <TextComponent text={"Now, let's dive in, make some meaningful connections, and soak up that guidance!"} additionalStyles={styles.titleSummeryText} />

                        }
                    </View>
                    <View style={styles.btnSec}>
                        <BigTextButton
                            text={"Take me Home"}
                            isLinearGradient={true}
                            gradientColors={['#2AE5E5', '#008080',]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            borderRadius={30}
                            height={50}
                            fontColor={Color.COLOR.WHITE.PURE_WHITE}
                            fontFamily={FontFamily.FONTS.OPENSANS.REGULAR}
                            fontSize={FontSize.SM}
                            onPress={() => this._onHome()}
                        />
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompleted);
