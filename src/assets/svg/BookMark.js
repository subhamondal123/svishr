import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function BookMark({
    strokeColor,
    height,
    width
}) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
           
        >
            <Path
                d="M9.75 0.25H2.25C1.425 0.25 0.75 0.925 0.75 1.75V13.75L6 11.5L11.25 13.75V1.75C11.25 0.925 10.575 0.25 9.75 0.25ZM9.75 11.4775L6 9.8725L2.25 11.4775V1.75H9.75V11.4775Z"
                fill={strokeColor}
            />
        </Svg>
    )
}

BookMark.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

BookMark.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default BookMark;
