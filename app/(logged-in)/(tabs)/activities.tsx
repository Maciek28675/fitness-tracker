import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

import AnimatedButton from '@/components/AnimatedButton';
import InfoBox from '@/components/InfoBox';
import MessageModalChildren from '@/components/MessageModalChildren';
import { Colors } from '@/constants/Colors';

export default function index() {

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema });

    const [trainings, setTrainings] = useState<Array<any>>([]);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState<boolean>(false)

    const [excercises, setExcercises] = useState<Array<schema.Excercise>>([])

    const scaleClose = useRef(new Animated.Value(1)).current;

    const params = useLocalSearchParams();
    const router = useRouter();

    const fetchTrainings = async () => {
        try {
            const result = await drizzleDb.select().from(schema.training).all();
            setTrainings(result);

            router.replace('/(logged-in)/(tabs)/activities');
        } catch (err) {
            console.error('Error when fetching workouts:', err);
        }
    };

    useEffect(() => {
        if (params.refresh === 'true') fetchTrainings();
    }, [params.refresh]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const openTrainingDetials = async (id: number) => {
        try {
            const result = await drizzleDb
            .select()
            .from(schema.excercise)
            .where(eq(schema.excercise.trainingId, id))
            .all();

            console.log('Exercises:', result);
            setExcercises(result);
        } catch (error) {
            console.error('Failed to fetch exercises:', error);
            return [];
        } finally {
            setIsDetailsModalVisible(true)
        }
    }

    const closeTrainingDetails = () => {
        setIsDetailsModalVisible(false)
    }

    const deleteTraining = async (id: number) => {
        try {
            const result = await drizzleDb.delete(schema.training).where(eq(schema.training.id, id))
            setTrainings(prev => prev.filter(training => training.id !== id));
            console.log('Deleted training:', result)
        } catch (error) {
            console.error('Failed to delete training:', error)
        }
    }

    const getLatestTrainingSessions = async () => {

    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Treningi
                    </Text>
                </View>
                <InfoBox style={{flex: 1/2}}>
                     <FlatList
                        data={trainings}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.trainingSummary}>
                                <Text style={styles.workoutPlanText}>{item.name}</Text>
                                <View style={styles.trainingSummaryButtons}>
                                    <TouchableOpacity onPress={ () => openTrainingDetials(Number(item.id))}>
                                        <Text style={styles.detailsButton}>Szczegóły</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteTraining(Number(item.id))}>
                                        <Text style={styles.deleteButton}>Usuń</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </InfoBox>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Ostatnie treningi
                    </Text>
                </View>
                <InfoBox>
                    <ScrollView>
                        <View style={styles.lastTrainingSummary}>
                            <View>
                                <Text style={styles.lastTrainingSummaryMainText}>Pull</Text>
                            </View>
                            <View>
                                <Text style={styles.lastTriainingSummarySubText}>
                                    14.06.2025
                                </Text>
                            </View>
                        </View>
                        <View style={styles.lastTrainingSummary}>
                            <View>
                                <Text style={styles.lastTrainingSummaryMainText}>Push</Text>
                            </View>
                            <View>
                                <Text style={styles.lastTriainingSummarySubText}>
                                    12.06.2025
                                </Text>
                            </View>
                        </View>
                        <View style={styles.lastTrainingSummary}>
                            <View>
                                <Text style={styles.lastTrainingSummaryMainText}>Legs</Text>
                            </View>
                            <View>
                                <Text style={styles.lastTriainingSummarySubText}>
                                    10.06.2025
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </InfoBox>

                <MessageModalChildren
                    headerText='Ćwiczenia:'
                    isVisible={isDetailsModalVisible}
                >
                    <View>
                        <View style={styles.excerciseListContainer}>
                            {excercises.map(item => (
                                <Text key={item.id.toString()}>{item.name}: {item.series}x{item.reps} {item.weight}kg</Text>
                            ))}
                        </View>
                        <View>
                            <AnimatedButton onPress={closeTrainingDetails} scale={scaleClose} buttonStyles={styles.modalFooterButton}>
                                <Text style={styles.modalFooterButtonText}>Zamknij</Text>
                            </AnimatedButton>
                        </View>
                    </View>
                </MessageModalChildren>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 16
        
    },
    headerText: {
        color: Colors.light.textPrimary,
        fontWeight: '600',
        fontSize: 24
    },

    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    workoutPlanText: {
        fontSize: 16,
        fontWeight: '500'
    },

    lastTrainingSummary: {
        marginHorizontal: 8,
        borderBottomColor: Colors.light.border,
        borderBottomWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 8,
        padding: 8
    },
    lastTrainingSummaryMainText: {
        fontSize: 16,
        fontWeight: '600'
    },
    lastTriainingSummarySubText: {
        color: Colors.light.textSecondary
    },
    
    trainingSummary: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 8
    },
    trainingSummaryButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    detailsButton: {
        textDecorationLine: 'underline',
        color: '#4287f5'
    },
    deleteButton: {
        textDecorationLine: 'underline',
        color: '#bf3737'
    },

     modalFooterButton: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderCurve: 'continuous',
        borderWidth: 2,
        borderColor: Colors.light.mainTheme,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    modalFooterButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.light.mainTheme
    },

    excerciseListContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16
    }
})