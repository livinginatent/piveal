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
  const initialPrefix = value.slice(0, 3) || "050";
  const initialNumber = value.slice(3) || "";

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

      <View
        style={[
          styles.container,
          style,
          error && {
            borderColor: colors.error,
            backgroundColor: colors.errorPink,
          },
          isFocused && !error && { borderColor: colors.orange400 },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.prefixContainer,
            error && {
              backgroundColor: colors.errorPink,
            },
          ]}
          onPress={() => setIsDropdownVisible(true)}
        >
          <Text style={styles.prefixText}>{selectedPrefix}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

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
  },
  prefixContainer: {
    width: 60,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: colors.orange500,
    backgroundColor: colors.primaryBg,
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
    paddingVertical: 0,
    paddingHorizontal: 6,
    margin: 0,
    color: colors.orange500,
    fontSize: normalize("font", 18),
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
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
