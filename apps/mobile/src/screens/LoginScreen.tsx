import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuthStore } from "../store/authStore";

export default function LoginScreen() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"CONSUMER" | "BUSINESS">("CONSUMER");
  const [isLoading, setIsLoading] = useState(false);

  const { signup, login, error, clearError } = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      clearError();

      if (isSignup) {
        await signup({ email, password, userType });
        Alert.alert(
          "Success",
          `Welcome! Hello ${
            userType === "CONSUMER" ? "independent" : "business"
          } user`
        );
      } else {
        await login({ email, password });
        Alert.alert("Success", "Login successful!");
      }
    } catch (err) {
      Alert.alert("Error", error || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUserType("CONSUMER");
    clearError();
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>FlyBeth</Text>
            <Text style={styles.subtitle}>
              {isSignup ? "Create your account" : "Welcome back"}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                autoComplete="password"
              />
            </View>

            {isSignup && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Account Type</Text>
                <View style={styles.userTypeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      userType === "CONSUMER" && styles.userTypeButtonActive,
                    ]}
                    onPress={() => setUserType("CONSUMER")}
                  >
                    <Text
                      style={[
                        styles.userTypeText,
                        userType === "CONSUMER" && styles.userTypeTextActive,
                      ]}
                    >
                      Consumer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      userType === "BUSINESS" && styles.userTypeButtonActive,
                    ]}
                    onPress={() => setUserType("BUSINESS")}
                  >
                    <Text
                      style={[
                        styles.userTypeText,
                        userType === "BUSINESS" && styles.userTypeTextActive,
                      ]}
                    >
                      Business
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                isLoading && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading
                  ? "Please wait..."
                  : isSignup
                  ? "Sign Up"
                  : "Sign In"}
              </Text>
            </TouchableOpacity>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>
              <TouchableOpacity onPress={toggleMode}>
                <Text style={styles.toggleButton}>
                  {isSignup ? "Sign In" : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  form: {
    width: "100%",
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
  userTypeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  userTypeButtonActive: {
    borderColor: "#2563eb",
    backgroundColor: "#2563eb",
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b7280",
  },
  userTypeTextActive: {
    color: "#fff",
  },
  submitButton: {
    height: 50,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  toggleText: {
    fontSize: 14,
    color: "#6b7280",
  },
  toggleButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
});
