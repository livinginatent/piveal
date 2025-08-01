import { normalize } from "@/app/theme/normalize";
import { colors } from "@/app/theme/theme";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextInputProps,
} from "react-native";

interface PhoneNumberInputProps extends Omit<TextInputProps, "style"> {
  /** Current full value (prefix+number) */
  value?: string;
  /** Callback when full phone number changes */
  onChangeText?: (fullNumber: string) => void;
  /** Placeholder for numeric input */
  placeholder?: string;
  /** Style for the container view */
  style?: StyleProp<ViewStyle>;
  error?: boolean;
  errorText?: string | undefined | null;
  label?: string; // <-- new label prop
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value = "",
  onChangeText,
  placeholder = "Enter phone number",
  style,
  error = false,
  errorText,
  label,
  ...props
}) => {
  // extract prefix and number from incoming value
  const initialPrefix = value.slice(0, 4) || "050";
  const initialNumber = value.slice(4) || "";

  const [selectedPrefix, setSelectedPrefix] = useState<string>(initialPrefix);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialNumber);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false); // track focus
  const prefixes = [
    { id: "1", code: "010" },
    { id: "2", code: "050" },
    { id: "3", code: "051" },
    { id: "4", code: "055" },
    { id: "5", code: "070" },
    { id: "6", code: "077" },
    { id: "7", code: "099" },
  ];

  const handlePhoneNumberChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "").slice(0, 7);
    setPhoneNumber(numericText);
    if (onChangeText) {
      onChangeText(selectedPrefix + numericText);
    }
  };

  const handlePrefixSelect = (prefix: string) => {
    setSelectedPrefix(prefix);
    setIsDropdownVisible(false);
    if (onChangeText) {
      onChangeText(prefix + phoneNumber);
    }
  };

  const renderPrefixItem = ({
    item,
  }: {
    item: { id: string; code: string };
  }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handlePrefixSelect(item.code)}
    >
      <Text style={styles.dropdownItemText}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginBottom: normalize("height", 16) }}>
      {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : isFocused || value ? (
        <Text style={styles.upperLabel}>{label}</Text>
      ) : null}

      <View style={[{ flexDirection: "row", gap: 8 }, style]}>
        <TouchableOpacity
          style={[
            styles.prefixStandalone,
            error && { backgroundColor: colors.errorPink },
          ]}
          onPress={() => setIsDropdownVisible(true)}
        >
          <Text style={styles.prefixText}>{selectedPrefix}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.container,
            error && {
              borderColor: colors.error,
              backgroundColor: colors.errorPink,
            },
            isFocused && !error && { borderColor: colors.orange400 },
          ]}
        >
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder={isFocused || errorText ? "" : placeholder}
            placeholderTextColor={colors.orange500}
            keyboardType="numeric"
            maxLength={7}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </View>
      </View>

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={[styles.dropdownContainer]}>
            <FlatList
              data={prefixes}
              renderItem={renderPrefixItem}
              keyExtractor={(item) => item.id}
              style={styles.dropdown}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: normalize("height", 65), // Ensure consistent height
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: colors.orange500,
    borderRadius: 4,
    backgroundColor: colors.primaryBg,
    overflow: "hidden",
    flexGrow: 1, // Ensure it takes the remaining space
    flexShrink: 1, // Prevent overflow
  },
  prefixStandalone: {
    height: normalize("height", 65),
    minWidth: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: normalize("horizontal", 8),
    borderColor: colors.orange500,
    backgroundColor: colors.primaryBg,
    borderRadius: 4,
    borderWidth: 1.5,
  },
  prefixText: {
    fontSize: normalize("font", 18),
    fontWeight: "500",
    color: colors.orange500,
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#666",
    marginLeft: 4,
  },
  input: {
    flex: 1,
    fontWeight: "500",
    textAlign: "left",
    margin: 0,
    color: colors.orange500,
    fontSize: normalize("font", 18),
    width: "auto", // Allow input to adjust to available space
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: colors.primaryBg,
    borderRadius: 8,
    maxHeight: 200,
    width: 100,
 
  },
  dropdown: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.orange500,
    textAlign: "center",
  },
  errorText: {
    position: "absolute",
    top: 4,
    left: 65,
    color: colors.error,
    zIndex: 1,
    lineHeight: 13,
    fontSize: normalize("font", 12),
  },
  upperLabel: {
    position: "absolute",
    top: 4,
    left: 1,
    fontSize: normalize("font", 12),
    color: colors.grey400,
    zIndex: 1,
  },
});
