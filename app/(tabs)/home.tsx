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
    price: 'Starting at ₹2,999',
  },
  {
    id: 2,
    name: 'Oil Changing & Coolant Changing',
    description: 'Essential fluid maintenance service',
    price: 'Starting at ₹1,499',
  },
  {
    id: 3,
    name: 'Servicing of Vehicles',
    description: 'Regular maintenance and servicing',
    price: 'Starting at ₹1,999',
  },
  {
    id: 4,
    name: 'PUC/Petrol',
    description: 'Pollution check and fuel services',
    price: 'Starting at ₹499',
  },
  {
    id: 5,
    name: 'Interior & Exterior Polishing',
    description: 'Complete car detailing service',
    price: 'Starting at ₹2,499',
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome, {user?.username || 'Guest'}!</Text>
        </View>

        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Your Trusted Car Care Partner</Text>
          <Text style={styles.introText}>
            With over 10 years of experience, we provide professional car servicing 
            and maintenance to keep your vehicle running at its best.
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
        </View>
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
    backgroundColor: '#2196F3',
  },
  welcome: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  introSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  videoSection: {
    padding: 20,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  videoText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  serviceCard: {
    margin: 0,
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
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