import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

// 로컬에 있는 영화 목록
const nowPlayingMovies = [
  { id: '1', title: '하얼빈', poster: require('@/assets/images/1.jpg'),description:'하이' },
  { id: '2', title: '동화지만 청불입니다', poster: require('@/assets/images/2.jpg'),description:'하이' },
  { id: '3', title: '페라리', poster: require('@/assets/images/3.jpg'),description:'하이' },
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

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams(); // 예: { id: '3' }

  // 선택한 영화 정보 찾기
  const movie = nowPlayingMovies.find((item) => item.id === id) || {
    title: '영화 정보 없음',
    poster: null,
    description: '설명 없음',
  };

  // 서버에서 받아올 상영 정보(영화관 목록 + 상영 스케줄)를 담을 state
  const [movieSchedules, setMovieSchedules] = useState([]);

  useEffect(() => {
    // 영화제목이 정상적으로 있을 때만 요청
    if (!movie.title || movie.title === '영화 정보 없음') return;

    const fetchMovieSchedules = async () => {
      try {
        // 실제 좌표는 기기 위치나, 다른 로직으로 가져올 수 있습니다.
        const latitude = 37.5561;
        const longitude = 126.9259;

        const response = await fetch(
          `http://192.249.29.183:3000/api/theaters?latitude=${latitude}&longitude=${longitude}&movieName=${encodeURIComponent(
            movie.title
          )}`
        );
        const data = await response.json();

        // movieSchedules: [{ theaterName: string, schedules: [...] }, ... ]
        setMovieSchedules(data.movieSchedules || []);
      } catch (error) {
        console.error('영화관 스케줄 불러오기 에러:', error);
      }
    };

    fetchMovieSchedules();
  }, [movie.title]);

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

      {/* 서버에서 받아온 상영 시간 / 극장 리스트 */}
      <View style={styles.showtimesList}>
        {movieSchedules.length === 0 ? (
          <Text>상영 정보를 불러오는 중입니다...</Text>
        ) : (
          <FlatList
            data={movieSchedules}
            keyExtractor={(item) => item.theaterName}
            renderItem={({ item }) => (
              <View style={styles.theaterBlock}>
                {/* 극장 이름 */}
                <Text style={styles.theaterName}>{item.theaterName}</Text>
                {/* 이 극장에서 상영하는 시간표 */}
                {item.schedules.map((schedule, index) => (
                  <View style={styles.listItem} key={`${schedule.StartTime}-${index}`}>
                    <View style={styles.showtimeBox}>
                      <Text style={styles.showtimeText}>{schedule.StartTime}</Text>
                    </View>
                    <View style={styles.theaterInfo}>
                      <Text style={styles.screenName}>{schedule.ScreenName}</Text>
                      <Text style={styles.distance}>{schedule.Distance}</Text>
                      <Text style={styles.seats}>
                        예매좌석: {schedule.BookingSeatCount} / 총 {schedule.TotalSeatCount}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

// 스타일 정의
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
  movieDescription: {
    marginTop: 20,
    lineHeight: 24,
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
  showtimesList: {
    flex: 1,
    padding: 16,
  },
  theaterBlock: {
    marginBottom: 20,
  },
  theaterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 8,
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
    justifyContent: 'center',
  },
  screenName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  distance: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  seats: {
    fontSize: 12,
    color: '#666',
  },
});