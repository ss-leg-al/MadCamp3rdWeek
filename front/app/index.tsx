import { View, Text, Button, Image, StyleSheet,TouchableOpacity  } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 로고 추가 */}
      <Image 
        source={require('@/assets/images/logo.png')} // 로컬 이미지
        // source={{ uri: 'https://your-image-url.com/logo.png' }} // URL 이미지
        style={styles.logo}
      />
       <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    
  },
  logo: {
    width: 300,        // 로고의 너비
    height: 300,       // 로고의 높이
    marginBottom: 16,  // 아래 텍스트와 간격
    resizeMode: 'contain', // 원본 비율 유지
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#DC143C', // 버튼 배경색 (iOS 기본 파랑)
    paddingVertical: 12,        // 버튼 세로 패딩
    paddingHorizontal: 32,      // 버튼 가로 패딩
    borderRadius: 25,           // 버튼의 둥근 모서리
    alignItems: 'center',       // 텍스트 중앙 정렬
    justifyContent: 'center',   // 텍스트 세로 중앙 정렬
    shadowColor: '#000',        // 그림자 색상
    shadowOpacity: 0.2,         // 그림자 투명도
    shadowRadius: 4,            // 그림자 크기
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    elevation: 3,               // 안드로이드 그림자
  },
  buttonText: {
    color: 'white',              // 텍스트 색상
    fontSize: 16,               // 텍스트 크기
    fontWeight: 'bold',         // 텍스트 굵기
  },
});