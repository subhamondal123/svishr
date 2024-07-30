import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G, Defs, Stop } from "react-native-svg"
import LinearGradient from "react-native-linear-gradient";

function Play({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
           
        >
            <Path
                d="M18 11L-9.78799e-07 21.3923L-7.02746e-08 0.607695L18 11Z"
                fill="url(#paint0_linear_936_11921)"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_936_11921"
                    x1={-6}
                    y1={23}
                    x2={-3.52481}
                    y2={-8.98704}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#008080" />
                    <Stop offset={1} stopColor="#2AE6E6" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

Play.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Play.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default Play;
