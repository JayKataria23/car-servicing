import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen() {
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
  });
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    // Will implement EmailJS integration later
    console.log('Booking submitted:', { carDetails, date });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Book a Service</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Car Make</Text>
          <TextInput
            style={styles.input}
            value={carDetails.make}
            onChangeText={(text) => setCarDetails({ ...carDetails, make: text })}
            placeholder="Enter car make"
          />

          <Text style={styles.label}>Car Model</Text>
          <TextInput
            style={styles.input}
            value={carDetails.model}
            onChangeText={(text) => setCarDetails({ ...carDetails, model: text })}
            placeholder="Enter car model"
          />

          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            value={carDetails.year}
            onChangeText={(text) => setCarDetails({ ...carDetails, year: text })}
            placeholder="Enter car year"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Registration Number</Text>
          <TextInput
            style={styles.input}
            value={carDetails.registrationNumber}
            onChangeText={(text) => setCarDetails({ ...carDetails, registrationNumber: text })}
            placeholder="Enter registration number"
          />

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>Select Date and Time</Text>
          </TouchableOpacity>

          <Text style={styles.selectedDate}>
            Selected: {date.toLocaleString()}
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Book Service</Text>
          </TouchableOpacity>
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
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedDate: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});