import * as React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email, username, and password provided
    try {
      await signUp.create({
        emailAddress,
        username,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Verify Your Email</Text>
              <Text style={styles.subtitle}>
                Enter the 6-digit code sent to your email
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="key-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Verification Code"
                  placeholderTextColor="#999"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="numeric"
                  maxLength={6}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
                <Text style={styles.buttonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#666"
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.togglePasswordButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={onSignUpPress}
              disabled={!username || !emailAddress || !password}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.25,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
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
  inputContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: "#424242",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  togglePasswordButton: {
    padding: 8,
  },
  verificationContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  codeInput: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#C0A062",
    borderRadius: 8,
    padding: 16,
    fontSize: 20,
    width: "60%",
    textAlign: "center",
    marginTop: 12,
    letterSpacing: 4,
  },
  button: {
    backgroundColor: "#C0A062",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    width: "100%",
    shadowColor: "#C0A062",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signInText: {
    color: "#757575",
    fontSize: 15,
  },
  signInLink: {
    marginLeft: 6,
  },
  signInLinkText: {
    color: "#C0A062",
    fontSize: 15,
    fontWeight: "bold",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
    letterSpacing: 0.25,
  },
});
