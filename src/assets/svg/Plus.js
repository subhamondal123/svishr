import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Defs, Stop } from "react-native-svg"
import LinearGradient from "react-native-linear-gradient";

function Plus({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 22 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M9.42012 22.1V0.899998H12.5701V22.1H9.42012ZM0.120117 13V10.05H21.8701V13H0.120117Z"
                fill={strokeColor}
            />
        </Svg>
    )
}

Plus.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Plus.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default Plus;
