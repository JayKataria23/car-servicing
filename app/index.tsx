import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <Redirect href="/(tabs)/home" />
      </SignedIn>
      <SignedOut>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Car Service</Text>
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});