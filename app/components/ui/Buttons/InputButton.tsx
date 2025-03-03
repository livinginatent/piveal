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
type InputButtonVariant = "filled" | "outlined" | "text";

// Define the button sizes
type InputButtonSize = "regular" | "compact";

// Define the props for the CustomButton component
interface CustomInputButtonProps {
  label: string;
  variant?: InputButtonVariant;
  size?: InputButtonSize;
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

export const CustomInputButton: React.FC<CustomInputButtonProps> = ({
  label,
  variant = "filled",
  size = "regular",
  leftIcon,
  rightIcon,
  onPress,
  style,
  labelStyle,
  disabled = false,
}) => {
  // Get the background color based on variant, disabled, and pressed state
  const getBackgroundColor = (pressed: boolean): string => {
    if (disabled && variant === "filled") {
      return COLORS.disabled;
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

  // Get the border style based on variant, disabled, pressed state, and size
  const getBorderStyle = (
    pressed: boolean
  ): { borderColor: string; borderWidth: number } => {
    if (variant === "filled") {
      return {
        borderColor: pressed ? COLORS.secondary : "transparent",
        borderWidth: size === "regular" ? 2 : 1,
      };
    }
    if (variant === "outlined") {
      return {
        borderColor: disabled
          ? COLORS.disabled
          : pressed
          ? COLORS.secondary
          : COLORS.primary,
        borderWidth: size === "regular" ? 2 : 1,
      };
    }
    return {
      borderColor: "transparent",
      borderWidth: 0,
    };
  };

  const getHeight = (): { height: number } => {
    if (size === "regular") {
      return {
        height: normalize("height", 65),
      };
    }
    return {
      height: normalize("height", 50),
    };
  };

  // Get the padding based on size
  const getPadding = (): {
    paddingVertical: number;
    paddingHorizontal: number;
  } => {
    if (size === "regular") {
      return {
        paddingVertical: 10,
        paddingHorizontal: 12,
      };
    }
    return {
      paddingVertical: 8,
      paddingHorizontal: 12,
    };
  };

  // Get the font size based on size
  const getFontSize = (): number => {
    return size === "regular" ? normalize("font", 18) : normalize("font", 14);
  };

  // Get the icon size based on button size
  const getIconSize = (): number => {
    return size === "regular" ? 20 : 16;
  };

  // Get the border radius
  const getBorderRadius = (): number => {
    return 6; // Based on the Figma design
  };

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
    width: normalize("width", 196),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  
  },
  iconContainer: { marginHorizontal:normalize('width',8)  },
  label: {
    fontWeight: "500",
  },
});
