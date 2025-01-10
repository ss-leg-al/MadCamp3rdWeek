// app/(detail)/[id].tsx
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams(); // 예: { id: '3' }

  // 실제로는 id를 사용해 서버에서 상세 데이터 호출 가능
  return (
    <View style={styles.container}>
      <Text style={styles.title}>영화 상세 정보</Text>
      <Text>여기서 영화 ID는 {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
});