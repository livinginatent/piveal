import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { CustomButton } from "./components/ui/Button/Button";

import Icon from "react-native-vector-icons/MaterialIcons";

const LoginScreen = () => {
const renderIcon = (size: "m" | "s") => {
  const iconSize = size === "m" ? 20 : 16;
  return (
    <Icon
      name="arrow-forward"
      size={iconSize}
      color={size === "m" ? "#ffffff" : "#153a6a"}
    />
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.column}>
            {/* Medium Filled Buttons */}
            <CustomButton
              label="Your text here"
              variant="filled"
              size="regular"
              leftIcon={<Icon name="arrow-back" size={20} color="#ffffff" />}
              rightIcon={
                <Icon name="arrow-forward" size={20} color="#ffffff" />
              }
            />

            <CustomButton
              label="Your text here"
              variant="filled"
              size="regular"
              leftIcon={<Icon name="arrow-back" size={20} color="#ffffff" />}
              rightIcon={
                <Icon name="arrow-forward" size={20} color="#ffffff" />
              }
            />

            <CustomButton
              label="Your text here"
              variant="filled"
              size="regular"
             
              disabled={true}
            />
          </View>

          <View style={styles.column}>
            {/* Small Filled Buttons */}
            <CustomButton
              label="Your text here"
              variant="filled"
              size="compact"
              leftIcon={<Icon name="arrow-back" size={16} color="#ffffff" />}
              rightIcon={
                <Icon name="arrow-forward" size={16} color="#ffffff" />
              }
            />

            <CustomButton
              label="Your text here"
              variant="filled"
              size="compact"
              leftIcon={<Icon name="arrow-back" size={16} color="#ffffff" />}
              rightIcon={
                <Icon name="arrow-forward" size={16} color="#ffffff" />
              }
            />

            <CustomButton
              label="Your text here"
              variant="filled"
              size="compact"
              
              disabled={true}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.column}>
            {/* Medium Outlined Buttons */}
            <CustomButton
              label="Your text here"
              variant="outlined"
              size="regular"
            />

            <CustomButton
              label="Your text here"
              variant="outlined"
              size="regular"
            />

            <CustomButton
              label="Your text here"
              variant="outlined"
              size="regular"
              disabled={true}
            />
          </View>

          <View style={styles.column}>
            {/* Small Outlined Buttons */}
            <CustomButton
              label="Your text here"
              variant="outlined"
              size="compact"
            />

            <CustomButton
              label="Your text here"
              variant="outlined"
              size="compact"
            />

            <CustomButton
              label="Your text here"
              variant="outlined"
              size="compact"
              disabled={true}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.column}>
            {/* Medium Text Buttons */}
            <CustomButton
              label="Your text here"
              variant="text"
              size="regular"
            />

            <CustomButton
              label="Your text here"
              variant="text"
              size="regular"
            />

            <CustomButton
              label="Your text here"
              variant="text"
              size="regular"
              disabled={true}
            />
          </View>

          <View style={styles.column}>
            {/* Small Text Buttons */}
            <CustomButton
              label="Your text here"
              variant="text"
              size="compact"
            />

            <CustomButton
              label="Your text here"
              variant="text"
              size="compact"
            />

            <CustomButton
              label="Your text here"
              variant="text"
              size="compact"
              disabled={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default LoginScreen;

const styles = StyleSheet.create({
  container: {
   flex:1,
   marginTop:10,
    padding: 15,
    
    backgroundColor: "#ffffff",
  },
  section: {
    flexDirection: "row",
    gap:10,
    marginBottom: 32,
  },
  column: {
    flex: 1,
    gap: 19,
  },
});