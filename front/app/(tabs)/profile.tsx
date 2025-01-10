// app/(tabs)/profile.tsx
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
            <CustomHeader title="CINEMACHECK" />
               <View style={styles.content}>
                   <Text style={styles.heading}>전체 영화 목록</Text>
                   {/* 전체 영화 목록을 표시하거나, 검색 바를 넣는 등 자유롭게 구성 */}
                </View>
       </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  content: {
    flex: 1,
    paddingTop: 80, // 헤더 높이만큼 여백 추가
    paddingHorizontal: 4,
  },
});