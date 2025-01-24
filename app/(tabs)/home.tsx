import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

const services = [
  {
    id: 1,
    name: 'Basic Service',
    description: 'Oil change, filter replacement, and basic inspection',
    price: '$99',
  },
  {
    id: 2,
    name: 'Full Service',
    description: 'Comprehensive car check-up and maintenance',
    price: '$199',
  },
  {
    id: 3,
    name: 'Premium Service',
    description: 'Complete car service with detailed inspection',
    price: '$299',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Available Services</Text>
          <Text style={styles.welcome}>Welcome, {user?.firstName || 'User'}!</Text>
        </View>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/booking",
                  params: { serviceId: service.id }
                });
              }}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  header: {
    padding: 20,
  },
  welcome: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  serviceCard: {
    margin: 10,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    marginTop: 5,
    color: '#666',
  },
  servicePrice: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});