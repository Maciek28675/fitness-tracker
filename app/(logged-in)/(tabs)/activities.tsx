import InfoBox from '@/components/InfoBox';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

export default function index() {

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema });

    const [trainings, setTrainings] = useState<Array<any>>([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const result = await drizzleDb.select().from(schema.training).all();
                setTrainings(result);
            } catch (err) {
                console.error('Error when fetchin workouts:', err);
            }
        };

        fetchTrainings();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Treningi
                    </Text>
                </View>
                <InfoBox style={{gap: 16}}>
                     <FlatList
                        data={trainings}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.workoutPlanText}>{item.name}</Text>
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
                        <View style={styles.trainingSummary}>
                            <View>
                                <Text style={styles.trainingSummaryMainText}>Pull</Text>
                            </View>
                            <View>
                                <Text style={styles.triainingSummarySubText}>
                                    14.06.2025
                                </Text>
                            </View>
                        </View>
                        <View style={styles.trainingSummary}>
                            <View>
                                <Text style={styles.trainingSummaryMainText}>Push</Text>
                            </View>
                            <View>
                                <Text style={styles.triainingSummarySubText}>
                                    12.06.2025
                                </Text>
                            </View>
                        </View>
                        <View style={styles.trainingSummary}>
                            <View>
                                <Text style={styles.trainingSummaryMainText}>Legs</Text>
                            </View>
                            <View>
                                <Text style={styles.triainingSummarySubText}>
                                    10.06.2025
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </InfoBox>
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

    trainingSummary: {
        marginHorizontal: 8,
        borderBottomColor: Colors.light.border,
        borderBottomWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 8,
        padding: 8
    },
    trainingSummaryMainText: {
        fontSize: 16,
        fontWeight: '600'
    },
    triainingSummarySubText: {
        color: Colors.light.textSecondary
    }
})