import AnimatedButton from "@/components/AnimatedButton";
import { Colors } from "@/constants/Colors";
import { router } from 'expo-router';
import { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";


export default function Index() {

  const scaleSignIn = useRef(new Animated.Value(1)).current;
  const scaleRegister = useRef(new Animated.Value(1)).current;
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextMain}>
          Fitness Tracker
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AnimatedButton scale={scaleSignIn} onPress={() => router.push("/(auth)/login")} buttonStyles={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Logowanie</Text>
        </AnimatedButton>
        <AnimatedButton scale={scaleRegister} onPress={() => router.push("/(auth)/register")} buttonStyles={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Rejestracja</Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundPrimary,
    justifyContent: 'space-evenly'
  },

  headerContainer: {
    flex: 1/3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextMain: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: 'bold',
    color: Colors.light.textPrimary,
    marginTop: 64,
  },

  buttonsContainer: {
    flex: 1/3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    
  },
  
  buttonWrapper: {
    backgroundColor: Colors.light.mainTheme,
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'circular',
    borderRadius: 12, 
    paddingVertical: 16,
    width: '80%',
    maxWidth: 350
  },

  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.backgroundSecondary
  },

})