import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import { ClipboardDocumentCheckIcon, HomeIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import {
    ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
    HomeIcon as HomeIconSolid,
    PlusCircleIcon as PlusCircleIconSolid
} from 'react-native-heroicons/solid';


export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                //headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.light.mainTheme,
                },
                tabBarActiveTintColor: Colors.light.backgroundPrimary,
                tabBarInactiveTintColor: Colors.light.backgroundPrimary,
                animation: 'shift',
            }}
            
        >
            <Tabs.Screen name="index" options={{
                title: 'Główna',
                headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <HomeIconSolid color={color} size={24}/>
                    ) : (
                        <HomeIcon color={color} size={24}/>
                    ),
            }}/>
            <Tabs.Screen name="activities" options={{
                title: 'Aktywności',
                headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <ClipboardDocumentCheckIconSolid color={color} size={24}/>
                    ) : (
                        <ClipboardDocumentCheckIcon color={color} size={24}/>
                    ),
            }}/>
            <Tabs.Screen name="new" options={{
                title: 'Dodaj',
                headerShown: false,
                tabBarIcon: ({color, focused}) => 
                    focused ? (
                        <PlusCircleIconSolid color={color} size={24}/>
                    ) : (
                        <PlusCircleIcon color={color} size={24}/>
                    ),

            }}/>
        </Tabs>
    )
}