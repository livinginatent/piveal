/* eslint-disable @typescript-eslint/no-explicit-any */
// toastConfig.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  // Custom notification toast
  notification: ({ text1, text2, onPress }: any) => (
    <TouchableOpacity onPress={onPress} style={styles.customToast}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{text1}</Text>
        <Text style={styles.notificationBody}>{text2}</Text>
      </View>
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: "#4CAF50",
    borderLeftWidth: 5,
    width: "90%",
  },
  errorToast: {
    borderLeftColor: "#F44336",
    borderLeftWidth: 5,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 14,
    color: "#666",
  },
  customToast: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 50,
  },
  notificationContent: {
    flexDirection: "column",
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: "#666",
  },
});
