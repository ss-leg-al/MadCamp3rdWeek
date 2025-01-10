import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import MovieCard from '@/components/MovieCard';
import CustomHeader from '@/components/CustomHeader';

const nowPlayingMovies = [
  { id: '1', title: 'Avengers', poster: require('@/assets/images/avengers.jpeg') },
  { id: '2', title: 'Spider-Man', poster: require('@/assets/images/spiderman.jpeg') },
  { id: '3', title: 'Frozen 2', poster: require('@/assets/images/frozen2.jpeg') },
];

export default function NowPlayingScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title="CINEMACHECK" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="never" // iOS 안전 영역 여백 제거
      >
        <View style={styles.content}>
          <Text style={styles.heading}>상영 중</Text>
          <FlatList
            data={nowPlayingMovies}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieCard movie={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>상영 중</Text>
          <FlatList
            data={nowPlayingMovies}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieCard movie={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>상영 중</Text>
          <FlatList
            data={nowPlayingMovies}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieCard movie={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>상영 중</Text>
          <FlatList
            data={nowPlayingMovies}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieCard movie={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingTop: 80, // 헤더 높이에 맞춰 콘텐츠 밀기
    paddingBottom: 0, // 하단 여백 제거
    paddingHorizontal: 16, // 좌우 여백 유지
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    marginTop: 10,
    marginBottom: 15, // 각 섹션 간 간격
  },
});