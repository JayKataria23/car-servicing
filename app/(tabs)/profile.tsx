import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const contactInfo = {
    name: "Puneet Singh",
    phone: "+91 98200 92593",
    address:
      "82, Gurunanak Petrol Pump, Below WEH Metro Station, Andheri (E), Mumbai - 400 093.",
    email: "khalsapuneet11@gmail.com",
    website: "www.motorbayautosolutions.in",
  };

  const handlePress = (type: string) => {
    switch (type) {
      case "phone":
        Linking.openURL(`tel:${contactInfo.phone}`);
        break;
      case "email":
        Linking.openURL(`mailto:${contactInfo.email}`);
        break;
      case "website":
        Linking.openURL(`https://${contactInfo.website}`);
        break;
    }
  };

  const ContactSection = () => (
    <View style={styles.contactSection}>
      <Text style={styles.sectionTitle}>Contact Us</Text>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => handlePress("phone")}
      >
        <Ionicons name="call-outline" size={24} color="#2196F3" />
        <View style={styles.contactText}>
          <Text style={styles.contactLabel}>Owner</Text>
          <Text style={styles.contactValue}>{contactInfo.name}</Text>
          <Text style={styles.contactValue}>{contactInfo.phone}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => handlePress("email")}
      >
        <Ionicons name="mail-outline" size={24} color="#2196F3" />
        <View style={styles.contactText}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{contactInfo.email}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.contactItem}>
        <Ionicons name="location-outline" size={24} color="#2196F3" />
        <View style={styles.contactText}>
          <Text style={styles.contactLabel}>Address</Text>
          <Text style={styles.contactValue}>{contactInfo.address}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => handlePress("website")}
      >
        <Ionicons name="globe-outline" size={24} color="#2196F3" />
        <View style={styles.contactText}>
          <Text style={styles.contactLabel}>Website</Text>
          <Text style={styles.contactValue}>{contactInfo.website}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <View style={styles.profileInfo}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.infoText}>Name: {user?.username}</Text>
          <Text style={styles.infoText}>
            Email: {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <ContactSection />

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => signOut()}
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>

      <SignedOut>
        <View style={styles.signInContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Please sign in to view your profile
          </Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <ContactSection />
      </SignedOut>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileInfo: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  signOutButton: {
    margin: 20,
    backgroundColor: "#D32F2F", // Brand red
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  signOutButtonText: {
    color: "#FFFFFF", // White
    fontSize: 18,
    fontWeight: "bold",
  },
  signInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575", // Grey
    marginBottom: 30,
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: "#C0A062", // Gold
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  signInButtonText: {
    color: "#FFFFFF", // White
    fontSize: 18,
    fontWeight: "bold",
  },
  contactSection: {
    padding: 20,
    backgroundColor: "#F5F5F5", // Light grey
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0A062", // Gold border
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#424242", // Dark grey
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#FFFFFF", // White
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactText: {
    marginLeft: 15,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: "#757575", // Grey
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: "#424242", // Dark grey
  },
});
