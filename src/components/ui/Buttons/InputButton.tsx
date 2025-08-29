import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type InputVariant = "default" | "active" | "disabled" | "error";

interface CustomInputProps {
  variant?: InputVariant;
  label: string;
  placeholder: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isSecure?: boolean;
  leftIcon?: string;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  errorText?: string | null | undefined;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  variant = "default",
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isSecure = false,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  errorText,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(!isSecure);

  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getContainerStyle = (): object => {
    if (variant === "error") {
      return styles.containerError;
    }
    if (variant === "disabled") {
      return styles.containerDisabled;
    }

    if (isFocused || variant === "active") {
      return styles.containerActive;
    }

    return styles.containerUnfocused;
  };

  const getTextStyle = (): object => {
    switch (variant) {
      case "disabled":
        return styles.textDisabled;
      case "error":
        return styles.textError;
      default:
        return styles.textDefault;
    }
  };

  const getPlaceholderTextColor = (): string => {
    if (variant === "disabled") {
      return "#888";
    }

    return colors.orange500;
  };

  return (
    <View style={[styles.inputWrapper, getContainerStyle()]}>
      {/* Upper Label: Show when focused OR when there's a value */}
      {variant === "error" ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : isFocused || value ? (
        <Text style={styles.upperLabel}>{label}</Text>
      ) : null}

      <View style={styles.inputContent}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            style={styles.iconContainer}
            disabled={variant === "disabled"}
          >
            <Icon
              name={leftIcon}
              size={normalize("font", 20)}
              color={variant === "disabled" ? "#888" : colors.orange500}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            styles.input,
            getTextStyle(),
            isFocused || value ? { marginTop: normalize("vertical", 8) } : null,
          ]}
          placeholder={isFocused || errorText ? "" : placeholder}
          placeholderTextColor={getPlaceholderTextColor()}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          secureTextEntry={isSecure && !showPassword}
          editable={variant !== "disabled"}
          autoCapitalize="none"
        />
        {isSecure ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
            disabled={variant === "disabled"}
          >
            <Icon
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={normalize("font", 20)}
              color={
                variant === "disabled"
                  ? "#888"
                  : variant === "error"
                  ? colors.error
                  : colors.orange500
              }
            />
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconContainer}
              disabled={variant === "disabled"}
            >
              {typeof rightIcon === "string" ? (
                <Icon
                  name={rightIcon}
                  size={normalize("font", 20)}
                  color={variant === "disabled" ? "#888" : colors.orange500}
                />
              ) : (
                rightIcon
              )}
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderRadius: normalize("width", 4),
    borderWidth: normalize("width", 1.5),
    paddingHorizontal: normalize("horizontal", 12),
    paddingVertical: normalize("vertical", 8),
    marginBottom: normalize("vertical", 16),
    maxHeight: normalize("height", 68),
    minHeight: normalize("height", 65),
    justifyContent: "center", // Center content vertically
  },

  containerUnfocused: {
    borderColor: colors.orange500,
    backgroundColor: colors.primaryBg,
  },
  containerActive: {
    borderColor: colors.orange400,
    backgroundColor: colors.primaryBg,
  },
  containerDisabled: {
    borderColor: "#555",
    backgroundColor: "#222",
  },
  containerError: {
    borderColor: colors.error,
    backgroundColor: colors.errorPink,
  },
  upperLabel: {
    position: "absolute",
    top: normalize("vertical", 4),
    left: normalize("horizontal", 12),
    fontSize: normalize("font", 12),
    color: colors.grey400,
    zIndex: 1,
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontWeight: "500",
    paddingVertical: normalize("vertical", 0),
    paddingHorizontal: normalize("horizontal", 4),
    color: colors.orange500,
    fontSize: normalize("font", 18),
    textAlignVertical: "center", // Text alignment inside input
  },
  textDefault: {
    color: colors.orange500,
  },
  textDisabled: {
    color: "#888",
  },
  textError: {
    color: colors.error,
  },
  iconContainer: {
    paddingHorizontal: normalize("horizontal", 5),
  },
  errorText: {
    position: "absolute",
    top: normalize("vertical", 4),
    left: normalize("horizontal", 12),
    color: colors.error,
    zIndex: 1,
    fontSize: normalize("font", 12),
  },
});
