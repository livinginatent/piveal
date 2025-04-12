import { normalize } from "@/app/theme/normalize";
import { colors } from "@/app/theme/theme";
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
type CTAButtonVariant = "primary" | "outlined" | "text";

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
  primary: colors.orange500,
  secondary: colors.orange400,
  white: "#ffffff",
  disabled: colors.grey400,
};

export const CustomCTAButton: React.FC<CustomCTAButtonProps> = ({
  label,
  variant = "primary",
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
      return variant === "primary" ? COLORS.disabled : "transparent";
    }
    if (variant === "primary") {
      return pressed ? COLORS.secondary : COLORS.primary;
    }
    return "transparent";
  };

  // Get the text color based on variant, disabled, and pressed state
  const getTextColor = (pressed: boolean): string => {
    if (disabled) {
      return variant === "primary" ? COLORS.white : COLORS.disabled;
    }
    if (variant === "primary") {
      return COLORS.white;
    }
    // For outlined and text variants, change color on press
    return pressed ? COLORS.secondary : COLORS.primary;
  };

  // Get the border color based on variant, disabled, and pressed state
  const getBorderStyle = (
    pressed: boolean
  ): { borderColor?: string; borderWidth?: number; borderStyle?: "solid" } => {
    if (variant === "outlined") {
      return {
        borderColor: disabled
          ? COLORS.disabled
          : pressed
          ? COLORS.secondary
          : COLORS.primary,
        borderWidth: 2, // Use a fixed value (or adjust with your normalize function if needed)
        borderStyle: "solid",
      };
    }
    return {};
  };

  const getHeight = (): { height: number } => {
    if (size === "large") {
      return { height: normalize("height", 52) };
    } else if (size === "medium") {
      return { height: normalize("height", 40) };
    }
    return { height: normalize("height", 32) };
  };

  // Get the padding based on size - Adjusted for more vertical space
  const getPadding = (): {
    paddingVertical?: number;
    paddingHorizontal?: number;
    padding?: number;
  } => {
    if (size === "large") {
      return {
        paddingHorizontal: normalize("width", 16),
        // Reduced vertical padding to give text more room
        paddingVertical: normalize("height", 8),
      };
    } else if (size === "medium") {
      return {
        paddingHorizontal: normalize("width", 6),
        paddingVertical: normalize("height", 4),
      };
    }
    return {
      paddingHorizontal: normalize("width", 6),
      paddingVertical: normalize("height", 2),
    };
  };

  // Get the font size based on size
  const getFontSize = (): number => {
    return size === "small" ? normalize("font", 12) : normalize("font", 16);
  };

  // Get the line height based on size - Ensures text doesn't get cut off
  const getLineHeight = (): number => {
    return size === "small" ? normalize("font", 16) : normalize("font", 24);
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
          ...getBorderStyle(pressed), // Apply border style here
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
                lineHeight: getLineHeight(), // Added line height
                textAlign: "center",
              },
              labelStyle,
            ]}
            numberOfLines={1}
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
    // Added flex to ensure proper spacing within container
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: normalize("width", 8),
  },
  label: {
    fontWeight: "500",
    // Added vertical padding to ensure text isn't cut off
    paddingVertical: normalize("height", 2),
    // Include bottom padding to prevent text from being cut off
    paddingBottom: normalize("height", 2),
  },
});
