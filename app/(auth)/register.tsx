import AnimatedButton from "@/components/AnimatedButton";
import InputBox from "@/components/InputBox";
import { Colors } from "@/constants/Colors";
import { router } from 'expo-router';
import { useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";


export default function Login() {
    const scaleSignIn = useRef(new Animated.Value(1)).current;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Fitness Tracker</Text>
                <Text style={styles.subtitleText}>Uzupełnij dane, a my utworzymy konto</Text>
            </View>
            <View style={styles.formContainer}>
                <InputBox label="Imię" required inputMode="text"/>
                <InputBox label="Nazwisko" required inputMode="text"/>
                <InputBox placeholder="zbyszek@onet.pl" label="Adres e-mail" required inputMode="email"/>
                <InputBox placeholder="********" label="Hasło" isPassword required inputMode="text"/>
                <InputBox placeholder="********" label="Powtórze hasło" isPassword required inputMode="text"/>
            </View>

            <View style={styles.formAction}>
                <AnimatedButton scale={scaleSignIn} onPress={() => router.push('/(auth)/login')} buttonStyles={styles.formButton}>
                    <Text style={styles.formButtonText}>Zarejestruj się</Text>
                </AnimatedButton>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundSecondary
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 40
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 32,
        color: Colors.light.textPrimary
    },
    subtitleText: {
        fontSize: 16,
        color: Colors.light.textSecondary
    },

    formContainer: {
        marginHorizontal: 16,
        marginTop: 32,
        marginBottom: 8
    },
    formAction: {
        marginTop: 32,
        marginBottom: 16,
        marginHorizontal: 16
    },
  
    formButton: {
        backgroundColor: Colors.light.mainTheme,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'circular',
        borderRadius: 12,
        paddingVertical: 16,
        width: '100%',
    },
    formButtonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.light.backgroundSecondary
    },
})