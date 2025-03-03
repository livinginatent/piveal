import { normalize } from "@/app/theme/normalize";
import type React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";

// Define the button variants
type ButtonVariant = "filled" | "outlined" | "text";

// Define the button sizes
type ButtonSize = "regular" | "compact";

// Define the props for the CustomButton component
interface CustomButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
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

export const CustomButton: React.FC<CustomButtonProps> = ({
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
  // Get the background color based on variant and disabled state
  const getBackgroundColor = (): string => {
    if (disabled && variant === "filled") {
      return COLORS.disabled;
    }
    if (variant === "filled") {
      return COLORS.primary;
    }
    return "transparent";
  };

  // Get the text color based on variant and disabled state
  const getTextColor = (): string => {
    if (disabled) {
      return variant === "filled" ? COLORS.white : COLORS.disabled;
    }
    if (variant === "filled") {
      return COLORS.white;
    }
    return COLORS.primary;
  };

  // Get the border color and width based on variant and disabled state
  const getBorderStyle = (): { borderColor: string; borderWidth: number } => {
    if (disabled && variant === "outlined") {
      return {
        borderColor: COLORS.disabled,
        borderWidth: size === "regular" ? 2 : 1,
      };
    }
    if (variant === "outlined") {
      return {
        borderColor: COLORS.primary,
        borderWidth: size === "regular" ? 2 : 1,
      };
    }
    return {
      borderColor: "transparent",
      borderWidth: 0,
    };
  };

  const getHeight = (): {
    height: number;
  } => {
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
    return size === "regular" ? 18 : 14;
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
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: getBorderRadius(),
          ...getBorderStyle(),
          ...getPadding(),
          ...getHeight(),
        },
        style,
      ]}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <Text
          style={[
            styles.label,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  iconContainer: {},
  label: {
    fontWeight: "500",
  },
});
