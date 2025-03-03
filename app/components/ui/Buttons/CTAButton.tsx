import { normalize } from "@/app/theme/normalize";
import type React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";

// Define the button variants
type CTAButtonVariant = "filled" | "outlined" | "text";

// Define the button sizes
type CTAButtonSize = "large" | "medium" | "small";

// Define the props for the CustomButton component
interface CustomCTAButtonProps {
  label: string;
  variant?: CTAButtonVariant;
  size?: CTAButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

// Color palette based on Figma design
const COLORS = {
  primary: "#153a6a",
  secondary: "#6a9de1",
  white: "#ffffff",
  disabled: "#ABAEB2",
};

export const CustomCTAButton: React.FC<CustomCTAButtonProps> = ({
  label,
  variant = "filled",
  size = "large",
  leftIcon,
  rightIcon,
  onPress,
  style,
  labelStyle,
  disabled = false,
}) => {
  // Get the background color based on variant, disabled, and pressed state
  const getBackgroundColor = (pressed: boolean): string => {
    if (disabled) {
      return variant === "filled" ? COLORS.disabled : "transparent";
    }
    if (variant === "filled") {
      return pressed ? COLORS.secondary : COLORS.primary;
    }
    return "transparent";
  };

  // Get the text color based on variant, disabled, and pressed state
  const getTextColor = (pressed: boolean): string => {
    if (disabled) {
      return variant === "filled" ? COLORS.white : COLORS.disabled;
    }
    if (variant === "filled") {
      return COLORS.white;
    }
    // For outlined and text variants, change color on press
    return pressed ? COLORS.secondary : COLORS.primary;
  };

  // Get the border color based on variant, disabled, and pressed state
  const getBorderStyle = (pressed: boolean): { borderColor: string } => {
    if (variant === "filled") {
      return { borderColor: pressed ? COLORS.secondary : "transparent" };
    }
    if (variant === "outlined") {
      return {
        borderColor: disabled
          ? COLORS.disabled
          : pressed
          ? COLORS.secondary
          : COLORS.primary,
      };
    }
    return { borderColor: "transparent" };
  };

  const getHeight = (): { height: number } => {
    if (size === "large") {
      return { height: normalize("height", 52) };
    } else if (size === "medium") {
      return { height: normalize("height", 40) };
    }
    return { height: normalize("height", 32) };
  };

  // Get the padding based on size
  const getPadding = (): {
    paddingVertical?: number;
    paddingHorizontal?: number;
    padding?: number;
  } => {
    if (size === "large") {
      return { padding: normalize("height", 16) };
    } else if (size === "medium") {
      return {
        paddingHorizontal: normalize("width", 6),
        paddingVertical: normalize("width", 5),
      };
    }
    return { paddingVertical: 4, paddingHorizontal: 6 };
  };

  // Get the font size based on size
  const getFontSize = (): number => {
    return size === "small" ? normalize("font", 12) : normalize("font", 16);
  };

  // Get the border radius based on design
  const getBorderRadius = (): number => normalize("height", 12);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(pressed),
          borderRadius: getBorderRadius(),
          ...getBorderStyle(pressed),
          ...getPadding(),
          ...getHeight(),
        },
        style,
      ]}
    >
      {({ pressed }) => (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
          <Text
            style={[
              styles.label,
              {
                color: getTextColor(pressed),
                fontSize: getFontSize(),
                textAlign: "center",
              },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize("width", 187),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
     marginHorizontal: normalize("width", 8) ,
  },
  label: {
    fontWeight: "500",
  },
});
