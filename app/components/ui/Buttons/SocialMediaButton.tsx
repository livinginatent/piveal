import type React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { normalize } from "@/app/theme/normalize";

interface SocialLoginButtonProps {
  icon: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  icon,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: normalize("width", 60),
    height: normalize("width", 60),
    borderRadius: normalize("width", 30),
    borderWidth: 1,
    borderColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  icon: {
    fontSize: normalize("font", 24),
    color: "#666666",
  },
});
