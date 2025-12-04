import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useTripStore } from "../store/tripStore";

interface TripBookingFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userType?: "CONSUMER" | "BUSINESS";
}

export default function TripBookingForm({
  visible,
  onClose,
  onSuccess,
  userType,
}: TripBookingFormProps) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const { bookTrip, error, clearError } = useTripStore();

  const resetForm = () => {
    setDestination("");
    setStartDate("");
    setEndDate("");
    setTravelers("1");
    clearError();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!destination || !startDate || !endDate || !travelers) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isNaN(Number(travelers)) || Number(travelers) < 1) {
      Alert.alert("Error", "Please enter a valid number of travelers");
      return;
    }

    // Basic date validation (in a real app, you'd use a proper date picker)
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      Alert.alert("Error", "Please enter valid dates (YYYY-MM-DD format)");
      return;
    }

    if (start >= end) {
      Alert.alert("Error", "End date must be after start date");
      return;
    }

    try {
      setIsLoading(true);
      clearError();

      const bookingData = {
        destination,
        startDate,
        endDate,
        travelers: Number(travelers),
      };

      await bookTrip(bookingData, userType === "BUSINESS");

      Alert.alert("Success", "Trip booked successfully!");
      onSuccess();
    } catch (err) {
      Alert.alert("Error", error || "Failed to book trip");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Book Trip</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.form}
          contentContainerStyle={styles.formContent}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              placeholder="Enter destination"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={styles.input}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9ca3af"
            />
            <Text style={styles.helperText}>Format: YYYY-MM-DD</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>End Date</Text>
            <TextInput
              style={styles.input}
              value={endDate}
              onChangeText={setEndDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9ca3af"
            />
            <Text style={styles.helperText}>Format: YYYY-MM-DD</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Travelers</Text>
            <TextInput
              style={styles.input}
              value={travelers}
              onChangeText={setTravelers}
              placeholder="1"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Booking..." : "Book Trip"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    ...Platform.select({
      ios: {
        paddingTop: 60,
      },
      android: {
        paddingTop: 20,
      },
    }),
  },
  cancelButton: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  placeholder: {
    width: 60,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#111827",
  },
  helperText: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  submitButton: {
    height: 50,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
