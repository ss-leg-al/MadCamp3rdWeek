import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 36,
    zIndex: 1000,
    shadowColor: '#000', // 그림자 색상 (검정)
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (아래로 약간)
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 4, // 그림자 퍼짐 정도
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 48, // 상단 패딩과 정렬
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC143C', // 버튼 텍스트 색상
  },
  headerText: {
    color: '#DC143C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});