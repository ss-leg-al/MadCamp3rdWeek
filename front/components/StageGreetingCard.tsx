import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';

export default function StageGreetingCard({ greeting }) {
  // 글자수 제한 함수
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // 링크 열기 함수
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Cannot open URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => openLink(greeting.url)} // 링크 열기
    >
      <View style={styles.imageContainer}>
        <Image source={greeting.image} style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{truncateText(greeting.title, 10)}</Text>
        <Text style={styles.period}>기간: {greeting.period}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 300,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // 안드로이드 그림자 효과
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#f0f0f0', // 기본 배경색 (이미지 로딩 전)
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지를 정사각형 형태로 유지
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  period: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});