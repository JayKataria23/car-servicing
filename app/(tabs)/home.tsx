import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const services = [
  {
    id: 1,
    name: "Complete Vehicle Maintenance",
    description: "Full inspection and maintenance of your vehicle",
    price: "Starting at ₹2,999",
  },
  {
    id: 2,
    name: "Oil Changing & Coolant Changing",
    description: "Essential fluid maintenance service",
    price: "Starting at ₹1,499",
  },
  {
    id: 3,
    name: "Servicing of Vehicles",
    description: "Regular maintenance and servicing",
    price: "Starting at ₹1,999",
  },
  {
    id: 4,
    name: "PUC/Petrol",
    description: "Pollution check and fuel services",
    price: "Starting at ₹499",
  },
  {
    id: 5,
    name: "Interior & Exterior Polishing",
    description: "Complete car detailing service",
    price: "Starting at ₹2,499",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.companyName}>MOTORBAY AUTO SOLUTIONS</Text>
          <Text style={styles.welcome}>
            Welcome, {user?.username || "Guest"}!
          </Text>
        </View>

        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Your Trusted Car Care Partner</Text>
          <Text style={styles.introText}>
            With over 10 years of experience, we provide professional car
            servicing and maintenance to keep your vehicle running at its best.
          </Text>
        </View>

        <View style={styles.videoSection}>
          <View style={styles.videoContainer}>
            {/* Replace with actual video component */}
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoText}>Watch How We Work</Text>
            </View>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/booking",
                    params: { serviceId: service.id },
                  });
                }}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C0A062",
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderBottomWidth: 1,
    borderBottomColor: "#C0A062",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
  },
  introSection: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  introTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: "#757575",
    lineHeight: 24,
  },
  videoSection: {
    padding: 20,
  },
  videoContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#C0A062",
  },
  videoPlaceholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: {
    fontSize: 18,
    color: "#757575",
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#C0A062",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C0A062",
    marginBottom: 15,
  },
  bookButton: {
    backgroundColor: "#C0A062",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactSection: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#C0A062",
  },
  contactInfo: {
    marginTop: 15,
    gap: 10,
  },
  contactText: {
    fontSize: 16,
    color: "#757575",
    lineHeight: 24,
  },
});
