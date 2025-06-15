import AnimatedButton from '@/components/AnimatedButton';
import InfoBox from '@/components/InfoBox';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
export default function index() {

    const scaleStartTraining = useRef(new Animated.Value(1)).current;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.lastActivityContainer}>
                    <View style={styles.HeaderContainer}>
                        <Text style={styles.HeaderText}>
                            Ostatni trening
                        </Text>
                    </View>
                    <InfoBox>
                        <Text style={styles.lastActivityText}>Data: 15.06.205</Text>
                        <Text style={styles.lastActivityText}>Nazwa: Push</Text>
                        <Text style={styles.lastActivityText}>Czas: 00:27:02</Text>
                        <Text style={styles.lastActivityText}>Wykonane serie: 6/6</Text>
                    </InfoBox>
                </View>
                <View style={styles.lastActivityContainer}>
                    <View style={styles.HeaderContainer}>
                        <Text style={styles.HeaderText}>
                            Rekordy
                        </Text>
                    </View>
                    <InfoBox>
                        <Text style={styles.lastActivityText}>Martwy ciąg: 85kg</Text>
                        <Text style={styles.lastActivityText}>Wyciskanie: 70kg</Text>
                        <Text style={styles.lastActivityText}>Przysiad: 60kg</Text>
                    </InfoBox>
                </View>
                <View style={styles.buttonContainer}>
                    <AnimatedButton scale={scaleStartTraining} onPress={() => router.push('/(logged-in)/trainingSession')} buttonStyles={styles.startTrainingButton}>
                        <Text style={styles.startTrainingButtonText}>Rozpocznij trening</Text>
                    </AnimatedButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    lastActivityContainer: {
        
    },
    HeaderContainer: {
        margin: 16,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    HeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    lastAstivityContentContainer: {
        borderRadius: 12,
        borderCurve: 'circular',
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 6
        },
        elevation: 2,
        padding: 16,
        gap: 8
    },

    lastActivityText: {
        fontWeight: '500'
    },

    todaySugestionContainer: {
        borderRadius: 12,
        borderCurve: 'circular',
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingLeft: 16
    },
    todaySuggestionText: {
        color: '#58c443',
        fontSize: 16,
        fontWeight: '600'
    },

    buttonContainer: {
        marginHorizontal: 16,
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    startTrainingButton: {
        backgroundColor: Colors.light.mainTheme,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'circular',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        //width: '70%'
    },

    startTrainingButtonText: {
        fontWeight: '600',
        fontSize: 16,
        color: Colors.light.backgroundSecondary
    },

    
})