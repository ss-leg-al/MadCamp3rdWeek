import { View, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';

export default function EventCard({ event }) {
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
      onPress={() => openLink(event.url)} 
    >
      <Image source={event.image} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 180,          // 카드 높이 지정 (원하는 크기로 조정 가능)
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',   // 모서리 둥근 부분 밖으로 이미지가 튀어나가지 않도록
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,         // 안드로이드 그림자
  },
  image: {
    width: '100%',
    height: '100%',       // 카드 전체를 이미지로 채움
    resizeMode: 'cover',  
  },
});