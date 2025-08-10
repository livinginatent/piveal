import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  cancelAnimation,
  Easing,
  interpolate,
} from "react-native-reanimated";

const MARQUEE_SPEED_CONSTANT = 40; // Lower is faster
const PAUSE_DURATION = 1000; // Pause at the beginning and end of scroll

interface MarqueeTextProps {
  /** The text content to be displayed and scrolled. */
  children: string;
  /** Style for the text component. */
  style?: StyleProp<TextStyle>;
  /** Optional: The duration of the scroll animation. Overrides the default speed calculation. */
  duration?: number;
}

export const MarqueeText = ({
  children,
  style,
  duration,
}: MarqueeTextProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  // Shared value for animation progress (0 to 1)
  const progress = useSharedValue(0);

  const shouldAnimate = textWidth > containerWidth;

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  }, []);

  const handleTextLayout = useCallback((event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  }, []);

  useEffect(() => {
    // Only animate if the text is wider than the container
    if (shouldAnimate) {
      // Calculate duration based on how much overflow there is, unless a duration is provided
      const calculatedDuration =
        duration || (textWidth - containerWidth) * MARQUEE_SPEED_CONSTANT;

      // Start the animation
      progress.value = withDelay(
        PAUSE_DURATION,
        withRepeat(
          withTiming(1, {
            duration: calculatedDuration,
            easing: Easing.linear,
          }),
          -1, // Loop indefinitely
          true // Reverse the animation on every other loop
        )
      );
    } else {
      // If no animation is needed, cancel any existing animation and reset progress
      cancelAnimation(progress);
      progress.value = 0;
    }

    // Cleanup function to cancel animation on unmount
    return () => {
      cancelAnimation(progress);
    };
  }, [shouldAnimate, textWidth, containerWidth, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    // If we shouldn't animate, the transform is just 0
    if (!shouldAnimate) {
      return { transform: [{ translateX: 0 }] };
    }

    // Interpolate the progress value (0 to 1) to a translateX value
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, -(textWidth - containerWidth)] // From start to the very end of the text
    );

    return {
      transform: [{ translateX }],
    };
  }, [shouldAnimate, textWidth, containerWidth]);

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      <Animated.View style={[styles.animatedView, animatedStyle]}>
        <Text onLayout={handleTextLayout} style={[style, styles.text]}>
          {children}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden", // This is crucial to hide the overflowing text
    justifyContent: "center",
  },
  animatedView: {
    flexDirection: "row",
  },
  text: {
    // The text needs to be on a single line to be measured correctly
    whiteSpace: "nowrap",
  },
});
