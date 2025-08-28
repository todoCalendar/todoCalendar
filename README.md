# todoCalendar

Redux를 이용한 달력 형식의 일정 관리 서비스 구현

- [x] store 데이터 작성

- [x] 폴더구조
      /components
      .Calendar.jsx
      .InputTodo.jsx
      .TodayTodo.jsx
      .TodoList.jsx

        /store
        .index.js

- [x] 역할

* 삭제, 모두 삭제 기능 : (동욱님)
* 필터 기능, 달력 UI : (지언님)
* 할 일 입력 기능, 반복 저장 기능 : (은별님)

- [x] 이슈 생성 -> 브랜치 생성 -> 개발 -> 풀리퀘 -> 이슈 닫기

- 달력(Calendar.jsx)
  <img width="1393" height="859" alt="스크린샷 2025-08-28 오후 8 23 42" src="https://github.com/user-attachments/assets/66c7cce7-6b4c-459a-b9e9-55b51fc52934" /> - 달력 구현 : FullCalendar 라이브러리 사용 (https://fullcalendar.io/) - CSS styling : Elements 탭에서 className을 찾아 하나하나 스타일링(Overriding Properties)

- 필터(FilteredTodoList.jsx)
  <img width="339" height="114" alt="스크린샷 2025-08-28 오후 8 24 01" src="https://github.com/user-attachments/assets/5b8be23a-3a01-42a2-b60a-df0daff8e5ca" /> - 필터 클릭 시, 토글 선택되게 하고 -
