import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color, FontFamily, FontSize, ImageName } from '../enums'
import { Image, Text, View } from 'react-native';
import { ChatList, HomePage, MENTEE, MENTOR, Profile } from '../screens';
import { selectUnselectTabView } from './Function';
import SvgComponent from '../assets/svg';
import { TextComponent } from '../shared';
import { MenteeProfile } from '../screens/mentee';
const Tab = createBottomTabNavigator();

// for home page tab section
class HomeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount = () => {
    this.onLoad()
  }

  onLoad = () => {

  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName='HomeTab'
        screenOptions={{
          tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 60 },
          activeTintColor: 'rgb(29,128,226)',
          tabBarInactiveTintColor: 'rgb(146,146,146)',
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false
        }}
      >
        <Tab.Screen
          name="HomeTab"
          // component={HomePage}
          children={() => <HomePage {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"home"} strokeColor={"#2f807f"} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Home"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"home"} strokeColor={"#000"} />
                }
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="chat"
          // component={ChatList}
          children={() => <ChatList {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"chat"} strokeColor={"#2f807f"} height={35} width={35} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Chat"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"chat"} strokeColor={"#000"} height={35} width={35} />
                }
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          children={() => <Profile {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"profile"} strokeColor={"#2f807f"} height={30} width={30} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Profile"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"profile"} strokeColor={"#000"} height={30} width={30} />
                }
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}


// for chat page tab section
class ChatTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount = () => {
    this.onLoad()
  }

  onLoad = () => {

  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName='ChatTab'
        screenOptions={{
          tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 60 },
          activeTintColor: 'rgb(29,128,226)',
          tabBarInactiveTintColor: 'rgb(146,146,146)',
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false
        }}
      >
        <Tab.Screen
          name="Home"
          // component={HomePage}
          children={() => <HomePage {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"home"} strokeColor={"#2f807f"} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Home"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"home"} strokeColor={"#000"} />
                }
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ChatTab"
          // component={ChatList}
          children={() => <ChatList {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"chat"} strokeColor={"#2f807f"} height={35} width={35} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Chat"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"chat"} strokeColor={"#000"} height={35} width={35} />
                }
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          children={() => <Profile {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"profile"} strokeColor={"#2f807f"} height={30} width={30} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Profile"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"profile"} strokeColor={"#000"} height={30} width={30} />
                }
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}


// for Profile page tab section
class ProfileTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount = () => {
    this.onLoad()
  }

  onLoad = () => {

  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName='ProfileTab'
        screenOptions={{
          tabBarStyle: { backgroundColor: Color.COLOR.WHITE.PURE_WHITE, height: 60 },
          activeTintColor: 'rgb(29,128,226)',
          tabBarInactiveTintColor: 'rgb(146,146,146)',
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false
        }}
      >
        <Tab.Screen
          name="Home"
          // component={HomePage}
          children={() => <HomePage {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"home"} strokeColor={"#2f807f"} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Home"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"home"} strokeColor={"#000"} />
                }
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          // component={ChatList}
          children={() => <ChatList {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"chat"} strokeColor={"#2f807f"} height={35} width={35} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Chat"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"chat"} strokeColor={"#000"} height={35} width={35} />
                }
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          children={() => <Profile {...this.props} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={selectUnselectTabView(focused)}>
                {focused ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgComponent svgName={"profile"} strokeColor={"#2f807f"} height={30} width={30} />
                    <View style={{ width: 8 }} />
                    <TextComponent text={"Profile"} additionalStyles={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM, color: "#2f807f" }} props={this.props} />
                  </View> :
                  <SvgComponent svgName={"profile"} strokeColor={"#000"} height={30} width={30} />
                }
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}

export {
  HomeTab,
  ChatTab,
  ProfileTab
}
