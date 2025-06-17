import { Stack } from 'expo-router';

export default function LoggedInLayout() {

    // Check if authenticated
    
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="newTraining" options={{presentation: 'modal', headerShown: false}}/>
            <Stack.Screen name="trainingSession" options={{presentation: 'card', headerShown: false}}/>
        </Stack>
    )
}