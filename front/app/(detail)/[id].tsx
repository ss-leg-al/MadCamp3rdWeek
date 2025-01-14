import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
const nowPlayingMovies = [
  { id: '1', title: '하얼빈', poster: require('@/assets/images/1.jpg'),description:'감독 : 우민호 \n장르 : 드라마 / 113 분 \n등급 : 15세이상관람가\n개봉일 : 2024.12.24\n출연진 : 현빈, 박정민, 조우진, 전여빈, 박훈, 유재명, 릴리 프랭키, 이동욱' },
  { id: '2', title: '동화지만 청불입니다', poster: require('@/assets/images/2.jpg'),description:'감독 : 이종석 \n장르 : 코미디 / 109 분 \n등급 : 청소년관람불가 \n개봉일 : 2025.01.08 \n출연진 : 박지현, 최시원, 성동일' },
  { id: '3', title: '페라리', poster: require('@/assets/images/3.jpg'),description:'감독 : 마이클 만 \n장르 : 드라마, 액션 / 130 분 \n등급 : 15세이상관람가 \n개봉일 : 2025.01.08\n출연진 : 아담 드라이버, 페넬로페 크루즈, 쉐일린 우들리' },
  { id: '4', title: '서브스턴스', poster: require('@/assets/images/4.jpg'),description:'감독 : 코랄리 파르쟈 \n장르 : 스릴러 / 140 분 \n등급 : 청소년관람불가 \n개봉일 : 2024.12.11\n출연진 : 데미 무어, 마가렛 퀄리, 데니스 퀘이드' },
  { id: '5', title: '데드데드 데몬즈 디디디디 디스트럭션: 파트1', poster: require('@/assets/images/5.jpg'),description:'장르 : 애니메이션 / 120 분 \n등급 : 15세이상관람가 \n개봉일 : 2025.01.08\n출연진 : 이쿠타 리라, 아노, 타네자키 아츠미, 시마부쿠로 미유리, 오오키 사에코, 와키 아즈미, 시라이시 료코, 이리노 미유, 우치야마 코우키, 반 타이토, 스와베 준이치, 츠다 켄지로, 카와니시 켄고, 다케나카 나오토' },
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

  // 선택한 영화 정보
  const movie = nowPlayingMovies.find((item) => item.id === id) || {
    title: '영화 정보 없음',
    poster: null,
    description: '설명 없음',
  };

  // 서버에서 받아올 상영 정보(영화관 목록 + 상영 스케줄)를 담을 state
  const [movieSchedules, setMovieSchedules] = useState([]);

  useEffect(() => {
    if (!movie.title || movie.title === '영화 정보 없음') return;

    const fetchMovieSchedules = async () => {
      try {
        //const latitude = 37.52912;
        //const longitude = 126.9654;
        const latitude=37.5561
        const longitude=126.9259;

        const response = await fetch(
          `http://192.249.29.200:3000/api/theaters?latitude=${latitude}&longitude=${longitude}&movieName=${encodeURIComponent(
            movie.title
          )}`
        );
        const data = await response.json();
        setMovieSchedules(data.movieSchedules || []);
      } catch (error) {
        console.error('영화관 스케줄 불러오기 에러:', error);
      }
    };

    fetchMovieSchedules();
  }, [movie.title]);

  // movieSchedules 펼쳐서(flatMap) -> 시간 순 정렬
  const sortedSchedules = movieSchedules
    .flatMap((theater) =>
      theater.schedules.map((schedule) => ({
        theaterName: theater.theaterName,
        ...schedule,
      }))
    )
    .sort((a, b) => a.StartTime.localeCompare(b.StartTime));

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
        {sortedSchedules.length === 0 ? (
          <Text>상영 정보를 불러오는 중입니다...</Text>
        ) : (
          <FlatList
            data={sortedSchedules}
            keyExtractor={(item, index) => `${item.theaterName}-${item.StartTime}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                {/* 상영 시작 시간 박스 */}
                <View style={styles.showtimeBox}>
                  <Text style={styles.showtimeText}>{item.StartTime}</Text>
                </View>

                {/* 영화관/상영관/거리/좌석수 (2줄) */}
                <View style={styles.theaterInfo}>
                  {/* 첫 줄: 영화관 이름 (왼쪽), 거리(오른쪽) */}
                  <View style={styles.rowTop}>
                    <Text style={styles.theaterName}>{item.theaterName}</Text>
                    <Text style={styles.distance}>{item.Distance}</Text>
                  </View>
                  {/* 둘째 줄: 상영관(왼쪽), 좌석수(오른쪽) */}
                  <View style={styles.rowBottom}>
                    <Text style={styles.screenName}>{item.ScreenName}</Text>
                    <Text style={styles.seats}>
                      <Text style={styles.bookingSeatCount}>{item.BookingSeatCount}</Text> / {item.TotalSeatCount}
                    </Text>
                  </View>
                </View>
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

  // 한 행(listItem)
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12, // 원하는 만큼 높이 조절
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  showtimeBox: {
    backgroundColor: '#DC143C',
    width: 70,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 12,
  },
  showtimeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  theaterInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  // 첫 줄 (영화관 왼쪽, 거리 오른쪽)
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  theaterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  distance: {
    fontSize: 12,
    color: '#666',
  },

  // 둘째 줄 (상영관 왼쪽, 좌석수 오른쪽)
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  screenName: {
    fontSize: 14,
    color: '#333',
  },
  seats: {
    fontSize: 12,
    color: '#666',
  },
  bookingSeatCount: {
    color: 'green',
  },
});