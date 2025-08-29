/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import PeopleHeader from "./PeopleHeader";
import { normalize } from "@/src/theme/normalize";
import { getAllPeople } from "@/src/api/peopleYouMayKnowService";
import PeopleCard from "./PeopleCard";



const PeopleYouMayKnow = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllPeople();
        setUsers(response.users); // Access the users array from the response
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <PeopleHeader />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {users.map((user) => (
          <PeopleCard key={user.id} username={user.username} />
        ))}
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
  },
});
