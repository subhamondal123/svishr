import React from "react";
import { PropTypes } from 'prop-types';
import Home from "./Home";
import Chat from "./Chat";
import Profile from "./profile";
import BookMark from "./BookMark";
import Delete from "./Delete";
import Dropdown from "./Dropdown";
import Play from "./Play";
import Plus from "./Plus";


function SvgComponent({
    strokeColor,
    svgName,
    height,
    width,
    children,
    isColorChange
}) {
    // if (!isColorChange) {
    //     strokeColor = undefined;
    // }
    var svgCom = null;
    switch (svgName) {
        case "home":
            svgCom = <Home strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "chat":
            svgCom = <Chat strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "profile":
            svgCom = <Profile strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "bookmark":
            svgCom = <BookMark strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "delete":
            svgCom = <Delete strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "dropdown":
            svgCom = <Dropdown strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "play":
            svgCom = <Play strokeColor={strokeColor} height={height} width={width} />;
            break;
        case "plus":
            svgCom = <Plus strokeColor={strokeColor} height={height} width={width} />;
            break;

        default:
            svgCom = null;
    }
    return svgCom;
}


SvgComponent.defaultProps = {
    strokeColor: "#FFFFFF",
    svgName: "home",
    height: 25,
    width: 25,
    children: null,
    isColorChange: false
};

SvgComponent.propTypes = {
    strokeColor: PropTypes.string,
    svgName: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node,
    isColorChange: PropTypes.bool
};


export default SvgComponent;