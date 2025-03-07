## FE, 이현서

(고려대학교 컴퓨터학과 21학번)

[@ss-leg-al](https://github.com/ss-leg-al)



## BE, 박규현

(한양대학교 컴퓨터소프트웨어학부 22)

[@Pgyuhyeon](https://github.com/Pgyuhyeon/CinemaCheck)


### Tech Stack

---

**프론트엔드** : React-Native, Typescript, expo

**백엔드** : Node.js, Express.js, MongoDB, mongoose, Postman, AWS, Python Crawling

**협업 툴** : Git, Github, Notion
### Details

---


**시작 화면**

- 지도 위에 현재 위치 표기
- “현재 위치를 확인해주세요” 버튼 → 위치 권한 승인

**메인화면**

- 상영 중 섹션: 현재 상영작 카드 목록 (가로 스크롤)→ 클릭시 상영관 리스트 페이지로 이동
- 무대인사/이벤트 등 다양한 홍보 배너 (예: “CGV 할인 이벤트”)
- 영화관 3사 바로가기 배너(CGV,메가박스,롯데시네마)


**영화별 상영시간표**

- 영화 클릭시 현재 위치정보 카카오 api요청 → 근처 영화문화시설 정보
- CGV, 메가박스, 롯데시네마 추출, 거리계산(경도, 위도)
- 저장된 데이터베이스(mongoDB, 10분 간격 업데이트) → 상영시간, 상영관, 잔여좌석 등의 정보 제공
- 잔여좌석은 10분간격으로 최신화 → 실시간 크롤링 활용(api 제공X)
- 상영시간표 해당 시간 클릭 → 해당 영화사 예매사이트로 이동
- 데이터베이스의 3일치 정보 저장 → 날짜 변경시 해당 정보 제공

**포토카드 만들기**

- 사용자 이름, 관람 일자, 관람 영화, 브랜드 선택
- 카드 레이아웃에 포스터 + 브랜드 로고 + 관람일자 + 이름을 넣어 포토카드 생성 후 **이미지**로 저장/공유

**상영 영화 미니게임**

- 현재 상영 중인 영화 중 랜덤으로 8개를 가져와 같은 포스터 찾기 미니게임 구현
- 카드를 뒤집어가며 같은 포스터를 찾고 완료한 시간에 따라 점수가 부여됨
- 시간이 초과되거나 게임이 종료되면 랜덤으로 상영 중인 영화를 추천


**영화 전문가 챗봇**

- OpenAI를 이용한 영화 전문가 챗봇

<img src="https://github.com/user-attachments/assets/4bd7cda8-5cb3-485f-985c-c914633e3665" width="300">
    <img src="https://github.com/user-attachments/assets/d96448ad-ba80-4cc5-8b0f-3570e82d56cb" width="300">
    <img src="https://github.com/user-attachments/assets/a2ae7a13-eada-4e37-807f-ffd15ad1e037" width="300">
    <img src="https://github.com/user-attachments/assets/62751cf4-bf37-4a71-a71d-016617464232" width="300">
    <img src="https://github.com/user-attachments/assets/b3c0d8d8-972d-4b03-bc8a-2265ab0a9ea1" width="300">
    <img src="https://github.com/user-attachments/assets/cd209cd7-37ae-4660-80de-10b2a13bae58" width="300">
    <img src="https://github.com/user-attachments/assets/4a0537af-8f2a-4e68-bd35-502218dcd33b" width="300">
    <img src="https://github.com/user-attachments/assets/5d89e5fd-de72-4915-a08e-baf2544a548b" width="300">
    <img src="https://github.com/user-attachments/assets/b08b0162-9649-4d8f-8db6-0f543e8d597a" width="300">
    <img src="https://github.com/user-attachments/assets/f8393b86-29a8-4291-a8f5-8dbec54c365e" width="300">
    <img src="https://github.com/user-attachments/assets/0903b630-41d2-4bce-8579-9e2bb8c1c43b" width="300">
