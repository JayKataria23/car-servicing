import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <Redirect href="/(tabs)/home" />
      </SignedIn>
      <SignedOut>
        <View style={styles.content}>
          <Text style={styles.companyName}>MOTORBAY AUTO SOLUTIONS</Text>
          <Text style={styles.subtitle}>Premium Car Service</Text>
          <View style={styles.buttonContainer}>
            <Link href="/(auth)/sign-in" style={styles.button}>
              <Text style={styles.buttonText}>Sign in</Text>
            </Link>
            <Link href="/(auth)/sign-up" style={styles.button}>
              <Text style={styles.buttonText}>Sign up</Text>
            </Link>
          </View>
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  companyName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C0A062",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#757575",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    backgroundColor: "#C0A062",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
