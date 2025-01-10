// app/(tabs)/index.tsx
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MovieCard from '@/components/MovieCard'


const nowPlayingMovies = [
  { id: '1', title: 'Avengers', poster: require('@/assets/images/avengers.jpeg') },
  { id: '2', title: 'Spider-Man', poster: require('@/assets/images/spiderman.jpeg') },
  { id: '3', title: 'Frozen 2', poster: require('@/assets/images/frozen2.jpeg') },
  // ...etc
];

export default function NowPlayingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>상영 중</Text>
      <FlatList
        data={nowPlayingMovies}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard movie={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});