import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { CustomCTAButton } from "./components/ui/Buttons/CTAButton";
import { CustomInputButton } from "./components/ui/Buttons/InputButton";

const LoginScreen = () => {
  const renderIcon = (size: "m" | "s") => {
    const iconSize = size === "m" ? 16 : 16;
    return (
      <Icon
        name="arrow-forward"
        size={iconSize}
        color={size === "m" ? "#ffffff" : "#153a6a"}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomCTAButton
          label="Your Text"
          variant="filled"
          size="large"
          onPress={() => console.log("Filled pressed")}
          leftIcon={<Icon name="arrow-back" size={16} color="#ffffff" />}
          rightIcon={<Icon name="arrow-back" size={16} color="#ffffff" />}
        />
        <CustomInputButton
          label="Your Text"
          variant="filled"
          size="regular"
          onPress={() => console.log("Filled pressed")}
          leftIcon={<Icon name="arrow-back" size={16} color="#ffffff" />}
          rightIcon={<Icon name="arrow-back" size={16} color="#ffffff" />}
        />

        <CustomCTAButton
          label="Your Text"
          variant="filled"
          size="medium"
          onPress={() => console.log("Filled pressed")}
        />
        <CustomCTAButton
          label="Your Text"
          variant="filled"
          size="medium"
          disabled={true}
          onPress={() => console.log("Filled pressed")}
        />
    
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    padding: 16,
  },
});
