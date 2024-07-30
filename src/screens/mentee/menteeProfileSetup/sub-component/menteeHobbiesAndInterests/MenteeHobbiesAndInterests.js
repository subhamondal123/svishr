import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
import { TextComponent } from '../../../../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { stateLookupData } from '../../../../../redux/SvishrAction';
import { modArrData } from './Function';
import styles from './Style';
// this is mentee hobbies and interests component 
class MenteeHobbiesAndInterests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.allData,
            pageloader: true
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();

    }

    // this is the first function where set the state data
    _load = async () => {
        let lookUpData = this.props.SvishrRedux.stateLookupData;
        let hobbiesInterestData = modArrData(lookUpData.HOBBIES);
        this.state.allData.hobbiesInterestsArr = hobbiesInterestData.hobbiesList;
        this.setState({ allData: this.state.allData });
        let hobbiesData = this.state.allData.hobbiesInterestsArr;
        let hobbiesInterestsId = this.state.allData.hobbiesInterestsId ? this.state.allData.hobbiesInterestsId.split(',').map(Number) : ""
        for (let i = 0; i < hobbiesData.length; i++) {
            for (let j = 0; j < hobbiesInterestsId.length; j++) {
                if (hobbiesData[i].id == hobbiesInterestsId[j]) {
                    hobbiesData[i].check = true
                }
            }
        }
        this.setState({ pageloader: false })
    }
    // this function used for select items 
    onSelect = (item, index) => {
        let dataHobbiesArr = this.state.allData.hobbiesInterestsArr;
        let hobbiesDataId = ""
        for (let i = 0; i < dataHobbiesArr.length; i++) {
            if (dataHobbiesArr[i].id == item.id) {
                dataHobbiesArr[i].check = true
                const hobbiesId = dataHobbiesArr.filter(item => item.check).map(item => item.id);
                hobbiesDataId = hobbiesId.join(',')
            }
        }
        this.state.allData.hobbiesInterestsArr = dataHobbiesArr;
        this.state.allData.hobbiesInterestsId = hobbiesDataId
        this.setState({ allData: this.state.allData });
        this.props.hobbiesInterests(this.state.allData.hobbiesInterestsId);

    }

    // this function used for delete selected items 
    _onDelete = (index) => {
        let dataHobbiesArr = this.state.allData.hobbiesInterestsArr;
        dataHobbiesArr[index].check = false;
        const hobbiesId = dataHobbiesArr.filter(item => item.check).map(item => item.id);
        const hobbiesDataId = hobbiesId.join(',');
        this.state.allData.hobbiesInterestsArr = dataHobbiesArr;
        this.state.allData.hobbiesInterestsId = hobbiesDataId;
        this.setState({ allData: this.state.allData });
        this.props.hobbiesInterests(this.state.allData.hobbiesInterestsId);

    }
    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {
                    this.state.pageloader ?
                        <View style={styles.loaderSec}>
                            <ActivityIndicator size="large" color={Color.COLOR.BLACK.DARK_BLACK} />
                        </View> :

                        <View style={{ marginHorizontal: '10%', marginTop: '5%' }}>
                            <View style={{ alignItems: 'center' }}>
                                <TextComponent text={"Tell us about your hobbies and interests"} additionalStyles={styles.titleText} />
                            </View>
                            <View style={styles.scrollSec}>
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
                                        {this.state.allData.hobbiesInterestsArr.map((item, index) => (
                                            <TouchableOpacity key={index} onPress={() => this.onSelect(item, index)} activeOpacity={0.7}>
                                                <View style={{ borderWidth: 1, borderRadius: 30, paddingVertical: 8, paddingHorizontal: 12, borderColor: '#008080', backgroundColor: item.check ? "#2f807f" : Color.COLOR.WHITE.PURE_WHITE, marginHorizontal: 5, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <TextComponent text={item.name} additionalStyles={{ color: item.check ? "#fff" : "#008080", fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, fontSize: FontSize.XS }} />
                                                    <View style={{ width: 5 }} />
                                                    {item.check ?
                                                        <TouchableOpacity onPress={() => this._onDelete(index)} activeOpacity={0.7}>
                                                            <Image source={ImageName.CIRCEL_CROSS} style={{ height: 15, width: 15 }} />
                                                        </TouchableOpacity>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                            <TextComponent text={this.state.allData.hobbiesError} additionalStyles={styles.errorMsgText} props={this.props} />

                        </View>
                }
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
        stateLookupData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MenteeHobbiesAndInterests);
