import { Colors } from '@/constants/Colors';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
export default function index() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Nowy Plan</Text>
            </View>
        </SafeAreaView>
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
    }
})