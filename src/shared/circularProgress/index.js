import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from './style';
import { ImageName } from '../../enums';
import SvgComponent from '../../assets/svg';

const CircularProgressBar = ({ progress, onPlayPausePress, isPlaying }) => {
    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={80}
                width={5}
                fill={progress}
                tintColor="#FCB001"
                backgroundColor="#C6EFED"
                backgroundWidth={2}
                rotation={180}
                lineCap="round"
            />

            <TouchableOpacity onPress={onPlayPausePress} style={styles.buttonContainer}>
                <Image source={isPlaying ? ImageName.PLAY_IMG : ImageName.PLAY_IMG} style={styles.buttonImage} />
            </TouchableOpacity>

        </View>
    );
};

export default CircularProgressBar;
