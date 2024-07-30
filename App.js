import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import SvishrReducer from './src/redux/SvishrReducer';

import {
  SplashScreen,
  ChooseJourney,
  LoginPage,
  ProfileView,
  SavedMentorList,
  ForgotPassword,
  OnBordingScreen,
  ChatDetailsList,
  ProfileCompleted,
  MENTEE,
  MENTOR,
  OtpVerification,
  RequestList,
  SendRequestList,
  ResetPassword,
  ChangePassword,
  AllFriends,
  NetworkError,
  BookmarkList,
} from './src/screens';
import { HomeTab, ChatTab, ProfileTab } from './src/navigation/BottomTabNavigator';
import { Login } from './src1/screens';
const store = createStore(SvishrReducer);
const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ChooseJourney' component={ChooseJourney} options={{ headerShown: false }} />
            <Stack.Screen name='LoginPage' component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ headerShown: false }} />
            <Stack.Screen name='OnBordingScreen' component={OnBordingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ProfileView' component={ProfileView} options={{ headerShown: false }} />

            <Stack.Screen name='Profile' component={ProfileTab} options={{ headerShown: false }} />
            <Stack.Screen name='ChatList' component={ChatTab} options={{ headerShown: false }} />
            <Stack.Screen name='HomePage' component={HomeTab} options={{ headerShown: false }} />

            <Stack.Screen name='ChatDetailsList' component={ChatDetailsList} options={{ headerShown: false }} />
            <Stack.Screen name='ProfileCompleted' component={ProfileCompleted} options={{ headerShown: false }} />
            <Stack.Screen name='OtpVerification' component={OtpVerification} options={{ headerShown: false }} />
            <Stack.Screen name='SavedMentorList' component={BookmarkList} options={{ headerShown: false }} />
            <Stack.Screen name='SendRequestList' component={SendRequestList} options={{ headerShown: false }} />
            <Stack.Screen name='RequestList' component={RequestList} options={{ headerShown: false }} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ headerShown: false }} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name='AllFriends' component={AllFriends} options={{ headerShown: false }} />

            <Stack.Screen name='MenteeProfileSetup' component={MENTEE.MenteeProfileSetup} options={{ headerShown: false }} />
            <Stack.Screen name='MenteeSignUp' component={MENTEE.MenteeSignUp} options={{ headerShown: false }} />
            {/* <Stack.Screen name='MenteeProfile' component={MENTEE.MenteeProfile} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name='MentorProfile' component={MENTOR.MentorProfile} options={{ headerShown: false }} /> */}
            <Stack.Screen name='MentorSignUp' component={MENTOR.MentorSignUp} options={{ headerShown: false }} />
            <Stack.Screen name='MentorProfileSetup' component={MENTOR.MentorProfileSetup} options={{ headerShown: false }} />

            <Stack.Screen name="NetworkError" component={NetworkError} options={{ headerShown: false }} />


          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}


export default App;
