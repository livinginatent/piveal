import { normalize } from "@/app/theme/normalize";
import { colors } from "@/app/theme/theme"; // Assuming theme file exists at this path
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
  type TextInputProps, // Import TextInputProps type
} from "react-native";

// Define the component variants (can be reused)
type InputVariant = "primary" | "outlined" | "text";

// Define the component sizes (can be reused)
type InputSize = "regular" | "compact";

// Define the input types the component will handle
type InputFieldType = "text" | "email" | "numeric" | "password";

// Define the props for the CustomTextInput component
// Extend TextInputProps to inherit standard props and allow spreading
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
    // Remove secureTextEntry from Omit, we will define it
  > {
  label: string; // Label shown when input is empty and not focused
  topLabel?: string; // Optional smaller label above the main label
  value: string; // Controlled input value
  onChangeText: (text: string) => void; // Callback for value changes
  variant?: InputVariant;
  size?: InputSize;
  inputType?: InputFieldType; // Prop to define input behavior
  placeholder?: string; // Placeholder text when input is focused and empty
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onFocus?: (e: any) => void; // Optional onFocus handler (accept event)
  onBlur?: (e: any) => void; // Optional onBlur handler (accept event)
  style?: StyleProp<ViewStyle>; // Style for the main container
  inputStyle?: StyleProp<TextStyle>; // Style specifically for the TextInput element
  labelStyle?: StyleProp<TextStyle>; // Style for the main label
  topLabelStyle?: StyleProp<TextStyle>; // Style for the top label
  disabled?: boolean;
  secureTextEntry?: boolean; // Add secureTextEntry explicitly
}

// Color palette (slightly adjusted for input context if needed)
const COLORS = {
  primary: colors.orange500,
  secondary: colors.orange400, // Used for focus/active state maybe
  white: "#ffffff",
  disabledBackground: colors.grey200, // Different disabled bg for input
  disabledBorder: colors.grey400,
  disabledText: colors.grey500,
  textDefault: colors.black, // Default text color when typing
  placeholder: colors.grey500,
  borderDefault: colors.grey300, // Default border for outlined/text if needed
  topLabelDefault: colors.grey500,
};

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  topLabel,
  value,
  onChangeText, // Original callback from parent
  variant = "primary",
  size = "regular",
  inputType = "text",
  placeholder: customPlaceholder, // Rename to avoid conflict
  leftIcon,
  rightIcon,
  onFocus, // Get standard onFocus prop
  onBlur, // Get standard onBlur prop
  style,
  inputStyle,
  labelStyle,
  topLabelStyle,
  disabled = false,
  secureTextEntry, // Destructure the explicitly passed secureTextEntry
  ...otherTextInputProps // Collect remaining TextInput props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine if the labels should be shown
  const showLabels = !isFocused && !value;
  // Determine placeholder text
  const placeholderText = customPlaceholder ?? label; // Use custom or default label

  // --- Style Calculation Functions (Adapted for Input) ---
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
    // Using the colors from your last provided version
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

  // --- Input Type Configuration (Determine keyboardType, etc., but NOT secureTextEntry) ---
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
      // Set defaults for password type, but secureTextEntry is controlled by prop
      textContentType = "password";
      autoCapitalize = "none";
      break;
    case "text":
    default:
      break;
  }

  // --- Event Handlers ---
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e); // Call external handler if provided, passing the event
  };
  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e); // Call external handler if provided, passing the event
  };
  // Intercept text change to filter based on inputType
  const handleTextChange = (newText: string) => {
    if (inputType === "numeric") {
      // Remove any non-digit characters using a regular expression
      const numericText = newText.replace(/[^0-9]/g, "");
      // Call the original onChangeText with the filtered value
      onChangeText(numericText);
    } else {
      // For other input types, pass the text through directly
      onChangeText(newText);
    }
  };

  // --- Render ---
  return (
    <Pressable
      onPress={disabled ? undefined : handleFocus} // Trigger focus state directly
      disabled={disabled} // Keep disabled prop on Pressable
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
        style, // Allow overriding container style
      ]}
    >
      {/* Added pointerEvents none to children to ensure Pressable receives tap */}
      <View style={styles.contentContainer} pointerEvents="none">
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

        {/* Central area for labels or input */}
        <View style={styles.inputAreaContainer}>
          {showLabels ? (
            // --- Render Labels ---
            // Added pointerEvents none
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
            // --- Render TextInput ---
            <TextInput
              style={[
                styles.input,
                // Using your specific color change from previous version
                { fontSize: getMainFontSize(), color: colors.orange500 },
                { paddingLeft: leftIcon ? 0 : normalize("width", 4) },
                { paddingRight: rightIcon ? 0 : normalize("width", 4) },
                inputStyle,
              ]}
              value={value}
              onChangeText={handleTextChange} // Use filtering handler
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholderText}
              // Using your specific color change from previous version
              placeholderTextColor={colors.orange500}
              editable={!disabled}
              keyboardType={keyboardType} // Still useful to show the right keyboard
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry} // Use the passed prop directly
              textContentType={textContentType}
              textAlignVertical="center"
              underlineColorAndroid="transparent"
              autoFocus={true}
              pointerEvents="auto" // Ensure TextInput itself is interactive
              {...otherTextInputProps} // Spread other props
            />
          )}
        </View>

        {/* Right Icon */}
        {/* Wrap the icon rendering logic in a View that allows pointer events */}
        {/* This allows the Pressable *inside* the icon (passed from parent) to be tapped */}
        {rightIcon && (
          <View
            pointerEvents="auto"
            style={[
              styles.iconContainer,
              { paddingRight: getPadding().paddingHorizontal / 2 },
            ]}
          >
            {rightIcon}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: normalize("width", 196), // Default width, can be overridden by style prop
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
