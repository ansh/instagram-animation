import React from "react";

import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

import {Image} from "expo-image";

const AnimatedFastImage = Animated.createAnimatedComponent(Image);

export const ImageDetailListItem = ({ active, url, animate }) => {
  const animatedImageStyles = useAnimatedStyle(() => {
    return {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
      marginTop: 0,
    };
  }, [active]);

  return (
    <AnimatedFastImage
      style={animatedImageStyles}
      source={{
        uri: url,
      }}
      priority="normal"
      contentFit="cover"
    />
  );
};

export default ImageDetailListItem;
