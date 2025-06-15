import { setupDatabase } from '@/setupDatabase';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { Stack } from "expo-router";
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

export const DATABASE_NAME = 'workouts';

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);

  useEffect(() => {
    setupDatabase(db);
  }, []);
  
  return(
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack>
          <Stack.Screen name="(auth)" options={{headerShown: false}}/>
          <Stack.Screen name="(logged-in)" options={{headerShown: false}}/>
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}