import { StyleSheet, View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PeopleHeader from "./PeopleHeader";
import PeopleCard from "./PeopleCard";
import { normalize } from "@/src/theme/normalize";
import { getAllUsers } from "@/src/api/services/peopleYouMayKnowService";
import * as SecureStore from "expo-secure-store";

// Define the User type for people in the list (you might want to add more properties)
type User = {
  id: number;
  username: string;
};

// Define the type for the full logged-in user object stored in SecureStore
// (Based on your previous log: {"id":20,"username":"test", ...})
type LoggedUser = {
  id: number;
  username: string;
  email: string;
  role: string; // or 'user' | 'admin' if you have fixed roles
  isVerified: boolean;
};

type GetAllUsersResponse = {
  users: User[];
};
const PeopleYouMayKnow = () => {
  const [people, setPeople] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPeople = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: GetAllUsersResponse = await getAllUsers();
        const loggedUserString = await SecureStore.getItemAsync("user");

        // Initialize as null or LoggedUser type
        let loggedUser: LoggedUser | null = null;

        if (loggedUserString) {
          // Parse the JSON string and cast it to the LoggedUser type
          loggedUser = JSON.parse(loggedUserString) as LoggedUser;
        }

        // Apply the filter: only include users whose ID is NOT the logged-in user's ID
        const filteredPeople = response.users.filter(
          // CORRECTED: use loggedUser?.id instead of loggedUser?.userId
          (user) => user.id !== loggedUser?.id
        );

        setPeople(filteredPeople);
        console.log("Fetched people (filtered):", filteredPeople);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch people";
        setError(errorMessage);
        console.error("Error fetching people:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPeople();
  }, []);

  useEffect(() => {
    console.log("People state updated:", people);
  }, [people]);

  const handleSendDrink = (userId: number) => {
    console.log("Send drink to user:", userId);
    // Add your send drink logic here
  };

  const handleConnect = (userId: number) => {
    console.log("Connect with user:", userId);
    // Add your connect logic here
  };

  return (
    <View style={styles.container}>
      <PeopleHeader />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {loading ? (
          // Show loading placeholder or spinner
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        ) : error ? (
          // Show error message
          <View style={styles.errorContainer}>
            <Text>Error: {error}</Text>
          </View>
        ) : people.length > 0 ? (
          // Show actual people cards
          people.map((person) => (
            <PeopleCard
              key={person.id}
              user={person}
              onSendDrink={handleSendDrink}
              onConnect={handleConnect}
            />
          ))
        ) : (
          // Show empty state
          <View style={styles.emptyContainer}>
            <Text>No people found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PeopleYouMayKnow;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollView: {
    paddingHorizontal: normalize("horizontal", 16),
    marginTop: normalize("vertical", 12),
  },
  scrollContent: {
    gap: normalize("horizontal", 12),
    paddingRight: normalize("horizontal", 16),
  },
  loadingContainer: {
    padding: normalize("horizontal", 20),
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    padding: normalize("horizontal", 20),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: normalize("horizontal", 20),
    justifyContent: "center",
    alignItems: "center",
  },
});
