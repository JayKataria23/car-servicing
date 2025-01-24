import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

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

  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: undefined,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
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

          <Text style={styles.label}>Upload Car Images (Optional)</Text>
          <View style={styles.imageSection}>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              <Ionicons name="camera" size={24} color="#C0A062" />
              <Text style={styles.imagePickerText}>Add Photos</Text>
            </TouchableOpacity>

            <ScrollView horizontal style={styles.imagePreviewScroll}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="#FF0000" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

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
            style={[styles.input, { height: 100 }]}
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
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0A062",
  },
  label: {
    fontSize: 16,
    color: "#424242",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C0A062",
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#424242",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C0A062",
    borderRadius: 5,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#424242",
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C0A062",
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#424242",
  },
  timePickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C0A062",
    borderRadius: 5,
    marginBottom: 16,
    overflow: "hidden",
  },
  submitButton: {
    backgroundColor: "#C0A062",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    marginTop: 5,
  },
  imageSection: {
    marginBottom: 20,
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#C0A062",
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#C0A062",
    fontWeight: "500",
  },
  imagePreviewScroll: {
    flexDirection: "row",
    marginTop: 10,
  },
  imagePreviewContainer: {
    marginRight: 10,
    position: "relative",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C0A062",
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
});
