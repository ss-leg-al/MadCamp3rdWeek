// app/(tabs)/movies.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function MoviesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>전체 영화 목록</Text>
      {/* 전체 영화 목록을 표시하거나, 검색 바를 넣는 등 자유롭게 구성 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
});