import AnimatedButton from '@/components/AnimatedButton';
import InputBox from '@/components/InputBox';
import MessageModalChildren from '@/components/MessageModalChildren';
import { Colors } from '@/constants/Colors';
import * as schema from '@/db/schema';
import { excercise, Excercise } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function index() {

    const scaleAddTraining = useRef(new Animated.Value(1)).current;
    const scaleAddExcercise = useRef(new Animated.Value(1)).current;
    const scaleAdd = useRef(new Animated.Value(1)).current;
    const scaleClose = useRef(new Animated.Value(1)).current;

    const [excercises, setExcercises] = useState<Array<Excercise>>()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const [trainingName, setTrainingName] = useState<string>('')
    const [numExcercises, setNumExcercises] = useState<string>('0')

    const [name, setName] = useState<string>('')
    const [reps, setReps] = useState<string>('0')
    const [series, setSeries] = useState<string>('0')
    const [weight, setWeight] = useState<string>('0')

    const [currentNumExcercises, setCurrentNumExcercises] = useState<number>(0)

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema});

    const onAddExcercisePress = () => {
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const add = async () => {
        setIsModalVisible(false)
        
        const newExcercise = {
            name,
            reps: Number(reps),
            series: Number(series),
            weight: Number(weight),
            trainingId: null
        };

        try {
            // Insert into DB
            const result = await drizzleDb.insert(excercise).values(newExcercise).returning();

            // Update local state
            if (result && result[0]) {
                setExcercises((prev) => [...(prev ?? []), result[0]]);
            }

            // Clear inputs
            setName('');
            setReps('0');
            setSeries('0');
            setWeight('0');

            setIsModalVisible(false);
            setCurrentNumExcercises((prev) => prev + 1);

        } catch (error) {
            console.error('Error adding exercise:', error);
        }

    }

    const onAddTrainingPress = async () => {
        try {
            // 1. Insert training into DB
            const insertedTraining = await drizzleDb.insert(schema.training).values({
                name: trainingName,
                numExcercises: Number(numExcercises),
                planId: null
            }).returning();

            const trainingId = insertedTraining[0]?.id;

            if (!trainingId) throw new Error("Training insert failed");

            for (const ex of excercises ?? []) {
                await drizzleDb.update(schema.excercise)
                    .set({ trainingId })
                    .where(eq(schema.excercise.id, ex.id))
            }

            setTrainingName('');
            setNumExcercises('0');
            setExcercises([]);
            setCurrentNumExcercises(0);

            console.log("Training and exercises saved successfully.");

            router.push('/(logged-in)/(tabs)/activities?refresh=true')
        } catch (error) {
            console.error("Failed to add training:", error);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Nowy trening</Text>
                </View>
                <ScrollView>
                    <View style={styles.formContainer}>
                        <InputBox label='Nazwa treningu' required inputMode='text' value={trainingName} setValue={setTrainingName}/>
                        <InputBox label='Ilość ćwiczeń' required inputMode='numeric' value={numExcercises} setValue={setNumExcercises}/>
                    </View>
                    <View>
                        <AnimatedButton scale={scaleAddExcercise} onPress={onAddExcercisePress} buttonStyles={styles.addTrainingButton}>
                            <Text style={styles.addTrainingButtonText}>Dodaj ćwiczenie</Text>
                        </AnimatedButton>
                    </View>
                    <View style={styles.trainingCounter}>
                        <Text>Ćwiczenia: {currentNumExcercises}/{numExcercises}</Text>
                    </View>

                    {excercises?.map((ex, i) => (
                        <Text key={i}>{ex.name} - {ex.reps} reps x {ex.series} series</Text>
                    ))}

                    {Number(numExcercises) === currentNumExcercises && numExcercises !== '0' &&
                        <View style={{marginTop: 16}}>
                            <AnimatedButton scale={scaleAddTraining} onPress={onAddTrainingPress} buttonStyles={styles.addTrainingButton}>
                                <Text style={styles.addTrainingButtonText}>Gotowe</Text>
                            </AnimatedButton>
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>

            <MessageModalChildren headerText='Nowe ćwiczenie' isVisible={isModalVisible}>
                <View style ={styles.modalContent}>
                    <InputBox inputControlStyle={{minWidth: 200}} label='nazwa' required inputMode='text' value={name} setValue={setName}/>
                    <InputBox inputControlStyle={{minWidth: 200}} label='Serie' required inputMode='numeric' value={series} setValue={setSeries}/>
                    <InputBox inputControlStyle={{minWidth: 200}} label='Powtórzenia' required inputMode='numeric' value={reps} setValue={setReps}/>
                    <InputBox inputControlStyle={{minWidth: 200}} label='Ciężar' inputMode='decimal' value={weight} setValue={setWeight}/>
                </View>
                <View style={styles.modalFooterContainer}>
                    <AnimatedButton onPress={add} scale={scaleAdd} buttonStyles={styles.addButton}>
                        <Text style={styles.addText}>Dodaj</Text>
                    </AnimatedButton>
                    <AnimatedButton onPress={closeModal} scale={scaleClose} buttonStyles={styles.modalFooterButton}>
                            <Text style={styles.modalFooterButtonText}>Anuluj</Text>
                    </AnimatedButton>
                </View>   
            </MessageModalChildren>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 24,
        flex: 1
    },

    headerContainer: {

    },
    headerText: {
        color: Colors.light.textPrimary,
        fontWeight: '600',
        fontSize: 24,
        marginTop: 16
    },

    formContainer: {
        marginTop: 24,
        gap: 8
    },

    addTrainingButton: {
        backgroundColor: Colors.light.mainTheme,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'circular',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        //width: '70%'
    },

    addTrainingButtonText: {
        fontWeight: '600',
        fontSize: 16,
        color: Colors.light.backgroundSecondary
    },

    trainingCounter: {
        marginTop: 16,
    },

    modalContent: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    modalFooterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        flexDirection: 'row',
        gap: 8
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
    addText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF'
    },
    addButton: {
        backgroundColor: Colors.light.mainTheme,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'circular',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderWidth: 2,
        borderColor: Colors.light.mainTheme
    }
})
