import React, { Component } from 'react';
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { TextComponent, TextInputBox } from '../../../../../shared';
import { Color, Dimension, FontFamily, FontSize } from '../../../../../enums';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from './Style';

// this is mentee story component
class MenteeStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.allData,
            isActive: false


        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {

    }
    // this is the story text onChange function 
    _onStoryTextChange = (value) => {
        this.state.allData.storyText = value;
        this.setState({ allData: this.state.allData });
        this.props.storyText(this.state.allData.storyText)
    }
    // this is the input focus function 
    focusedInput = () => {
        this.setState({ isActive: true })
    }
    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleTextSec}>
                    <TextComponent text={"Craft your story, captivate connections"} additionalStyles={styles.titleText} />
                </View>
                <View style={{ marginBottom: 8 }} />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: '10%', }}>
                        <View style={[styles.storyInputSec, { backgroundColor: this.state.isActive ? "#C6EFED" : "#E3F9F8", borderWidth: this.state.isActive ? 0.5 : 0, }]}>
                            <TextInput style={styles.inputStyle}
                                placeholder={"Enter your Story"}
                                placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                value={this.state.allData.storyText}
                                onChangeText={(value) => this._onStoryTextChange(value)}
                                maxLength={250}
                                multiline={true}
                                onFocus={() => this.focusedInput()}
                            />
                        </View>
                        <TextComponent text={this.state.allData.storyError} additionalStyles={styles.errorMsgText} props={this.props} />

                        <View style={{ alignItems: 'flex-end' }}>
                            <TextComponent text={this.state.allData.storyText.length + "/250"} additionalStyles={styles.countText} />
                        </View>

                    </View>
                    <View style={{ marginBottom: 300 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MenteeStory);
