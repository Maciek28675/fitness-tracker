import AnimatedButton from '@/components/AnimatedButton';
import InfoBox from '@/components/InfoBox';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';

import { router } from 'expo-router';
import { CheckCircleIcon } from 'react-native-heroicons/outline';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Modal() {

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const scaleStart = useRef(new Animated.Value(1)).current;
  const scaleStop = useRef(new Animated.Value(1)).current;
  const scaleSave = useRef(new Animated.Value(1)).current;
  const scaleNext = useRef(new Animated.Value(1)).current;
  const scaleSkip = useRef(new Animated.Value(1)).current;
  const scaleSaveRecord = useRef(new Animated.Value(1)).current;

  // Workout and excercises
  const [choosenTraining, setChoosenTraining] = useState<schema.Training>()
  const [trainings, setTrainings] = useState<Array<schema.Training>>()

  const [excercises, setExcercises] = useState<Array<schema.Excercise>>()
  const [currentExcercise, setCurrentExcercise] = useState<schema.Excercise>()

  const [numSeries, setNumSeries] = useState<number>(0)
  const [totalSeries, setTotalSeries] = useState<number>(0)

  const [isFinished, setIsFinished] = useState<boolean>(false)

  // Stop watch
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
      let interval: number = 0;

      if (isRunning) {
        interval = setInterval(() => {
            setTime((time) => time + 4);
        }, 10);
      }

      return () => {
        clearInterval(interval);
      };  
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  // Fetch workouts
  const fetchTrainings = async () => {
    try {
      const result = await drizzleDb.select().from(schema.training).all();
      setTrainings(result);

    } catch (err) {
        console.error('Error when fetching workouts:', err);
    }
  };

  const fetchExcercises = async (id: number) => {
    try {
      const result = await drizzleDb.select().from(schema.excercise).where(eq(schema.excercise.trainingId, id)).all()
      setExcercises(result);
      setCurrentExcercise(result[0])
    } catch (error) {
      console.error('Error when fetching workouts:', error);
    }
  }
  useEffect(() => {
    fetchTrainings();
  }, [])


  const chooseTraining = (training: schema.Training) => {
    setChoosenTraining(training);
    fetchExcercises(training.id);
    console.log('Choosen training:', training.id.toString())
  }

  const nextExcercise = () => {
    if(!excercises || !currentExcercise) return;

    const currentIndex = excercises.findIndex(e => e.id === currentExcercise.id);
    if (currentIndex !== -1 && currentIndex < excercises.length - 1) {
      setCurrentExcercise(excercises[currentIndex + 1]);
    } else {
      console.log('No more exercises. Total series: ', totalSeries);
      setIsFinished(true)
      setTotalSeries(prev => prev + 1);
    }
  }

  const skipExcercise = () => {
    setNumSeries(0)
    nextExcercise()
  }

  const seriesDone = () => {
    if (!currentExcercise) return;

    setNumSeries(prev => prev + 1);
    setTotalSeries(prev => prev + 1);

    if (numSeries === currentExcercise?.series - 1) {
      nextExcercise();
      setNumSeries(0);
    }
  }

  const saveSession = async () => {

    if (!choosenTraining) return;

    const today = new Date().toISOString().split('T')[0];

    try {
      const newTrainingSession = await drizzleDb.insert(schema.trainingSession).values({
        date: today,
        duration: time.toString(),
        numSeriesCompleted: totalSeries,
        trainingId: choosenTraining.id
      }).returning()
      
      const trainingSessionId = newTrainingSession[0]?.id;

      if (!trainingSessionId) throw new Error("Training insert failed");

      // TODO: uzyc tego do odswiezania treningow w 'Aktywności'
      await AsyncStorage.setItem('newTrainingAdded', JSON.stringify(true));

      router.back()

    } catch (error) {
      console.error("Failed to add training session:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Wybierz trening
        </Text>
      </View>
      
      <InfoBox style={{flex: 1/2}}>
        <FlatList
          data={trainings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.trainingItem}>
              <TouchableOpacity onPress={() => chooseTraining(item)}>
                <Text style={styles.trainingText}>{item.name}</Text>
              </TouchableOpacity>
              {item.id === choosenTraining?.id &&
                <CheckCircleIcon size={24} color={'#4287f5'}/>}
            </View>
          )}
        />
      </InfoBox>
      
      <View style={styles.buttonsContainer}>
        <AnimatedButton scale={scaleStart} onPress={startAndStop} buttonStyles={styles.button}>
          <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
        </AnimatedButton>
        <AnimatedButton scale={scaleStop} onPress={reset}  buttonStyles={[styles.button, {backgroundColor: '#bf3737'}]}>
          <Text style={styles.buttonText}>Reset</Text>
        </AnimatedButton>
      </View>

      <View >
        <Text style={styles.stopWatchText}>
          {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </Text>
      </View>
      
      <View style={{marginVertical: 16}}>
          <InfoBox style={styles.currentExcercise}>
            {isFinished ? (
              <Text style={{fontSize: 16, fontWeight: '600', color: '#32a852'}}>Koniec!</Text>
            ) : (
              <>
                <Text>{currentExcercise?.name}: {currentExcercise?.series}x{currentExcercise?.reps} {currentExcercise?.weight}kg</Text>
                <Text>Serie: {numSeries}/{currentExcercise?.series}</Text>
              </>
            )}
            
          </InfoBox>
          <View style={styles.currentExcerciseButtons}>
            <AnimatedButton scale={scaleNext} onPress={seriesDone} buttonStyles={[styles.button, {backgroundColor: Colors.light.mainTheme}]}>
              <Text style={styles.buttonText}>Zrobione</Text>
            </AnimatedButton>
            <AnimatedButton scale={scaleSkip} onPress={skipExcercise} buttonStyles={[styles.button, {backgroundColor: Colors.light.mainTheme}]}>
              <Text style={styles.buttonText}>Pomiń</Text>
            </AnimatedButton>
          </View>
      </View>
      
      <View style={styles.addRecordContainer}>
        <AnimatedButton scale={scaleSaveRecord} onPress={() => {}} buttonStyles={[styles.button, {flex: 0}]}>
          <Text style={styles.buttonText}>Dodaj rekord</Text>
        </AnimatedButton>
      </View>

      <View style={styles.saveButtonContainer}>
        <AnimatedButton scale={scaleSave} onPress={saveSession} buttonStyles={[styles.button, {backgroundColor: Colors.light.mainTheme}]}>
          <Text style={styles.buttonText}>Zapisz trening</Text>
        </AnimatedButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 16
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600'
  },

  trainingText: {
    fontSize: 17,
    fontWeight: '500'
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    margin: 16
  },

  button: {
    backgroundColor: '#32a852',
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'circular',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 1/2
  },
  
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.light.backgroundSecondary
  },

  stopWatchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  stopWatchText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },

  trainingItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8
  },

  saveButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    flexDirection: 'row'
    
  },

  currentExcercise: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentExcerciseButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    gap: 16
  },

  addRecordContainer: {
    margin: 16
  }

});
