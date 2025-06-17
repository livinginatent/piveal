import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const OTPScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#ff6b35" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>OTP tesdiqi</Text>
        <Text style={styles.subtitle}>
          +994990001122 nömrəsinə göndərdiyimiz təsdiq kodunu daxil edin:
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {/* Cursor line */}
          <View style={[styles.cursor, { left: activeIndex * 45 + 15 }]} />

          {otp.map((digit, index) => (
            <View key={index} style={styles.otpDotContainer}>
              <View
                style={[
                  styles.otpDot,
                  digit ? styles.otpDotFilled : styles.otpDotEmpty,
                ]}
              />
              <TextInput
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={styles.hiddenInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="numeric"
                maxLength={1}
                autoFocus={index === 0}
                onFocus={() => setActiveIndex(index)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Keyboard Spacer */}
      <View style={styles.keyboardSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#636e72",
    lineHeight: 24,
    marginBottom: 60,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingVertical: 40,
  },
  cursor: {
    position: "absolute",
    top: 25,
    width: 2,
    height: 30,
    backgroundColor: "#2d3436",
    zIndex: 1,
  },
  otpDotContainer: {
    marginHorizontal: 12,
    position: "relative",
  },
  otpDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  otpDotEmpty: {
    backgroundColor: "#b2bec3",
  },
  otpDotFilled: {
    backgroundColor: "#2d3436",
  },
  hiddenInput: {
    position: "absolute",
    top: -8,
    left: -8,
    width: 32,
    height: 32,
    opacity: 0,
  },
  keyboardSpacer: {
    height: 300, // Approximate keyboard height
  },
});

export default OTPScreen;
