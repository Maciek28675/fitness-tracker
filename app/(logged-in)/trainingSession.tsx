import InfoBox from '@/components/InfoBox';
import { StyleSheet, Text, View } from 'react-native';

export default function Modal() {
  return (
    <View style={styles.container}>
        <View>
            <Text>
              Wybierz trening
            </Text>
            <InfoBox>
              <Text style={styles.trainingText}>Push</Text>
              <Text style={styles.trainingText}>Pull</Text>
              <Text style={styles.trainingText}>Legs</Text>
            </InfoBox>
            <View>

            </View>
            <View>
              <Text>00:00:00</Text>
            </View>
            <View>
              <Text>Nowy rekord?</Text>
            </View>
            <View>
              <Text>Wykonane serie</Text>
            </View>
            <View></View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600'
  },
  trainingText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
