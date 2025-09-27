import { StyleSheet, View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PeopleHeader from "./PeopleHeader";
import PeopleCard from "./PeopleCard";
import { normalize } from "@/src/theme/normalize";
import { getAllUsers } from "@/src/api/peopleYouMayKnowService";

// Define the User type (should match your API response)
type User = {
  id: number;
  username: string;
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
        setPeople(response.users);
        console.log("Fetched people:", response.users);
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
