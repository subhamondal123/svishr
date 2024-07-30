import * as React from "react"
import { PropTypes } from 'prop-types';
import Svg, { ClipPath, Path, G } from "react-native-svg"

function Home({
    strokeColor,
    height,
    width
}) {
    return (


        <Svg
            width={width}
            height={height}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
        >
            <Path
                d="M9.71338 22.0586V12.0586H15.7134V22.0586M3.71338 9.05859L12.7134 2.05859L21.7134 9.05859V20.0586C21.7134 20.589 21.5027 21.0977 21.1276 21.4728C20.7525 21.8479 20.2438 22.0586 19.7134 22.0586H5.71338C5.18295 22.0586 4.67424 21.8479 4.29917 21.4728C3.92409 21.0977 3.71338 20.589 3.71338 20.0586V9.05859Z"
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

Home.defaultProps = {
    strokeColor: "#FFFFFF",
    height: 25,
    width: 25
};

Home.propTypes = {
    strokeColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};

export default Home;
