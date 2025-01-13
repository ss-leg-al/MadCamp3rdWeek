import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Modal } from 'react-native';
import CustomHeader from '@/components/CustomHeader';

const { width } = Dimensions.get('window'); // 화면의 가로 길이
const LIMIT_TIME = 60; // 제한시간 60초

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

export default function MemoryGameScreen() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [score, setScore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false); // 게임 시작 여부

  const initializeGame = () => {
    if (intervalId) clearInterval(intervalId);

    const selectedMovies = nowPlayingMovies
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const shuffledCards = [...selectedMovies, ...selectedMovies]
      .map((card) => ({ ...card, key: Math.random() }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setTimer(0);
    setScore(null);
    setModalVisible(false);
    setIsTimeUp(false);
    setIsGameStarted(false);
  };

  const startGame = () => {
    setIsGameStarted(true);

    const newIntervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev + 1 >= LIMIT_TIME) {
          handleTimeUp();
          clearInterval(newIntervalId);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const handleTimeUp = () => {
    clearInterval(intervalId);
    setIntervalId(null);

    const randomMovie = nowPlayingMovies[Math.floor(Math.random() * nowPlayingMovies.length)];
    setRecommendedMovie(randomMovie);
    setIsTimeUp(true);
    setModalVisible(true);
  };

  const handleCardClick = (index) => {
    if (!isGameStarted) return; // 게임 시작 전 클릭 방지

    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].id === cards[secondIndex].id) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      clearInterval(intervalId);
      setIntervalId(null);

      const calculatedScore = Math.max(1000 - timer * 10, 0);
      setScore(calculatedScore);

      const randomMovie = nowPlayingMovies[Math.floor(Math.random() * nowPlayingMovies.length)];
      setRecommendedMovie(randomMovie);

      setModalVisible(true);
    }
  }, [matchedCards]);

  useEffect(() => {
    initializeGame();
  }, []);

  const CARD_SIZE = (width - 24) / 5;

  return (
    <View style={styles.container}>
      <CustomHeader title="CINEMACHECK" />
      <Text style={styles.heading}>똑같은 포스터를 기억하세요!</Text>
      <View style={styles.stats}>
        <Text style={styles.statText}>제한시간: {timer}초 / {LIMIT_TIME}초</Text>
        {score !== null && <Text style={styles.statText}>점수: {score}</Text>}
      </View>
      <View style={styles.grid}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                { width: CARD_SIZE, height: CARD_SIZE },
                isFlipped && styles.flippedCard,
              ]}
              onPress={() => handleCardClick(index)}
            >
              {isFlipped ? (
                <Image source={card.poster} style={styles.cardImage} />
              ) : (
                <View style={styles.cardBack}>
                  <Text style={styles.cardText}>?</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={isGameStarted ? initializeGame : startGame}
      >
        <Text style={styles.resetButtonText}>
          {isGameStarted ? '다시 시작' : '게임 시작'}
        </Text>
      </TouchableOpacity>

      {modalVisible && (
        <Modal transparent animationType="slide" visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>{isTimeUp ? '시간 초과!' : '축하합니다!'}</Text>
              <Text style={styles.modalText}>
                {isTimeUp
                  ? '시간 초과로 게임이 종료되었습니다.'
                  : '모든 카드를 맞추셨습니다!'}
              </Text>
              {score !== null && !isTimeUp && <Text style={styles.modalText}>점수: {score}</Text>}
              {recommendedMovie && (
                <>
                  <Image source={recommendedMovie.poster} style={styles.poster} />
                  <Text style={styles.movieTitle}>{recommendedMovie.title}</Text>
                </>
              )}
              <Text style={styles.modalText}>오늘은 이 영화를 추천드려요!</Text>
              <TouchableOpacity style={styles.closeButton} onPress={initializeGame}>
                <Text style={styles.closeButtonText}>다시 시작</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop:90,
  },
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', padding: 16 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
  statText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  card: { margin: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#555' },
  flippedCard: { backgroundColor: 'transparent' },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardBack: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#555' },
  cardText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  resetButton: { marginTop: 20, backgroundColor: '#DC143C', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  resetButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center' },
  modalHeading: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  modalText: { fontSize: 16, marginVertical: 8, color: '#555' },
  poster: { width: 150, height: 200, borderRadius: 8, marginBottom: 12 },
  movieTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  closeButton: { marginTop: 16, backgroundColor: '#DC143C', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});