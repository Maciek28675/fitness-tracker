import InfoBox from '@/components/InfoBox';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
export default function index() {
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Plany
                    </Text>
                </View>
                <InfoBox style={{gap: 16}}>
                    <Text style={styles.workoutPlanText}>Push Pull Legs 1</Text>
                    <Text style={styles.workoutPlanText}>FBW</Text>
                    <Text style={styles.workoutPlanText}>Split 5 dni</Text>
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
                                    Push Pull Legs 1 | 14.06.2025
                                </Text>
                            </View>
                        </View>
                        <View style={styles.trainingSummary}>
                            <View>
                                <Text style={styles.trainingSummaryMainText}>Push</Text>
                            </View>
                            <View>
                                <Text style={styles.triainingSummarySubText}>
                                    Push Pull Legs 1 | 12.06.2025
                                </Text>
                            </View>
                        </View>
                        <View style={styles.trainingSummary}>
                            <View>
                                <Text style={styles.trainingSummaryMainText}>Legs</Text>
                            </View>
                            <View>
                                <Text style={styles.triainingSummarySubText}>
                                    Push Pull Legs 1 | 10.06.2025
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