import { PropTypes } from 'prop-types';
import { Image, TouchableOpacity, View } from "react-native"
import { ImageName } from "../../enums"
import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    onBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 20, marginHorizontal: '6%', }}>
                {(this.props.route.params && this.props.route.params.type && this.props.route.params.type == "signUp") || (this.props.route.name == "OnBordingScreen") ?
                    null :
                    <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center' }} onPress={() => this.onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                }
                <View style={{ flex: 1 }} />
            </View>
        )
    }
}

export default Header