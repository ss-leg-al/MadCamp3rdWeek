import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity,
  Modal
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

// 월/일 형식 (예: "1/14")
function getMonthDay(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${month}/${day}`;
}

// YYYYMMDD 형식 (API 파라미터용)
function getFormattedDate(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// 날짜 라벨(예: "1/14(오늘)")
// offset === 0 → "1/14(오늘)"
// offset === 1 → "1/15(내일)"
// offset === 2 → "1/16(모레)"
function getDateLabel(offset = 0) {
  const base = getMonthDay(offset);
  if (offset === 0) return `${base}(오늘)`;
  if (offset === 1) return `${base}(내일)`;
  if (offset === 2) return `${base}(모레)`;
  return base;
}

const nowPlayingMovies = [
  {
    id: '1',
    title: '하얼빈',
    poster: require('@/assets/images/1.jpg'),
    description:
      '감독 : 우민호 \n장르 : 드라마 / 113 분 \n등급 : 15세이상관람가\n개봉일 : 2024.12.24\n출연진 : 현빈, 박정민, 조우진, 전여빈, 박훈, 유재명, 릴리 프랭키, 이동욱',
  },
  {
    id: '2',
    title: '동화지만 청불입니다',
    poster: require('@/assets/images/2.jpg'),
    description:
      '감독 : 이종석 \n장르 : 코미디 / 109 분 \n등급 : 청소년관람불가 \n개봉일 : 2025.01.08 \n출연진 : 박지현, 최시원, 성동일',
  },
  {
    id: '3',
    title: '페라리',
    poster: require('@/assets/images/3.jpg'),
    description:
      '감독 : 마이클 만 \n장르 : 드라마, 액션 / 130 분 \n등급 : 15세이상관람가 \n개봉일 : 2025.01.08\n출연진 : 아담 드라이버, 페넬로페 크루즈, 쉐일린 우들리',
  },
  // ... 필요 시 더 추가 ...
];

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams(); 

  // 영화 정보
  const movie = nowPlayingMovies.find((item) => item.id === id) || {
    title: '영화 정보 없음',
    poster: null,
    description: '설명 없음',
  };

  // offset 0=오늘, 1=내일, 2=모레
  const [selectedOffset, setSelectedOffset] = useState(0);
  // 실제 API 호출 시 쓸 YYYYMMDD
  const selectedDate = getFormattedDate(selectedOffset);

  // 서버 스케줄
  const [movieSchedules, setMovieSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 헤더 눌렀을 때 뜨는 모달 (날짜 선택)
  const [showDateModal, setShowDateModal] = useState(false);

  // 날짜 라벨 (ex: "1/14(오늘)")
  const headerDateLabel = getDateLabel(selectedOffset);

  // API 호출
  useEffect(() => {
    if (movie.title === '영화 정보 없음') return;

    const fetchMovieSchedules = async () => {
      try {
        setIsLoading(true);
        const latitude = 37.5561;
        const longitude = 126.9259;
        // date=selectedDate
        const response = await fetch(
          `http://192.249.29.200:3000/api/theaters?latitude=${latitude}&longitude=${longitude}&movieName=${encodeURIComponent(
            movie.title
          )}&date=${selectedDate}`
        );
        const data = await response.json();
        setMovieSchedules(data.movieSchedules || []);
      } catch (error) {
        console.error('영화관 스케줄 불러오기 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieSchedules();
  }, [movie.title, selectedDate]);

  // 날짜 변경 함수
  const handleOffsetChange = (offset) => {
    setSelectedOffset(offset);
    setShowDateModal(false); // 모달 닫기
  };

  // 스케줄 정렬
  const sortedSchedules = movieSchedules
    .flatMap((theater) => 
      theater.schedules.map((schedule) => ({
        theaterName: theater.theaterName,
        ...schedule,
      }))
    )
    .sort((a, b) => a.StartTime.localeCompare(b.StartTime));

  // 헤더를 눌렀을 때 → 모달 열기
  const handleHeaderPress = () => {
    setShowDateModal(true);
  };

  return (
    <View style={styles.container}>
      {/* 
        Header 컴포넌트에
        우리가 만든 headerDateLabel (ex: "1/14(오늘)")을 title로 표시.
        + TouchableOpacity로 감싸거나,
        Header 자체에 onPress 설정 가능(구현 방식에 따라 다름).
      */}
      <TouchableOpacity onPress={handleHeaderPress} activeOpacity={0.7}>
              <Header
                  title={headerDateLabel}
                  onTitlePress={() => setShowDateModal(true)}
                />
      </TouchableOpacity>

      {/* 영화 정보 */}
      <View style={styles.movieInfo}>
        {movie.poster && <Image source={movie.poster} style={styles.poster} />}
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDescription}>{movie.description}</Text>
        </View>
      </View>

      {/* 상영 리스트 */}
      <View style={styles.showtimesList}>
        {isLoading ? (
          <Text>상영 정보를 불러오는 중...</Text>
        ) : sortedSchedules.length === 0 ? (
          <Text>상영 정보가 없습니다.</Text>
        ) : (
          <FlatList
            data={sortedSchedules}
            keyExtractor={(item, index) => 
              `${item.theaterName}-${item.StartTime}-${index}`
            }
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <View style={styles.showtimeBox}>
                  <Text style={styles.showtimeText}>{item.StartTime}</Text>
                </View>
                <View style={styles.theaterInfo}>
                  <View style={styles.rowTop}>
                    <Text style={styles.theaterName}>{item.theaterName}</Text>
                    <Text style={styles.distance}>{item.Distance}</Text>
                  </View>
                  <View style={styles.rowBottom}>
                    <Text style={styles.screenName}>{item.ScreenName}</Text>
                    <Text style={styles.seats}>
                      <Text style={styles.bookingSeatCount}>
                        {item.BookingSeatCount}
                      </Text>
                      {' / '}
                      {item.TotalSeatCount}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* 날짜 선택 모달 */}
      <Modal
        transparent
        visible={showDateModal}
        animationType="fade"
        onRequestClose={() => setShowDateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>날짜 선택</Text>

            {/* 오늘/내일/모레 버튼 */}
            <TouchableOpacity
              style={styles.modalDateButton}
              onPress={() => handleOffsetChange(0)}
            >
              <Text style={styles.modalDateText}>
                {getMonthDay(0)}(오늘)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalDateButton}
              onPress={() => handleOffsetChange(1)}
            >
              <Text style={styles.modalDateText}>
                {getMonthDay(1)}(내일)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalDateButton}
              onPress={() => handleOffsetChange(2)}
            >
              <Text style={styles.modalDateText}>
                {getMonthDay(2)}(모레)
              </Text>
            </TouchableOpacity>

            {/* 취소 버튼 */}
            <TouchableOpacity
              style={[styles.modalDateButton, { marginTop: 16 }]}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={[styles.modalDateText, { color: 'red' }]}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  movieInfo: {
    marginTop: 80,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    // 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  movieDescription: {
    lineHeight: 20,
    fontSize: 14,
    color: '#666',
  },
  showtimesList: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  showtimeBox: {
    backgroundColor: '#DC143C',
    width: 60,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 12,
  },
  showtimeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  theaterInfo: {
    flex: 1,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
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
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  screenName: {
    fontSize: 12,
    color: '#333',
  },
  seats: {
    fontSize: 12,
    color: '#666',
  },
  bookingSeatCount: {
    color: 'green',
  },

  // 모달 관련
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalDateButton: {
    backgroundColor: '#EEE',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 4,
    width: '100%',
    alignItems: 'center',
  },
  modalDateText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});