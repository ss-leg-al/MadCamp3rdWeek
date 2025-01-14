import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import MovieCard from '@/components/MovieCard';
import CustomHeader from '@/components/CustomHeader';
import TheaterCard from '@/components/TheaterCard';
import EventCard from '@/components/EventCard';
import StageGreetingCard from '@/components/StageGreetingCard';
const stageGreetingData = [
  { id: '1', title: '<말할 수 없는 비밀> 개봉주&2주차 무대인사', period: '2025.01.28 ~ 2025.02.09', url: 'https://www.megabox.co.kr/event/detail?eventNo=16961', image: require('@/assets/images/greeting1.jpg') },
  { id: '2', title: '<검은 수녀들> 개봉주 무대인사', period: '2025.01.26 ~ 2025.01.26', url: 'https://www.megabox.co.kr/event/detail?eventNo=16979', image: require('@/assets/images/greeting2.png') },
  { id: '3', title: '<히트맨2> 개봉일 무대인사', period: '2025.01.22 ~ 2025.01.22', url: 'https://www.megabox.co.kr/event/detail?eventNo=16962', image: require('@/assets/images/greeting3.jpg') },
  { id: '4', title: '<하얼빈> 4주차 무대인사', period: '2025.01.18 ~ 2025.01.19', url: 'https://www.megabox.co.kr/event/detail?eventNo=16982', image: require('@/assets/images/greeting4.png') },
];
const eventData = [
  { id: '1', title: '내 통신사 혜택 확인하고 CGV 영화 할인 받자!', period: '2024.02.01 ~ 2026.01.31', url: 'http://www.cgv.co.kr/culture-event/event/detailViewUnited.aspx?seq=39599&menu=006', image: require('@/assets/images/event1.jpg') },
  { id: '2', title: '나라 지키는 국군장병을 위한 힐링 프로젝트', period: '2025.01.01 ~ 2025.12.31', url: 'https://www.lottecinema.co.kr/NLCHS/Event/EventTemplateInfo?eventId=501010014224007', image: require('@/assets/images/event2.jpg') },
  { id: '3', title: '[토스페이] 새해맞이 토스 결제 이벤트!', period: '2025.01.02 ~ 2025.01.31', url: 'https://www.megabox.co.kr/event/detail?eventNo=16912', image: require('@/assets/images/event3.jpg') },
];

const theaterData = [
  { id: '1', name: '메가박스', logo: require('@/assets/images/megabox.png'),url:'https://www.megabox.co.kr' },
  { id: '2', name: 'CGV', logo: require('@/assets/images/cgv.png'),url:'https://www.cgv.co.kr'},
  { id: '3', name: '롯데시네마', logo: require('@/assets/images/lottecinema.png'),url:'https://www.lottecinema.co.kr/NLCHS/' },
];
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

export default function NowPlayingScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title="CINEMACHECK" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="never" // iOS 안전 영역 여백 제거
      >

        
        <View style={styles.content}>
          <Text style={styles.heading}>상영 중</Text>
          <FlatList
            data={nowPlayingMovies}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieCard movie={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>무대인사 일정</Text>
          <FlatList
            data={stageGreetingData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <StageGreetingCard greeting={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

       


        <View style={styles.content}>
          <Text style={styles.heading}>제휴 할인 이벤트</Text>
          <FlatList
            data={eventData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard event={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>


            <View style={styles.content}>
          <Text style={styles.heading}>영화관 바로가기</Text>
          <FlatList
            data={theaterData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TheaterCard theater={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.spacer} />

        
        

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingTop: 80, // 헤더 높이에 맞춰 콘텐츠 밀기
    paddingBottom: 0, // 하단 여백 제거
    paddingHorizontal: 16, // 좌우 여백 유지
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    marginTop: 10,
    marginBottom: 15, // 각 섹션 간 간격
  },
  spacer: {
    height: 100, // 빈 공간의 높이 설정
  },
});