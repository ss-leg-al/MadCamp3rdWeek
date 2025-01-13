import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import CustomHeader from '@/components/CustomHeader';

// 관심 영화 데이터
const favoriteMovies = [
  { id: 1, title: '기생충', genres: ['Drama', 'Thriller'], rating: 8.6 },
  { id: 2, title: '부산행', genres: ['Action', 'Horror'], rating: 7.6 },
  { id: 3, title: '올드보이', genres: ['Action', 'Thriller'], rating: 8.4 },
  { id: 4, title: '택시운전사', genres: ['Drama', 'War'], rating: 8.1 },
  { id: 5, title: '인셉션', genres: ['Sci-Fi', 'Thriller'], rating: 8.8 },
  { id: 6, title: '인터스텔라', genres: ['Sci-Fi', 'Drama'], rating: 8.6 },
  { id: 7, title: '다크 나이트', genres: ['Action', 'Thriller'], rating: 9.0 },
  { id: 8, title: '매트릭스', genres: ['Sci-Fi', 'Action'], rating: 8.7 },
  { id: 9, title: '어벤져스: 엔드게임', genres: ['Action', 'Sci-Fi'], rating: 8.4 },
  { id: 10, title: '쇼생크 탈출', genres: ['Drama', 'Crime'], rating: 9.3 },
];

// 추천 영화 데이터
const nowPlayingMovies = [
  { id: '1', title: '하얼빈', poster: require('@/assets/images/1.jpg'), description: '2024.12.24 개봉\n113분\n15세이상관람가' },
  { id: '2', title: '동화지만 청불입니다', poster: require('@/assets/images/2.jpg'), description: '2025.01.08 개봉\n109분\n청소년관람불가' },
  { id: '3', title: '페라리', poster: require('@/assets/images/3.jpg'), description: '2024.12.04 개봉\n106분\n12세이상관람가' },
  { id: '4', title: '서브스턴스', poster: require('@/assets/images/4.jpg'), description: '하이' },
  { id: '5', title: '데드데드 데몬즈 디디디디 디스트럭션: 파트1', poster: require('@/assets/images/5.jpg'), description: '하이' },
  { id: '6', title: '더 폴: 디렉터스 컷', poster: require('@/assets/images/6.jpg'), description: '하이' },
  { id: '7', title: '소방관', poster: require('@/assets/images/7.jpg'), description: '하이' },
  { id: '8', title: '위키드', poster: require('@/assets/images/8.jpg'), description: '하이' },
  { id: '9', title: '수퍼 소닉3', poster: require('@/assets/images/9.jpg'), description: '하이' },
  { id: '10', title: '뽀로로 극장판 바닷속 대모험', poster: require('@/assets/images/10.jpg'), description: '하이' },
];

export default function MoviesScreen() {
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [randomMovie, setRandomMovie] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMovieSelect = (movieId: number) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  const handleRecommendation = () => {
    const randomIndex = Math.floor(Math.random() * nowPlayingMovies.length);
    setRandomMovie(nowPlayingMovies[randomIndex]);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setRandomMovie(null);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="CINEMACHECK" />
      <View style={styles.content}>
      <Text style={[styles.heading, { lineHeight: 25 }]}>관심 영화를 선택하고{'\n'}현재 상영 중인 영화를 추천 받으세요!</Text>

        {/* 관심 영화 목록 */}
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.movieItem,
                selectedMovies.includes(item.id) && styles.selectedMovieItem,
              ]}
              onPress={() => handleMovieSelect(item.id)}
            >
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={(
            <TouchableOpacity style={styles.recommendButton} onPress={handleRecommendation}>
              <Text style={styles.recommendButtonText}>영화 추천받기</Text>
            </TouchableOpacity>
          )}
        />

        {/* 추천 영화 모달 */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {randomMovie && (
                <>
                  <Image source={randomMovie.poster} style={styles.poster} />
                  <Text style={styles.modalHeading}>{randomMovie.title}</Text>
                  <Text style={styles.modalDescription}>{randomMovie.description}</Text>
                </>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  movieItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedMovieItem: {
    backgroundColor: '#c5c5c5',
    borderColor: '#c5c5c5',
  },
  movieTitle: {
    fontSize: 16,
    color: '#333',
  },
  recommendButton: {
    backgroundColor: '#DC143C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  recommendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#DC143C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});