import React, { Component } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from 'react-native'
import { AlertMessage, Color, Dimension } from '../../../enums'
import LinearGradient from 'react-native-linear-gradient'
import { PlayCircularProgress } from '../../../shared'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { stateLookupData } from '../../../redux/SvishrAction';
import { Header } from '../../../pageShared'
import { MenteeBit, MenteeUploadPhoto, MenteeStory, MennteeAcademicJourney, ChooseCountryAndUniversity, MenteeHobbiesAndInterests, MenteeAcademicJourney, MenteeCountryAndUniversities } from './sub-component'
import { StorageDataModification, Toaster } from '../../../services/common-view-function'
import { MiddlewareCheck } from '../../../services/middleware'
import { ErrorCode } from '../../../services/constant'
import { modDateData, modProfileInfoData } from './Function'
import styles from './Style'

const phonePattern = /^\d{10}$/;

// this is mentor profile set up page 
class MenteeProfileSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComponentIndex: 0,
            progress: 100 / 6,
            userData: {},
            type: this.props.route.params ? this.props.route.params.type : this.props.route.type,
            allData: {
                profileInfoData: [],
                fullNameText: "",
                phoneText: "",
                genderArr: [],
                selectedGenderObj: {},
                nationalityArr: [],
                selectedNationalityObj: {},
                profileImg: "",
                profileImgLoader: false,
                profileRaw: "",
                visibleProfileImgUploadModal: false,
                countryArr: [],
                selectCountryObj: {},
                universityArr: [],
                selectedUniversityObj: {},
                degreeArr: [],
                selectedDegreeObj: {},
                fieldArr: [],
                selectedFieldObj: {},
                specializationArr: [],
                selctedSpecializationObj: {},
                expectedGraduationText: "",
                hobbiesInterestsArr: [],
                hobbiesInterestsId: "",
                storyText: "",
                selectedUniversity: [],
                selectedUniversitiesId: [],
                profileInfoUniversitiesId: [],
                buttonLoader: true,
                hasUnsavedChanges: true,
                nameError: "",
                phoneError: "",
                genderError: "",
                nationalityError: "",
                profileImgError: "",
                countryError: "",
                universityError: "",
                degreeError: "",
                fieldError: "",
                specializationError: "",
                expectedGraduationError: "",
                hobbiesError: "",
                storyError: "",
                isAlreadySelected: false,
                selectedDateObj: {},
                yearData: [],
                yearId: ""
            }

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        if (this.state.type != "profile") {
            this.props.navigation.addListener('beforeRemove', (e) => {
                if (!this.state.allData.hasUnsavedChanges) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    // console.log("helloo")
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                // console.log("alrervdhcg")
            })
        }
        let userData = await StorageDataModification.userData({}, "get")
        this.state.userData = userData;
        this.setState(this.state);
        this._load();
    }
    // componentWillUnmount = () => {
    //     if (this.unsubscribe) {
    //         this.unsubscribe();
    //     }
    // }
    // this is the first function where set the state data
    _load = async () => {
        function getPrevious12MonthsDates() {
            const dates = [];
            const currentDate = new Date();

            for (let i = 0; i < 10; i++) {
                const date = new Date(currentDate.getFullYear() + i, currentDate.getMonth(), currentDate.getDate());
                const formattedDate = date.toISOString().split('T')[0];
                const Yeardate = new Date(formattedDate);
                const year = Yeardate.getFullYear();
                dates.push(year);
            }

            return dates;
        }

        let modData = modDateData(getPrevious12MonthsDates())
        this.state.allData.yearData = modData
        this.setState(this.state)

        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId
        }
        let responseData = await MiddlewareCheck("getProfileInfoForUpdate", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.profileInfoData = modProfileInfoData(responseData.data.userInfo)
                let yearData = this.state.allData.yearData

                for (let i = 0; i < yearData.length; i++) {
                    if (yearData[i].name == this.state.allData.profileInfoData.expectedGraduation) {
                        this.state.allData.yearId = yearData[i].id
                        this.state.allData.selectedDateObj = yearData[i]
                        this.setState(this.state)
                    }

                }
                let profileUniversity = this.state.allData.profileInfoData.university ? this.state.allData.profileInfoData.university.split(',').map(Number) : null;
                this.state.allData.fullNameText = this.state.allData.profileInfoData.name
                this.state.allData.phoneText = this.state.allData.profileInfoData.phone
                this.state.allData.selectedGenderObj.id = this.state.allData.profileInfoData.gender
                this.state.allData.selectedNationalityObj.id = this.state.allData.profileInfoData.nationality
                this.state.allData.profileRaw = this.state.allData.profileInfoData.profileImgUrl ? this.state.allData.profileInfoData.profileImgUrl : ""
                this.state.allData.selectCountryObj.id = this.state.allData.profileInfoData.country
                this.state.allData.profileInfoUniversitiesId = profileUniversity
                this.state.allData.selectedDegreeObj.id = this.state.allData.profileInfoData.degree
                this.state.allData.selectedFieldObj.id = this.state.allData.profileInfoData.field
                this.state.allData.selctedSpecializationObj.id = this.state.allData.profileInfoData.specialization
                this.state.allData.selectedDateObj.id = this.state.allData.yearId;
                this.state.allData.hobbiesInterestsId = this.state.allData.profileInfoData.hobbies
                this.state.allData.storyText = this.state.allData.profileInfoData.userStory
                this.setState({ allData: this.state.allData });
            }
        }
        this.state.allData.pageLoader = false
        this.setState({ allData: this.state.allData });
    }


    // this function used for back button 
    _onBack = () => {
        if (this.props.route.params.type == "profile") {
            this.props.navigation.goBack()

        } else {
            this.props.navigation.addListener('beforeRemove', (e) => {
                if (!this.state.hasUnsavedChanges) {
                    return;
                }
                e.preventDefault();
                if (this.state.examStart && !this.state.isAbort) {
                    // UserWarning.actionToLogoutWorning(this.props, e);
                } else {
                    this.props.navigation.dispatch(e.data.action);
                }
            });
        }
    }

    // this function used for  proess button press
    onPlayPausePress = async () => {
        let errorCount = 0;
        let nameErrorMsg = "";
        let phoneErrorMsg = "";
        let genderErrorMsg = "";
        let nationalityErrorMsg = "";
        let profileErrorMsg = "";
        let countryErrorMsg = "";
        let universityErrorMsg = "";
        let degreeErrorMsg = "";
        let fieldErrorMsg = "";
        let specializationErrorMsg = "";
        let expectedGraduationErrorMsg = "";
        let hobbiesErrorMsg = "";
        let storyErrorMsg = "";

        if (this.state.currentComponentIndex == 0) {
            if (this.state.allData.fullNameText == null || this.state.allData.fullNameText == undefined || this.state.allData.fullNameText.replace(/\s+/g, '') == "") {
                errorCount++;
                nameErrorMsg = "Please enter your full name ";
            } else if (this.state.allData.phoneText == null || this.state.allData.phoneText == undefined || this.state.allData.phoneText.replace(/\s+/g, '') == "") {
                errorCount++;
                phoneErrorMsg = "Please enter Phone no ";
            } else if (!phonePattern.test(this.state.allData.phoneText)) {
                errorCount++;
                phoneErrorMsg = "Please enter valid Phone no ";
            }
            else if (this.state.allData.selectedGenderObj.id == "" || this.state.allData.selectedGenderObj.id == "") {
                errorCount++;
                genderErrorMsg = "Please Select Gender";
            } else if (this.state.allData.selectedNationalityObj.id == "" || this.state.allData.selectedNationalityObj.id == "") {
                errorCount++;
                nationalityErrorMsg = "Please Select Nationality";
            }
            this.state.allData.nameError = nameErrorMsg;
            this.state.allData.phoneError = phoneErrorMsg;
            this.state.allData.genderError = genderErrorMsg;
            this.state.allData.nationalityError = nationalityErrorMsg;

            this.setState({ allData: this.state.allData });
            if (errorCount === 0) {
                this._onNextPage();
            }
        } else if (this.state.currentComponentIndex == 1) {
            if (this.state.allData.profileRaw == "") {
                errorCount++;
                profileErrorMsg = "Please Upload Profile Image";

            }
            this.state.allData.profileImgError = profileErrorMsg;
            this.setState({ allData: this.state.allData });
            if (errorCount === 0) {
                this._onNextPage();
            }
        } else if (this.state.currentComponentIndex == 2) {
            if (this.state.allData.selectCountryObj.id == "" || this.state.allData.selectCountryObj.id == "" || this.state.allData.selectedUniversityObj.length == 0) {
                errorCount++;
                countryErrorMsg = "Please Select Country";
            } else if (this.state.allData.selectedUniversity.length == 0) {
                errorCount++;
                universityErrorMsg = "Please Select University";
            }
            this.state.allData.countryError = countryErrorMsg;
            this.state.allData.universityError = universityErrorMsg;
            this.setState({ allData: this.state.allData });
            if (errorCount === 0) {
                this._onNextPage();
            }
        } else if (this.state.currentComponentIndex == 3) {
            if (this.state.allData.selectedDegreeObj.id == "" || this.state.allData.selectedDegreeObj.id == "") {
                errorCount++;
                degreeErrorMsg = "Please Select Degree";
            } else if (this.state.allData.selectedFieldObj.id == "" || this.state.allData.selectedFieldObj.id == "") {
                errorCount++;
                fieldErrorMsg = "Please Select field";
            }
            else if (this.state.allData.selectedDateObj.id == "" || this.state.allData.selectedDateObj.id == "") {
                errorCount++;
                expectedGraduationErrorMsg = "Please Select Expected Graduation";
            }
            this.state.allData.degreeError = degreeErrorMsg;
            this.state.allData.fieldError = fieldErrorMsg;
            this.state.allData.expectedGraduationError = expectedGraduationErrorMsg;
            this.setState({ allData: this.state.allData });
            if (errorCount === 0) {
                this._onNextPage();
            }
        } else if (this.state.currentComponentIndex == 4) {
            if (this.state.allData.hobbiesInterestsId == null || this.state.allData.hobbiesInterestsId == undefined || this.state.allData.hobbiesInterestsId.length == 0) {
                errorCount++;
                hobbiesErrorMsg = "Please select Hobbies and Interests";
            }
            this.state.allData.hobbiesError = hobbiesErrorMsg;
            this.setState({ allData: this.state.allData });
            if (errorCount === 0) {
                this._onNextPage();
            }
        } else if (this.state.currentComponentIndex == 5) {
            if (this.state.allData.storyText == "" || this.state.allData.storyText == "" || this.state.allData.storyText.replace(/\s+/g, '') == "") {
                errorCount++;
                storyErrorMsg = "Please enter craft your story";
            }
            this.state.allData.storyError = storyErrorMsg;
            this.setState({ allData: this.state.allData });
            if (errorCount === 0) {
                this._onNextPage();
            }
        }
        // this._onNextPage();
    }

    _onNextPage = async () => {
        if (this.state.currentComponentIndex == 5) {
            this.setState({ buttonLoader: true });
            this.onUpdateProfile()
        } else {
            this.setState(prevState => {
                const newIndex = (prevState.currentComponentIndex + 1) % 6;
                return {
                    currentComponentIndex: newIndex,
                    progress: ((newIndex + 1) / 6) * 100
                };


            });
        }
    }
    // this update profile implementation and api call 
    onUpdateProfile = async () => {
        let reqData = {
            name: this.state.allData.fullNameText,
            phone: this.state.allData.phoneText,
            countryCode: this.state.type == "profile" ? this.state.allData.profileInfoData.countryCode : this.state.allData.selectCountryObj.callingCode,
            countryIso2: this.state.type == "profile" ? this.state.allData.profileInfoData.countryIso2 : this.state.allData.selectCountryObj.iso2,
            profileImgUrl: this.state.allData.profileRaw,
            gender: this.state.allData.selectedGenderObj.id,
            nationality: this.state.allData.selectedNationalityObj.id,
            country: this.state.allData.selectCountryObj.id,
            university: this.state.allData.selectedUniversitiesId.join(','),
            degree: this.state.allData.selectedDegreeObj.id,
            field: this.state.allData.selectedFieldObj.id,
            specialization: null,
            expectedGraduation: this.state.allData.selectedDateObj.name.toString(),
            hobbies: this.state.allData.hobbiesInterestsId,
            story: this.state.allData.storyText,
            userId: this.state.userData.userInfo.userId
        }
        let responseData = await MiddlewareCheck("updateProfile", reqData, this.props);
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            // this._clearAllData();
            Toaster.ShortCenterToaster(responseData.message);
            let data = {
                userInfo: {
                    userId: this.state.userData.userInfo.userId,
                    userTypeId: this.state.userData.userInfo.userTypeId
                }
            }
            await StorageDataModification.authData(data, "store");
            if (this.state.type == "profile") {
                if (typeof this.props.route.params.updateProfile === 'function') {
                    this.props.route.params.updateProfile(true);
                }
            } else {
                null
            }
            if (this.state.type == "profile") {
                this.props.navigation.goBack();
            } else {
                this.props.navigation.navigate("ProfileCompleted", { loginType: this.state.type, });
            }
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
        this.setState({ buttonLoader: false });
    }
    _clearAllData = () => {
        this.state.allData.fullNameText = "";
        this.state.allData.phoneText = "";
        this.state.allData.selectedGenderObj = {};
        this.state.allData.selectedNationalityObj = {};
        this.state.allData.profileRaw = "";
        this.state.allData.selectCountryObj = {};
        this.state.allData.selectedUniversity = [];
        this.state.allData.selectedDegreeObj = {};
        this.state.allData.selectedFieldObj = {};
        this.state.allData.selctedSpecializationObj = {};
        this.state.allData.expectedGraduationText = "";
        this.state.allData.hobbiesInterestsId = "";
        this.state.allData.storyText = "";
        this.setState({ allData: this.state.allData });

    }
    // this is name onChange function 
    onChangeName = (value) => {
        this.state.allData.fullNameText = value;
        this.state.allData.nameError = "";
        this.setState({ allData: this.state.allData })
    }
    // this is phone no onChange function 
    _onTextChangePhone = (value) => {
        this.state.allData.phoneText = value;
        this.state.allData.phoneError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function for select gender 
    onSelectGendor = (value) => {
        this.state.allData.selectedGenderObj = value;
        this.state.allData.genderError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function used for select nationality 
    onSelectNationality = (value) => {
        this.state.allData.selectedNationalityObj = value;
        this.state.allData.nationalityError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function used for select country 
    onSelectCountry = (value) => {
        this.state.allData.selectCountryObj = value;
        this.state.allData.countryError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function used for select universities 
    onSelectUniversities = (value) => {
        this.state.allData.selectedUniversityObj = value;
        this.state.allData.universityError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function used for select degree
    onSelectDegree = (value) => {
        this.state.allData.selectedDegreeObj = value;
        this.state.allData.degreeError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function used for select field 
    onSelectField = (value) => {
        this.state.allData.selectedFieldObj = value;
        this.state.allData.fieldError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function used for select specialization 
    onSelectSpecialization = (value) => {
        this.state.allData.selctedSpecializationObj = value;
        this.state.allData.specializationError = "";
        this.setState({ allData: this.state.allData });
    }
    onChangeExpectedGraduation = (value) => {
        this.state.allData.expectedGraduationText = value;
        this.state.allData.expectedGraduationError = "";
        this.setState({ allData: this.state.allData })
    }
    // this is story text onChange function 
    onChangeStoryText = (value) => {
        this.state.allData.storyText = value;
        this.state.allData.storyError = "";
        this.setState({ allData: this.state.allData })
    }
    // this is image select function 
    _onChangeImage = (value) => {
        this.state.allData.profileRaw = value;
        this.state.allData.profileImgError = "";
        this.setState({ allData: this.state.allData });
    }
    // this is hobbies select function 
    onChangeHobbies = (value) => {
        this.state.allData.hobbiesInterestsId = value
        this.state.allData.hobbiesError = "";
        this.setState({ allData: this.state.allData });
    }
    // this is expectedGraduation year select function 
    onChangeYear = (value) => {
        this.state.allData.selectedDateObj = value;
        this.state.allData.expectedGraduationError = "";
        this.setState({ allData: this.state.allData });
    }
    // this function used for delete selected universities 
    onDelete = (index) => {

        let { selectedUniversity, selectedUniversitiesId } = this.state.allData;
        const universityId = selectedUniversity[index].id;

        selectedUniversity.splice(index, 1);
        selectedUniversitiesId.splice(index, 1);
        // selectedUniversitiesId = selectedUniversitiesId.filter(id => id !== universityId);

        this.setState({
            allData: {
                ...this.state.allData,
                selectedUniversity,
                selectedUniversitiesId
            }
        });
    }
    // this is main desin implement 
    renderComponent = () => {
        const { currentComponentIndex } = this.state;
        switch (currentComponentIndex) {
            case 0:
                return <MenteeBit  {...this.props} allData={this.state.allData} fullNameChange={(value) => this.onChangeName(value)} phoneChangeText={(value) => this._onTextChangePhone(value)} selectGendor={(value) => this.onSelectGendor(value)} selectNationality={(value) => this.onSelectNationality(value)} />;
            case 1:
                return <MenteeUploadPhoto {...this.props} allData={this.state.allData} onImageChange={(value) => this._onChangeImage(value)} />
            case 2:
                return <MenteeCountryAndUniversities  {...this.props} allData={this.state.allData} selectCountry={(value) => this.onSelectCountry(value)} selectUniversities={(value) => this.onSelectUniversities(value)} deleteUniversities={(value) => this.onDelete(value)} />;
            case 3:
                return <MenteeAcademicJourney  {...this.props} allData={this.state.allData} selectDegree={(value) => this.onSelectDegree(value)} selectField={(value) => this.onSelectField(value)} selectSpecialization={(value) => this.onSelectSpecialization(value)} expectedGraduation={(value) => this.onChangeExpectedGraduation(value)} selectExpectGraduation={(value) => this.onChangeYear(value)} />;
            case 4:
                return <MenteeHobbiesAndInterests  {...this.props} allData={this.state.allData} hobbiesInterests={(value) => this.onChangeHobbies(value)} />;
            case 5:
                return <MenteeStory  {...this.props} allData={this.state.allData} storyText={(value) => this.onChangeStoryText(value)} />;
            default:
                return <MenteeBit {...this.props} allData={this.state.allData} />

        }
    }


    // this is the main render to this page 
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <SafeAreaView >
                    <Header {...this.props} goBack={() => this._onBack()} />
                    {this.renderComponent()}
                    <View style={{ bottom: 0, position: 'absolute' }}>
                        <LinearGradient colors={['#2AE5E5', '#008080',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientSec}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: -25 }}>
                                <View style={styles.playProgressBtnSec}>
                                    {this.state.buttonLoader ?
                                        <View>
                                            <ActivityIndicator size={"large"} color={"#2f807f"} />
                                        </View> :
                                        <PlayCircularProgress
                                            onPlayPausePress={() => this.onPlayPausePress()}
                                            progress={this.state.progress}
                                        />
                                    }
                                </View>
                            </View>
                        </LinearGradient>
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
        stateLookupData

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MenteeProfileSetup);
