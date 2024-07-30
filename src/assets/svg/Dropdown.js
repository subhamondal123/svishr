import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Dropdown({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M8.4425 0.4425L5 3.8775L1.5575 0.442499L0.5 1.5L5 6L9.5 1.5L8.4425 0.4425Z"
                fill={strokeColor}
            />
        </Svg>
    )
}

Dropdown.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Dropdown.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default Dropdown;
