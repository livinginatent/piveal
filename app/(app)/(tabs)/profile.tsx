import { useNotifications } from "@/src/context/NotificationContext";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  return (
    <View style={styles.container}>
      <ScrollView>
        {notifications.map((n) => (
          <TouchableOpacity key={n.id} onPress={() => markAsRead(n.id)}>
            <Text style={{ fontWeight: n.isRead ? "normal" : "bold" }}>
              {n.title}
            </Text>
            <Text>{n.body}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Clear All" onPress={clearNotifications} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
