import type React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";

// You'll need to install a vector icons package
// npm install react-native-vector-icons
// Then link it: npx react-native link react-native-vector-icons
import Icon from "react-native-vector-icons/Feather";

// Define the button variants, styles and sizes as types
type ButtonVariant = "primary" | "secondary" | "neutral";
type ButtonStyle = "filled" | "outlined" | "text";
type ButtonSize = "large" | "small";

// Define the props interface with TypeScript
interface CustomButtonProps {
  label?: string;
  text: string;
  variant?: ButtonVariant;
  buttonStyle?: ButtonStyle;
  size?: ButtonSize;
  showArrows?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

// Color palette from Figma
const COLORS = {
  primary: "#153a6a",
  secondary: "#6a9de1",
  neutral: "#abaeb2",
  white: "#ffffff",
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  variant = "primary",
  buttonStyle = "filled",
  size = "large",
  showArrows = false,
  onPress,
  containerStyle,
  disabled = false,
}) => {
  // Get the appropriate styles based on props
  const getButtonColor = () => {
    switch (variant) {
      case "primary":
        return COLORS.primary;
      case "secondary":
        return COLORS.secondary;
      case "neutral":
        return COLORS.neutral;
      default:
        return COLORS.primary;
    }
  };

  const getButtonStyles = (): StyleProp<ViewStyle> => {
    const color = getButtonColor();
    const sizeStyles =
      size === "large" ? styles.buttonLarge : styles.buttonSmall;

    const buttonStyles: StyleProp<ViewStyle> = [sizeStyles];

    switch (buttonStyle) {
      case "filled":
        buttonStyles.push({ backgroundColor: color });
        break;
      case "outlined":
        buttonStyles.push({
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: color,
        });
        break;
      case "text":
        buttonStyles.push({
          backgroundColor: "transparent",
          paddingHorizontal: 0,
          paddingVertical: 0,
        });
        break;
    }

    if (disabled) {
      buttonStyles.push(styles.disabled);
    }

    return buttonStyles;
  };

  const getTextStyles = (): StyleProp<TextStyle> => {
    const color = getButtonColor();
    const sizeStyles = size === "large" ? styles.textLarge : styles.textSmall;

    const textStyles: StyleProp<TextStyle> = [sizeStyles, styles.buttonText];

    switch (buttonStyle) {
      case "filled":
        textStyles.push({ color: COLORS.white });
        break;
      case "outlined":
      case "text":
        textStyles.push({ color });
        break;
    }

    if (disabled) {
      textStyles.push({ opacity: 0.5 });
    }

    return textStyles;
  };

  const getLabelStyles = (): StyleProp<TextStyle> => {
    const color = getButtonColor();
    return [styles.label, { color }];
  };

  const iconSize = size === "large" ? 16 : 14;
  const iconColor = buttonStyle === "filled" ? COLORS.white : getButtonColor();

  // For text-only style, we don't need a TouchableOpacity wrapper
  if (buttonStyle === "text") {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={getTextStyles()}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.button, getButtonStyles()]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {showArrows && (
          <Icon
            name="arrow-left"
            size={iconSize}
            color={iconColor}
            style={styles.leftIcon}
          />
        )}
        <Text style={getTextStyles()}>{text}</Text>
        {showArrows && (
          <Icon
            name="arrow-right"
            size={iconSize}
            color={iconColor}
            style={styles.rightIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonLarge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonSmall: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontWeight: "500",
  },
  textLarge: {
    fontSize: 18,
  },
  textSmall: {
    fontSize: 16,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
