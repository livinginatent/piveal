import { normalize } from "@/src/theme/normalize";
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

interface IconButtonProps {
  title?: string;
  onPress?: () => void;
  icon?: React.ReactElement | null; // Can be any React element (icon component)
  iconPosition?: "left" | "right";
  backgroundColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  padding?: number;
  gap?: number;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: string;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
  iconStyle?: object;
  borderColor?: string;
  borderWidth?: number;
}

export const SendButton: React.FC<IconButtonProps> = ({
  title = "",
  onPress,
  icon = null,
  iconPosition = "left",
  backgroundColor = "#F46A25",
  borderColor = "#F46A25",
  borderWidth = 1,
  textColor = "#FFFFFF",
  lineHeight = 20,
  width = normalize("width", 91),
  height = normalize("height", 40),
  borderRadius = 50,
  padding = 10,
  gap = 4,
  fontSize = normalize("font", 14),
  fontWeight = "400",
  disabled = false,
  style = {},
  textStyle = {},
  iconStyle = {},
  ...props
}) => {
  const renderContent = () => {
    const textElement = title ? (
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize,
            fontWeight,
            lineHeight,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    ) : null;

    const iconElement = icon ? (
      <View style={[styles.iconContainer, iconStyle]}>{icon}</View>
    ) : null;

    if (!title && icon) {
      return <View style={styles.centerIcon}>{iconElement}</View>;
    }

    if (iconPosition === "right") {
      return (
        <>
          {textElement}
          {iconElement}
        </>
      );
    }

    return (
      <>
        {iconElement}
        {textElement}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? "#CCCCCC" : backgroundColor,
          width,
          height,
          borderRadius,
          padding,
          gap,
          borderColor: borderColor ? borderColor : null,
          borderWidth: borderWidth ? borderWidth : null,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  text: {
    textAlign: "center",
    flexShrink: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
