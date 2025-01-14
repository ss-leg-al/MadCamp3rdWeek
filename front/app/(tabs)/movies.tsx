import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Animated, // Animated 추가
} from 'react-native';
import CustomHeader from '@/components/CustomHeader';

const { width } = Dimensions.get('window');
const LIMIT_TIME = 60; // 제한시간 60초

const nowPlayingMovies = [
  { id: '1', title: '하얼빈', poster: require('@/assets/images/1.jpg'), description: '하이' },
  { id: '2', title: '동화지만 청불입니다', poster: require('@/assets/images/2.jpg'), description: '하이' },
  { id: '3', title: '페라리', poster: require('@/assets/images/3.jpg'), description: '하이' },
  { id: '4', title: '서브스턴스', poster: require('@/assets/images/4.jpg'), description: '하이' },
  { id: '5', title: '데드데드 데몬즈 디디디디 디스트럭션: 파트1', poster: require('@/assets/images/5.jpg'), description: '하이' },
  { id: '6', title: '더 폴: 디렉터스 컷', poster: require('@/assets/images/6.jpg'), description: '하이' },
  { id: '7', title: '소방관', poster: require('@/assets/images/7.jpg'), description: '하이' },
  { id: '8', title: '위키드', poster: require('@/assets/images/8.jpg'), description: '하이' },
  { id: '9', title: '수퍼 소닉3', poster: require('@/assets/images/9.jpg'), description: '하이' },
  { id: '10', title: '뽀로로 극장판 바닷속 대모험', poster: require('@/assets/images/10.jpg'), description: '하이' },
  { id: '11', title: '극장판 짱구는 못말려: 우리들의 공룡일기', poster: require('@/assets/images/11.jpg'), description: '하이' },
  { id: '12', title: '쇼잉 업', poster: require('@/assets/images/12.jpg'), description: '하이' },
  { id: '13', title: '모아나 2', poster: require('@/assets/images/13.jpg'), description: '하이' },
  { id: '14', title: '무파사: 라이온 킹', poster: require('@/assets/images/14.jpg'), description: '하이' },
  { id: '15', title: '시빌 워: 분열의 시대', poster: require('@/assets/images/15.jpg'), description: '하이' },
];

export default function MemoryGameScreen() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);   // 뒤집힌(앞면 보이는) 카드 인덱스
  const [matchedCards, setMatchedCards] = useState([]);   // 매칭된 카드 인덱스
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [score, setScore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  // 각 카드별로 0~180도 사이 회전(Animated.Value) 값을 저장
  const [flipValues, setFlipValues] = useState([]);

  // 게임 초기화
  const initializeGame = () => {
    if (intervalId) clearInterval(intervalId);

    // 1) 카드 8장 선택
    const selectedMovies = [...nowPlayingMovies]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    // 2) 복제 -> 16장 -> 섞기
    const shuffledCards = [...selectedMovies, ...selectedMovies]
      .map((card) => ({ ...card, key: Math.random() }))  // 혹은 id + random 등
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setTimer(0);
    setScore(null);
    setModalVisible(false);
    setIsTimeUp(false);
    setIsGameStarted(false);

    // 3) 각 카드마다 Animated.Value(0)으로 초기(뒷면)
    const newFlipValues = shuffledCards.map(() => new Animated.Value(0));
    setFlipValues(newFlipValues);
  };

  // 게임 시작
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

  // 시간초과
  const handleTimeUp = () => {
    clearInterval(intervalId);
    setIntervalId(null);

    const randomMovie = nowPlayingMovies[Math.floor(Math.random() * nowPlayingMovies.length)];
    setRecommendedMovie(randomMovie);
    setIsTimeUp(true);
    setModalVisible(true);
  };

  // 카드 클릭
  const handleCardClick = (index) => {
    if (!isGameStarted) return;
    if (flippedCards.length === 2) return;            // 이미 2장 뒤집힘
    if (flippedCards.includes(index)) return;         // 이미 뒤집은 카드
    if (matchedCards.includes(index)) return;         // 이미 매칭된 카드

    // 뒤집기 (0 -> 180)
    flipTo(index, 180);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      // 두 장 확인
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].id === cards[secondIndex].id) {
        // 매칭 성공
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        // 매칭 실패 -> 1초 뒤 원위치
        setTimeout(() => {
          flipTo(firstIndex, 0);
          flipTo(secondIndex, 0);
          setFlippedCards([]);
        }, 500);
      }
    }
  };

  // flip 애니메이션 (toValue=0 뒷면 / 180 앞면)
  const flipTo = (index, toValue) => {
    if (!flipValues[index]) return;
    Animated.spring(flipValues[index], {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  // 모든 카드 매칭되면 게임 종료
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

  // 첫 렌더 시점에 초기화
  useEffect(() => {
    initializeGame();
  }, []);

  // flipValues[index] -> 앞/뒷면 애니메이션 스타일
  const getCardStyle = (index) => {
    if (!flipValues[index]) {
      return {
        frontStyle: {},
        backStyle: {},
      };
    }

    const flipVal = flipValues[index];

    // 뒷면(0deg ~ 180deg)
    const frontInterpolate = flipVal.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    // 앞면(180deg ~ 360deg)
    const backInterpolate = flipVal.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    return {
      frontStyle: {
        transform: [{ rotateY: frontInterpolate }],
      },
      backStyle: {
        transform: [{ rotateY: backInterpolate }],
      },
    };
  };

  const CARD_SIZE = (width - 24) / 5;

  return (
    <View style={styles.container}>
      <CustomHeader title="CINEMACHECK" />

      <Text style={styles.heading}>똑같은 포스터를 기억하세요!</Text>

      {/* 프로그레스 바 (남은 시간) */}
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barProgress,
            {
              width: `${((LIMIT_TIME - timer) / LIMIT_TIME) * 100}%`,
            },
          ]}
        />
      </View>

      <View style={styles.grid}>
        {cards.map((card, index) => {
          // flip 애니메이션 스타일
          const { frontStyle, backStyle } = getCardStyle(index);
          // “지금 앞면 보이는가?”
          const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);

          return (
            <TouchableOpacity
              key={card.key || index}
              style={[styles.card, { width: CARD_SIZE, height: CARD_SIZE }]}
              onPress={() => handleCardClick(index)}
            >
              {/* 뒷면 (물음표) */}
              <Animated.View
                style={[
                  styles.cardBack,
                  frontStyle,
                  isFlipped && styles.hidden,  // 앞면이면 뒷면 숨김
                ]}
              >
                <Text style={styles.cardText}>?</Text>
              </Animated.View>

              {/* 앞면 (포스터) */}
              <Animated.View
                style={[
                  styles.cardFront,
                  backStyle,
                  !isFlipped && styles.hidden, // 뒤집히지 않으면 앞면 숨김
                ]}
              >
                <Image source={card.poster} style={styles.cardImage} />
              </Animated.View>
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
              <Text style={styles.modalHeading}>
                {isTimeUp ? '시간 초과!' : '축하합니다!'}
              </Text>
              <Text style={styles.modalText}>
                {isTimeUp
                  ? '시간 초과로 게임이 종료되었습니다.'
                  : '모든 카드를 맞추셨습니다!'}
              </Text>
              {score !== null && !isTimeUp && (
                <Text style={styles.modalText}>점수: {score}</Text>
              )}
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

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 90,
  },
  barContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 30,
  },
  barProgress: {
    height: '100%',
    backgroundColor: '#DC143C',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    margin: 8,
    backgroundColor: 'transparent', // 애니메이션 뷰들이 absolute
  },
  // 뒷면
  cardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#555',
    borderRadius: 8,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  // 앞면
  cardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // 한 면만 보이도록
  hidden: {
    opacity: 0,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#DC143C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 8,
    color: '#555',
    textAlign: 'center',
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
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