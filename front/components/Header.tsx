import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  onTitlePress?: () => void; // 타이틀(날짜) 눌렀을 때 실행될 함수
}

export default function Header({ title, onTitlePress }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* 제목(날짜) - 눌리면 onTitlePress 실행 */}
      <TouchableOpacity 
        style={styles.titleContainer} 
        activeOpacity={0.6} 
        onPress={onTitlePress}
      >
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 48,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC143C',
  },
  // 제목(날짜)을 감쌀 컨테이너
  titleContainer: {
    // 가운데 정렬
    justifyContent: 'center',
    alignItems: 'center',
    // 더 넓게 클릭 가능하도록
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  headerText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
  },
});