import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import CustomHeader from '@/components/CustomHeader';

// 영화 데이터 (샘플)

const movies = [
  // 한국 영화
  { id: 1, title: '기생충 (Parasite)', genres: ['Drama', 'Thriller'], rating: 8.6, poster_url: 'https://link_to_poster1.jpg' },
  { id: 2, title: '부산행 (Train to Busan)', genres: ['Action', 'Horror'], rating: 7.6, poster_url: 'https://link_to_poster2.jpg' },
  { id: 3, title: '올드보이 (Oldboy)', genres: ['Action', 'Thriller'], rating: 8.4, poster_url: 'https://link_to_poster3.jpg' },
  { id: 4, title: '택시운전사 (A Taxi Driver)', genres: ['Drama', 'War'], rating: 8.1, poster_url: 'https://link_to_poster4.jpg' },
  
  // 해외 영화
  { id: 5, title: '인셉션 (Inception)', genres: ['Sci-Fi', 'Thriller'], rating: 8.8, poster_url: 'https://link_to_poster5.jpg' },
  { id: 6, title: '인터스텔라 (Interstellar)', genres: ['Sci-Fi', 'Drama'], rating: 8.6, poster_url: 'https://link_to_poster6.jpg' },
  { id: 7, title: '다크 나이트 (The Dark Knight)', genres: ['Action', 'Thriller'], rating: 9.0, poster_url: 'https://link_to_poster7.jpg' },
  { id: 8, title: '매트릭스 (The Matrix)', genres: ['Sci-Fi', 'Action'], rating: 8.7, poster_url: 'https://link_to_poster8.jpg' },
  { id: 9, title: '어벤져스: 엔드게임 (Avengers: Endgame)', genres: ['Action', 'Sci-Fi'], rating: 8.4, poster_url: 'https://link_to_poster9.jpg' },
  { id: 10, title: '쇼생크 탈출 (The Shawshank Redemption)', genres: ['Drama', 'Crime'], rating: 9.3, poster_url: 'https://link_to_poster10.jpg' },
];

// 영화 추천 함수
const recommendMovies = (selectedMovies: number[]) => {
  const selectedGenres = new Set<string>();

  selectedMovies.forEach((id) => {
    const movie = movies.find((movie) => movie.id === id);
    movie?.genres.forEach((genre) => selectedGenres.add(genre));
  });

  return movies.filter(
    (movie) =>
      !selectedMovies.includes(movie.id) &&
      movie.genres.some((genre) => selectedGenres.has(genre))
  );
};

export default function MoviesScreen() {
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMovieSelect = (movieId: number) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  const handleRecommendation = () => {
    const recommendations = recommendMovies(selectedMovies);
    setRecommendedMovies(recommendations);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="CINEMACHECK" />
      <View style={styles.content}>
        <Text style={styles.heading}>관심 영화를 선택하세요</Text>

        {/* 영화 목록 */}
        <FlatList
          data={movies}
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
              <Text style={styles.recommendButtonText}> 영화 추천받기</Text>
            </TouchableOpacity>
          )}
        />

        {/* 추천 영화 모달 */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>추천 영화</Text>
              <FlatList
                data={recommendedMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.recommendationText}>{item.title}</Text>
                )}
              />
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
    marginBottom: 16,
  },
  recommendationText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
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