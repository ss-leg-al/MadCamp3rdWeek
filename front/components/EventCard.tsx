import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';

export default function EventCard({ event }) {
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
      onPress={() => openLink(event.url)} // 링크 열기
    >
      <Image source={event.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{truncateText(event.title, 10)}</Text>
        <Text style={styles.period}>{event.period}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // 안드로이드 그림자 효과
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
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