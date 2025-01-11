import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

// 영화관 데이터
const theaterData = [
  {
    name: '메가박스 대전신세계 아트앤사이언스',
    distance: '2.2 km',
    showtimes: ['오전 11:10', '오후 1:30', '오후 3:55'],
  },
  {
    name: '롯데시네마 대전센트럴',
    distance: '3.6 km',
    showtimes: ['오전 11:15', '오후 2:20', '오후 5:45'],
  },
  {
    name: 'CGV 대전터미널',
    distance: '4.1 km',
    showtimes: ['오후 12:00', '오후 2:30', '오후 5:00'],
  },
];

// 상영시간과 영화관 리스트를 정렬
const sortedShowtimes = theaterData
  .map((theater) =>
    theater.showtimes.map((time) => ({
      theater: theater.name,
      distance: theater.distance,
      time,
    }))
  )
  .flat()
  .sort((a, b) => a.time.localeCompare(b.time)); // 상영시간 빠른 순으로 정렬

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams(); // 예: { id: '3' }

  // 영화 정보
  const movie = {
    title: '어벤져스',
    description: '1920년대의 하얼빈을 배경으로 한 \n액션/범죄 영화입니다.',
    poster: require('@/assets/images/avengers.jpeg'), // 로컬 포스터 이미지
  };

  return (
    <View style={styles.container}>
      <Header title="" />

      {/* 영화 포스터 및 정보 */}
      <View style={styles.movieInfo}>
        <Image source={movie.poster} style={styles.poster} />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDescription} >{movie.description}</Text>
        </View>
      </View>

      {/* 상영시간 및 영화관 리스트 */}
      <View style={styles.showtimesList}>
        <FlatList
          data={sortedShowtimes}
          keyExtractor={(item, index) => `${item.theater}-${item.time}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.showtimeBox}>
                <Text style={styles.showtimeText}>{item.time}</Text>
              </View>
              <View style={styles.theaterInfo}>
                <Text style={styles.theaterName}>{item.theater}</Text>
                <Text style={styles.theaterDistance}>{item.distance}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 80,
  },
  movieInfo: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  movieDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
  showtimesList: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  showtimeBox: {
    backgroundColor: '#DC143C',
    width: 80, // 고정된 너비
    height: 30, // 고정된 높이
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  showtimeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  theaterInfo: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  theaterName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  theaterDistance: {
    fontSize: 12,
    color: '#666',
  },
});