import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Chat({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M25.2134 20.0586C25.2134 20.589 25.0027 21.0977 24.6276 21.4728C24.2525 21.8479 23.7438 22.0586 23.2134 22.0586H11.2134L7.21338 26.0586V10.0586C7.21338 9.52816 7.42409 9.01945 7.79917 8.64438C8.17424 8.26931 8.68295 8.05859 9.21338 8.05859H23.2134C23.7438 8.05859 24.2525 8.26931 24.6276 8.64438C25.0027 9.01945 25.2134 9.52816 25.2134 10.0586V20.0586Z"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

Chat.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Chat.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default Chat;
