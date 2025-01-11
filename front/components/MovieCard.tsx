// components/MovieCard.tsx
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MovieCard({ movie }) {
  const router = useRouter();

  return (
    <View >
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(`/(detail)/${movie.id}`)} 
    >
      <Image source={movie.poster} style={styles.poster} />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
    
  card: {
    width: 120,
    marginRight: 12,
    alignItems: 'center'
  },
  poster: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 6,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
});