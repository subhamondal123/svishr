import React from 'react';
import styles from './style';
import { DeviceInfo } from '../../services/config';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    AlertMessage,
    Color,
    Dimension,
    FontFamily,
    ImageName,
    Padding
} from '../../enums';
import { TextButton } from '../../shared';

class NetworkError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
    }

    onTryAgain = async () => {
        if (await DeviceInfo.CheckConnection()) {
            // this.props.route.params.reload();
            this.props.navigation.goBack();
        } else {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NETWORK.ERROR);
        }
    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <ImageBackground source={ImageName.NETWORK_ERROR_ICON} style={styles.bgimage}> */}
                <View style={styles.logoSec}>
                    <Image source={ImageName.NETWORK_ERROR_ICON} style={styles.imgStyle} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.errorText}>{`OOPS! \nNO INTERNET`}</Text>
                    <Text style={styles.errorTextMsg}>Please check your network connection</Text>
                    <View style={{ marginTop: 15 }} />
                    <TextButton
                        backgroundColor={"#3f5da8"}
                        color={Color.COLOR.WHITE.PURE_WHITE}
                        fontFamily={FontFamily.FONTS.MONTSERRAT.SEMI_BOLD}
                        text={"TRY AGAIN"}
                        onClickValue={(value) => this.onTryAgain(value)}
                    />
                </View>
                {/* </ImageBackground> */}
            </SafeAreaView>
        );
    }
};

export default (NetworkError);
