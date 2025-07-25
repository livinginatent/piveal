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

type CTAButtonVariant = "primary" | "outlined" | "text";

type CTAButtonSize = "large" | "medium" | "small";

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
  centerContent?: boolean; // New prop to control layout behavior
}

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
  centerContent = false, // Default to original behavior
}) => {
  const getBackgroundColor = (pressed: boolean): string => {
    if (disabled) {
      return variant === "primary" ? COLORS.disabled : "transparent";
    }
    if (variant === "primary") {
      return pressed ? COLORS.secondary : COLORS.primary;
    }
    return "transparent";
  };

  const getTextColor = (pressed: boolean): string => {
    if (disabled) {
      return variant === "primary" ? COLORS.white : COLORS.disabled;
    }
    if (variant === "primary") {
      return COLORS.white;
    }

    return pressed ? COLORS.secondary : COLORS.primary;
  };

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
        borderWidth: 2,
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

  const getPadding = (): {
    paddingVertical?: number;
    paddingHorizontal?: number;
    padding?: number;
  } => {
    if (size === "large") {
      return {
        paddingHorizontal: normalize("width", 16),
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

  const getFontSize = (): number => {
    return size === "small" ? normalize("font", 12) : normalize("font", 16);
  };

  const getLineHeight = (): number => {
    return size === "small" ? normalize("font", 16) : normalize("font", 24);
  };

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
          {centerContent ? (
            // Centered layout: icon and text grouped together in center
            <View style={styles.centeredGroup}>
              {leftIcon && (
                <View style={styles.leftIconContainer}>{leftIcon}</View>
              )}
              <Text
                style={[
                  styles.label,
                  {
                    color: getTextColor(pressed),
                    fontSize: getFontSize(),
                    lineHeight: getLineHeight(),
                  },
                  labelStyle,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          ) : (
            // Original layout: left icon on edge, centered text
            <>
              {leftIcon && (
                <View style={styles.leftIconContainerAbsolute}>{leftIcon}</View>
              )}
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: getTextColor(pressed),
                      fontSize: getFontSize(),
                      lineHeight: getLineHeight(),
                      textAlign: "center",
                    },
                    labelStyle,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </View>
            </>
          )}
          {rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize("width", 338),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  // For centered content layout
  centeredGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  leftIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: normalize("width", 8),
  },
  // For original layout with absolute positioning
  leftIconContainerAbsolute: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: normalize("width", 8),
    position: "absolute",
    left: 0,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: normalize("width", 8),
  },
  label: {
    fontWeight: "500",
    paddingVertical: normalize("height", 2),
    paddingBottom: normalize("height", 2),
  },
});
