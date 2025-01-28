### Details

---

![Simulator Screenshot - 13 - 2025-01-15 at 15.56.31.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/9c8442e3-2cae-4517-9bfd-a4d4a1b9f643/Simulator_Screenshot_-_13_-_2025-01-15_at_15.56.31.png)

![Simulator Screenshot - 13 - 2025-01-15 at 15.56.50.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/dd16680f-0f2c-4d1e-bbfd-01a79580c6e7/Simulator_Screenshot_-_13_-_2025-01-15_at_15.56.50.png)

**시작 화면**

- 지도 위에 현재 위치 표기
- “현재 위치를 확인해주세요” 버튼 → 위치 권한 승인

![Simulator Screenshot - 13 - 2025-01-15 at 15.57.01.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/4652fa82-d29e-43f5-91b5-74a697f37f67/Simulator_Screenshot_-_13_-_2025-01-15_at_15.57.01.png)

**메인화면**

- 상영 중 섹션: 현재 상영작 카드 목록 (가로 스크롤)→ 클릭시 상영관 리스트 페이지로 이동
- 무대인사/이벤트 등 다양한 홍보 배너 (예: “CGV 할인 이벤트”)
- 영화관 3사 바로가기 배너(CGV,메가박스,롯데시네마)

![Simulator Screenshot - 13 - 2025-01-15 at 15.58.16.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/8779e45b-09bd-4ba8-a481-28923c0121e4/Simulator_Screenshot_-_13_-_2025-01-15_at_15.58.16.png)

![Simulator Screenshot - 13 - 2025-01-15 at 16.06.44.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/280bd7f0-f905-4379-8598-9d7f6084447d/Simulator_Screenshot_-_13_-_2025-01-15_at_16.06.44.png)

**영화별 상영시간표**

- 영화 클릭시 현재 위치정보 카카오 api요청 → 근처 영화문화시설 정보
- CGV, 메가박스, 롯데시네마 추출, 거리계산(경도, 위도)
- 저장된 데이터베이스(mongoDB, 10분 간격 업데이트) → 상영시간, 상영관, 잔여좌석 등의 정보 제공
- 잔여좌석은 10분간격으로 최신화 → 실시간 크롤링 활용(api 제공X)
- 상영시간표 해당 시간 클릭 → 해당 영화사 예매사이트로 이동
- 데이터베이스의 3일치 정보 저장 → 날짜 변경시 해당 정보 제공

![Simulator Screenshot - 13 - 2025-01-15 at 16.02.51.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/bdbc93b6-0eeb-4270-9a5d-38672de5f712/Simulator_Screenshot_-_13_-_2025-01-15_at_16.02.51.png)

![Simulator Screenshot - 13 - 2025-01-15 at 16.03.08.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d06e323c-4cf1-43ec-a484-59c33418370a/Simulator_Screenshot_-_13_-_2025-01-15_at_16.03.08.png)

![Simulator Screenshot - 13 - 2025-01-15 at 16.03.18.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/f5634cf0-3675-4c3c-96f5-dd0ec5dc2408/Simulator_Screenshot_-_13_-_2025-01-15_at_16.03.18.png)

**포토카드 만들기**

- 사용자 이름, 관람 일자, 관람 영화, 브랜드 선택
- 카드 레이아웃에 포스터 + 브랜드 로고 + 관람일자 + 이름을 넣어 포토카드 생성 후 **이미지**로 저장/공유

![Simulator Screenshot - 13 - 2025-01-15 at 16.04.59.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/6606c5e3-1991-452e-a5d5-82f63b11e20c/Simulator_Screenshot_-_13_-_2025-01-15_at_16.04.59.png)

![Simulator Screenshot - 13 - 2025-01-15 at 16.06.09.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/c5f874f8-d33c-404e-96d7-b4deb40a3cb7/Simulator_Screenshot_-_13_-_2025-01-15_at_16.06.09.png)

**상영 영화 미니게임**

- 현재 상영 중인 영화 중 랜덤으로 8개를 가져와 같은 포스터 찾기 미니게임 구현
- 카드를 뒤집어가며 같은 포스터를 찾고 완료한 시간에 따라 점수가 부여됨
- 시간이 초과되거나 게임이 종료되면 랜덤으로 상영 중인 영화를 추천

![Simulator Screenshot - 13 - 2025-01-15 at 16.16.44.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/81095129-7918-461d-8e65-0aab389a1243/Simulator_Screenshot_-_13_-_2025-01-15_at_16.16.44.png)

**영화 전문가 챗봇**

- OpenAI를 이용한 영화 전문가 챗봇

## database

---

[화면 기록 2025-01-15 오후 6.04.58.mov](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/f08d0372-283c-4637-a152-fbe4d69f8691/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2025-01-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.04.58.mov)

![스크린샷 2025-01-15 오후 6.04.20.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/f0d14ed7-58c8-400a-b63f-1e5875e88f52/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-01-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.04.20.png)
