import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

// 날짜 선택
import DateTimePicker from '@react-native-community/datetimepicker'; 

import CustomHeader from '@/components/CustomHeader';

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
  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
      return title; // 글자 수가 적으면 그대로 반환
    }
    return title.substring(0, maxLength) + '...'; // 6글자까지만 표시하고 생략
  };
// 브랜드 로고
const brandLogos = {
  CGV: require('@/assets/images/cgv.png'),
  메가박스: require('@/assets/images/megabox.png'),
  롯데시네마: require('@/assets/images/lottecinema.png'),
};

// 브랜드별 테두리 색상
const brandColors = {
  CGV: '#DC143C',      // 빨간
  메가박스: '#7B68EE', // 보라
  롯데시네마: '#ff006a',  // 흰색
};

export default function PhotoCardScreen() {
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [userName, setUserName] = useState(''); 
  const [date, setDate] = useState(new Date()); // 관람 일자
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const viewShotRef = useRef(null);

  // 영화 선택
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  // 브랜드 선택
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  // 날짜 변경
  const onChangeDate = (event, selected) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selected) {
      setDate(selected);
    }
  };

  // 포토카드 만들기
  const openPhotoCard = () => {
    if (!selectedMovie || !selectedBrand) {
      Alert.alert('안내', '영화와 브랜드를 먼저 선택해주세요!');
      return;
    }
    if (!userName.trim()) {
      Alert.alert('안내', '이름을 입력해주세요!');
      return;
    }
    setModalVisible(true);
  };

  // ViewShot 캡처
  const handleSaveCard = async () => {
    if (!viewShotRef.current) return;
    try {
      const uri = await viewShotRef.current.capture({ format: 'png', quality: 0.9 });
      console.log('Captured image uri:', uri);

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('이미지 저장', '이미지를 저장하거나 공유할 수 없습니다.');
      }
    } catch (err) {
      console.error('capture error:', err);
      Alert.alert('오류', '이미지를 캡처하는 중 문제가 발생했습니다.');
    }
  };

  // 날짜 문자열 포맷 (YYYY-MM-DD)
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 브랜드별 테두리색
  const cardBorderColor = selectedBrand ? brandColors[selectedBrand] : '#ccc';

  return (
    <View style={styles.container}>
      <CustomHeader title="CINEMACHECK" />

      <ScrollView contentContainerStyle={{ paddingTop: 90, paddingHorizontal: 16 }}>
        {/* 1) 사용자 이름 */}
        <Text style={styles.heading}>1) 이름 입력</Text>
        <TextInput
          style={styles.nameInput}
          value={userName}
          onChangeText={setUserName}
          placeholder="이름을 입력하세요..."
          placeholderTextColor="#aaa"
        />

        {/* 2) 날짜 선택 */}
        <Text style={styles.heading}>2) 관람 일자</Text>
       
        {true && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* 3) 영화 선택 (가로 스크롤) */}
        <Text style={styles.heading}>3) 영화 선택</Text>
        <Text style={styles.subText}>아래 가로 스크롤에서 골라보세요</Text>
        <ScrollView horizontal style={styles.horizontalMovieList}>
          {nowPlayingMovies.map((m) => (
            <View>
            <TouchableOpacity
              key={m.id}
              style={[
                styles.movieItem,
                selectedMovie?.id === m.id && styles.selectedItem,
              ]}
              onPress={() => handleSelectMovie(m)}
            >
              <Image source={m.poster} style={styles.posterThumb} />
              
            </TouchableOpacity>
            <Text style={styles.movieTitle}>{truncateTitle(m.title, 6)}</Text>
            </View>
          ))}
          
        </ScrollView>

        {/* 4) 브랜드 선택 */}
        <Text style={styles.heading}>4) 브랜드 선택</Text>
        <Text style={styles.subText}>CGV / 메가박스 / 롯데시네마</Text>
        <View style={styles.brandRow}>
          {Object.keys(brandLogos).map((b) => (
            <TouchableOpacity
              key={b}
              style={[
                styles.brandButton,
                selectedBrand === b && styles.selectedItem,
              ]}
              onPress={() => handleSelectBrand(b)}
            >
              <Text style={styles.brandText}>{b}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 포토카드 만들기 */}
        <TouchableOpacity style={styles.makeCardButton} onPress={openPhotoCard}>
          <Text style={styles.makeCardButtonText}>포토카드 만들기</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} /> 
        {/* 하단 여백 */}
      </ScrollView>

      {/* 모달 (포토카드 미리보기 + 저장) */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ViewShot
              ref={viewShotRef}
              style={[
                styles.cardContainer,
                { borderColor: cardBorderColor }, // 브랜드별 테두리 적용
              ]}
              options={{ format: 'png', quality: 0.9 }}
            >
              {/* 브랜드 로고 */}
              {selectedBrand && brandLogos[selectedBrand] && (
                <Image source={brandLogos[selectedBrand]} style={styles.brandLogo} />
              )}

              {/* 영화 포스터 */}
              {selectedMovie && (
                <Image source={selectedMovie.poster} style={styles.cardPoster} />
              )}

              {/* 영화 정보 */}
              {selectedMovie && (
                <View style={styles.textArea}>
                  <Text style={styles.cardTitle}>{selectedMovie.title}</Text>
                  {/* (장르, 등급)만 표시: "장르 : ..., 등급 : ..." 등 */}
                  <Text style={styles.cardDesc}>
                    장르 : {(selectedMovie.description.match(/장르\s*:\s*(.*?)(\n|$)/) || [])[1] || '-'}
                  </Text>
                  <Text style={styles.cardDesc}>
                    등급 : {(selectedMovie.description.match(/등급\s*:\s*(.*?)(\n|$)/) || [])[1] || '-'}
                  </Text>
                  {/* 관람 일자 + 사용자 이름 */}
                  <Text style={styles.cardDesc}>{formatDate(date)} 관람</Text>
                  <Text style={styles.cardDesc}>{userName}</Text>
                </View>
              )}
            </ViewShot>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.modalBtn} onPress={handleSaveCard}>
                <Text style={styles.modalBtnText}>이미지 저장/공유</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#777' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>닫기</Text>
              </TouchableOpacity>
            </View>
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
  dateButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },
  horizontalMovieList: {
    marginBottom: 16,
    height: 160, // 옵션
  },
  movieItem: {
    width: 80,
    marginRight: 12,
    alignItems: 'center',
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 8,
  },
  posterThumb: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    color: '#333',
  },
  brandRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  brandButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  brandText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
  },
  makeCardButton: {
    backgroundColor: '#DC143C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  makeCardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // 모달
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cardContainer: {
    width: 300,
    height: 460,
    borderWidth: 4,           // 브랜드색 테두리
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  brandLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginTop: 16,
  },
  cardPoster: {
    width: 200,
    height: 260,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 16,
  },
  textArea: {
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  cardDesc: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
  },
  modalBtnRow: {
    flexDirection: 'row',
  },
  modalBtn: {
    backgroundColor: '#DC143C',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});