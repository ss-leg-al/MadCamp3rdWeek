import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

// nowPlayingMovies 데이터
const nowPlayingMovies = [
  { id: '1', title: '하얼빈', poster: require('@/assets/images/1.jpg'),description:'2024.12.24 개봉\n113분\n15세이상관람가' },
  { id: '2', title: '동화지만 청불입니다', poster: require('@/assets/images/2.jpg'),description:'2025.01.08 개봉\n109분\n청소년관람불가' },
  { id: '3', title: '페라리', poster: require('@/assets/images/3.jpg'),description:'2024.12.04 개봉\n106분\n12세이상관람가' },
  { id: '4', title: '서브스턴스', poster: require('@/assets/images/4.jpg'),description:'하이' },
  { id: '5', title: '데드데드 데몬즈 디디디디 디스트럭션: 파트1', poster: require('@/assets/images/5.jpg'),description:'하이' },
  { id: '6', title: '더 폴: 디렉터스 컷', poster: require('@/assets/images/6.jpg'),description:'하이' },
  { id: '7', title: '소방관', poster: require('@/assets/images/7.jpg'),description:'하이' },
  { id: '8', title: '위키드', poster: require('@/assets/images/8.jpg'),description:'하이' },
  { id: '9', title: '수퍼 소닉3', poster: require('@/assets/images/9.jpg'),description:'하이' },
  { id: '10', title: '뽀로로 극장판 바닷속 대모험', poster: require('@/assets/images/10.jpg'),description:'하이' },
  { id: '11', title: '극장판 짱구는 못말려: 우리들의 공룡일기', poster: require('@/assets/images/11.jpg'),description:'하이' },
  { id: '12', title: '쇼잉 업', poster: require('@/assets/images/12.jpg'),description:'하이' },
  { id: '13', title: '모아나 2', poster: require('@/assets/images/13.jpg'),description:'하이' },
  { id: '14', title: '무파사: 라이온 킹', poster: require('@/assets/images/14.jpg'),description:'하이' },
  { id: '15', title: '시빌 워: 분열의 시대', poster: require('@/assets/images/15.jpg'),description:'하이' },

];

// 상영시간 및 영화관 리스트
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

  // 선택한 영화 정보
  const movie = nowPlayingMovies.find((movie) => movie.id === id) || {
    title: '영화 정보 없음',
    poster: null,
    description: '설명 없음'
  };

  return (
    <View style={styles.container}>
      <Header title="" />

      {/* 영화 포스터 및 정보 */}
      <View style={styles.movieInfo}>
        {movie.poster && <Image source={movie.poster} style={styles.poster} />}
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDescription}>{movie.description}</Text>
          
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
  },
  movieDescription:{
    marginTop: 20,
    lineHeight: 24, // 줄 간격 추가 (원하는 크기로 조정 가능)
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
    width: 80,
    height: 30,
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