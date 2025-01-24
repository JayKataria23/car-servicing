import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

const services = [
  {
    id: 1,
    name: 'Complete Vehicle Maintenance',
    description: 'Full inspection and maintenance of your vehicle',
    price: 'Contact for price',
  },
  {
    id: 2,
    name: 'Oil Changing & Coolant Changing',
    description: 'Essential fluid maintenance service',
    price: 'Contact for price',
  },
  {
    id: 3,
    name: 'Servicing of Vehicles',
    description: 'Regular maintenance and servicing',
    price: 'Contact for price',
  },
  {
    id: 4,
    name: 'PUC/Petrol',
    description: 'Pollution check and fuel services',
    price: 'Contact for price',
  },
  {
    id: 5,
    name: 'Interior & Exterior Polishing',
    description: 'Complete car detailing service',
    price: 'Contact for price',
  }
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