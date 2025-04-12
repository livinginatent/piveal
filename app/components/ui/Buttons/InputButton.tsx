import { normalize } from "@/app/theme/normalize";
import { colors } from "@/app/theme/theme";
import React from "react";
import { useState } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  TextInput,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type KeyboardTypeOptions,
  Platform,
  type TextInputProps,
  TouchableOpacity,
} from "react-native";

type InputVariant = "primary" | "outlined" | "text";

type InputSize = "regular" | "compact";

type InputFieldType = "text" | "email" | "numeric" | "password";

interface CustomTextInputProps
  extends Omit<
    TextInputProps,
    | "value"
    | "onChangeText"
    | "style"
    | "onFocus"
    | "onBlur"
    | "placeholder"
    | "editable"
  > {
  label: string;
  topLabel?: string;
  value: string;
  onChangeText: (text: string) => void;
  variant?: InputVariant;
  size?: InputSize;
  inputType?: InputFieldType;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  topLabelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  secureTextEntry?: boolean;
}

const COLORS = {
  primary: colors.orange500,
  secondary: colors.orange400,
  white: "#ffffff",
  disabledBackground: colors.grey200,
  disabledBorder: colors.grey400,
  disabledText: colors.grey500,
  textDefault: colors.black,
  placeholder: colors.grey500,
  borderDefault: colors.grey300,
  topLabelDefault: colors.grey500,
};

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  topLabel,
  value,
  onChangeText,
  variant = "primary",
  size = "regular",
  inputType = "text",
  placeholder: customPlaceholder,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  style,
  inputStyle,
  labelStyle,
  topLabelStyle,
  disabled = false,
  secureTextEntry,
  ...otherTextInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showLabels = !isFocused && !value;
  const placeholderText = customPlaceholder ?? label;
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const getBackgroundColor = (): string => {
    if (disabled) {
      return variant === "primary" ? COLORS.disabledBorder : "transparent";
    }
    if (variant === "primary") {
      return COLORS.primary;
    }
    return "transparent";
  };
  const getBorderStyle = (): { borderColor: string; borderWidth: number } => {
    const borderWidth = size === "regular" ? 2 : 1;
    if (disabled) {
      return {
        borderColor:
          variant === "primary" ? "transparent" : COLORS.disabledBorder,
        borderWidth: variant === "primary" ? 0 : borderWidth,
      };
    }
    if (variant === "primary") {
      return {
        borderColor: isFocused ? COLORS.secondary : "transparent",
        borderWidth: borderWidth,
      };
    }
    if (variant === "outlined") {
      return {
        borderColor: isFocused ? COLORS.secondary : COLORS.primary,
        borderWidth: borderWidth,
      };
    }
    return { borderColor: "transparent", borderWidth: 0 };
  };
  const getInputTextColor = (): string => {
    if (disabled) return COLORS.disabledText;
    if (variant === "primary") return colors.orange500;
    return colors.orange400;
  };
  const getLabelColor = (): string => {
    if (disabled) {
      return variant === "primary" ? COLORS.white : COLORS.disabledText;
    }
    if (variant === "primary") {
      return COLORS.white;
    }
    return COLORS.primary;
  };
  const getTopLabelColor = (): string => {
    if (disabled) {
      return variant === "primary" ? COLORS.white : COLORS.disabledText;
    }
    if (variant === "primary") {
      return COLORS.white;
    }
    return COLORS.topLabelDefault;
  };
  const getHeight = (): { height: number } => {
    if (size === "regular") {
      return { height: normalize("height", 65) };
    }
    return { height: normalize("height", 50) };
  };
  const getPadding = (): {
    paddingVertical: number;
    paddingHorizontal: number;
  } => {
    if (size === "regular") {
      return {
        paddingVertical: normalize("height", Platform.OS === "ios" ? 12 : 8),
        paddingHorizontal: normalize("width", 12),
      };
    }
    return {
      paddingVertical: normalize("height", Platform.OS === "ios" ? 10 : 6),
      paddingHorizontal: normalize("width", 12),
    };
  };
  const getMainFontSize = (): number => {
    return size === "regular" ? normalize("font", 18) : normalize("font", 14);
  };
  const TOP_LABEL_FONT_SIZE = normalize("font", 12);
  const getBorderRadius = (): number => {
    return 12;
  };

  let keyboardType: KeyboardTypeOptions = "default";
  let textContentType: React.ComponentProps<
    typeof TextInput
  >["textContentType"] = "none";
  let autoCapitalize: React.ComponentProps<typeof TextInput>["autoCapitalize"] =
    "sentences";

  switch (inputType) {
    case "email":
      keyboardType = "email-address";
      textContentType = "emailAddress";
      autoCapitalize = "none";
      break;
    case "numeric":
      keyboardType = "numeric";
      textContentType = "none";
      break;
    case "password":
      textContentType = "password";
      autoCapitalize = "none";
      break;
    case "text":
    default:
      break;
  }

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  const handleTextChange = (newText: string) => {
    if (inputType === "numeric") {
      const numericText = newText.replace(/[^0-9]/g, "");
      onChangeText(numericText);
    } else {
      onChangeText(newText);
    }
  };

  return (
    <Pressable
      onPress={disabled ? undefined : handleFocus}
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: getBorderRadius(),
          ...getBorderStyle(),
          ...getPadding(),
          ...getHeight(),
        },
        disabled && variant !== "primary" && { opacity: 0.6 },
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        {leftIcon && (
          <View
            style={[
              styles.iconContainer,
              { paddingLeft: getPadding().paddingHorizontal / 2 },
            ]}
          >
            {React.isValidElement(leftIcon)
              ? React.cloneElement(leftIcon as React.ReactElement<any>, {
                  color: disabled
                    ? COLORS.disabledText
                    : variant === "primary"
                    ? COLORS.white
                    : COLORS.primary,
                })
              : leftIcon}
          </View>
        )}

        <View style={[styles.inputAreaContainer, { pointerEvents: "auto" }]}>
          {showLabels ? (
            <View style={styles.labelContainer} pointerEvents="none">
              {topLabel && (
                <Text
                  style={[
                    styles.topLabel,
                    {
                      fontSize: TOP_LABEL_FONT_SIZE,
                      color: getTopLabelColor(),
                    },
                    topLabelStyle,
                  ]}
                  numberOfLines={1}
                >
                  {topLabel}
                </Text>
              )}
              <Text
                style={[
                  styles.label,
                  { fontSize: getMainFontSize(), color: getLabelColor() },
                  labelStyle,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          ) : (
            <TextInput
              style={[
                styles.input,
                { fontSize: getMainFontSize(), color: colors.orange500 },
                { paddingLeft: leftIcon ? 0 : normalize("width", 4) },
                { paddingRight: rightIcon ? 0 : normalize("width", 4) },
                inputStyle,
              ]}
              value={value}
              onChangeText={handleTextChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholderText}
              placeholderTextColor={colors.orange500}
              editable={!disabled}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              textContentType={textContentType}
              key={secureTextEntry ? "secure" : "plain"}
              textAlignVertical="center"
              underlineColorAndroid="transparent"
              autoFocus={false}
              pointerEvents="auto"
              {...otherTextInputProps}
            />
          )}
        </View>

        {rightIcon && (
          <TouchableOpacity onPress={handleTogglePasswordVisibility}>
            <View
              pointerEvents="auto"
              style={[
                styles.iconContainer,
                { paddingRight: getPadding().paddingHorizontal / 2 },
              ]}
            >
              {rightIcon}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: normalize("width", 196),
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputAreaContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  labelContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  topLabel: {
    fontWeight: "400",
    marginBottom: normalize("height", 2),
    textAlign: "left",
  },
  label: {
    fontWeight: "500",
    textAlign: "left",
  },
  input: {
    fontWeight: "500",
    textAlign: "left",
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
});
