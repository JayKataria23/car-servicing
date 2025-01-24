import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";

const services = [
  { id: 1, name: "Complete Vehicle Maintenance" },
  { id: 2, name: "Oil Changing & Coolant Changing" },
  { id: 3, name: "Servicing of Vehicles" },
  { id: 4, name: "PUC/Petrol" },
  { id: 5, name: "Interior & Exterior Polishing" },
];

const timeSlots = Array.from({ length: 19 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
}).filter((time) => {
  const hour = parseInt(time.split(":")[0]);
  return hour >= 9 && hour < 18;
});

export default function BookingScreen() {
  const { serviceId } = useLocalSearchParams();
  const [selectedService, setSelectedService] = useState(serviceId || "");
  const [carBrand, setCarBrand] = useState("");
  const [carName, setCarName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");

  useEffect(() => {
    if (serviceId) {
      setSelectedService(serviceId);
    }
  }, [serviceId]);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Book a Service</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Service Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedService}
              onValueChange={setSelectedService}
              style={styles.picker}
            >
              <Picker.Item label="Select a service" value="" />
              {services.map((service) => (
                <Picker.Item
                  key={service.id}
                  label={service.name}
                  value={service.id}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Car Brand</Text>
          <TextInput
            style={styles.input}
            value={carBrand}
            onChangeText={setCarBrand}
            placeholder="e.g., Toyota, Honda, Maruti"
          />

          <Text style={styles.label}>Car Name</Text>
          <TextInput
            style={styles.input}
            value={carName}
            onChangeText={setCarName}
            placeholder="e.g., Innova, City, Swift"
          />

          <Text style={styles.label}>Registration Number</Text>
          <TextInput
            style={styles.input}
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            placeholder="e.g., MH02AB1234"
            autoCapitalize="characters"
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder="e.g., 9876543210"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Description of Issue</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe any specific issues or requirements..."
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Select Time</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTime}
              onValueChange={setSelectedTime}
              style={styles.picker}
            >
              {timeSlots.map((time) => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.submitButton}>
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
    backgroundColor: "#fff",
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
