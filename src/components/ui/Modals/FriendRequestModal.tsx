// components/FriendRequestModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { width, height } = Dimensions.get("window");

export type ModalType = "success" | "error" | "loading" | "info";

interface FriendRequestModalProps {
  visible: boolean;
  type: ModalType;
  title: string;
  message?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const FriendRequestModal: React.FC<FriendRequestModalProps> = ({
  visible,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  autoCloseDelay = 3000,
}) => {
  React.useEffect(() => {
    if (visible && autoClose && type !== "loading") {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [visible, autoClose, type, autoCloseDelay, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />;
      case "error":
        return <Ionicons name="close-circle" size={60} color="#F44336" />;
      case "loading":
        return <ActivityIndicator size="large" color="#007AFF" />;
      case "info":
        return <Ionicons name="information-circle" size={60} color="#007AFF" />;
      default:
        return <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#E8F5E8";
      case "error":
        return "#FFEBEE";
      case "loading":
        return "#E3F2FD";
      case "info":
        return "#E3F2FD";
      default:
        return "#E8F5E8";
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: getBackgroundColor() },
          ]}
        >
          <View style={styles.iconContainer}>{getIcon()}</View>

          <Text style={styles.title}>{title}</Text>

          {message && <Text style={styles.message}>{message}</Text>}

          {type !== "loading" && (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
