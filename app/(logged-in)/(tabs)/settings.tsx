import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from "react-native";

export default function index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Test</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text: {
        color: Colors.light.textPrimary,
        fontWeight: '600',
        fontSize: 24
    }
})