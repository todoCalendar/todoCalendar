import { createStore } from "redux";

export const dummy = [
    {
        id: 1,
        year: "2025",
        month: "08",
        day: "01",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "청소하기",
    },
    {
        id: 2,
        year: "2025",
        month: "08",
        day: "01",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "빨래하기",
    },
    {
        id: 3,
        year: "2025",
        month: "08",
        day: "02",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "밥하기",
    },
    {
        id: 4,
        year: "2025",
        month: "08",
        day: "03",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "청소하기",
    },
    {
        id: 5,
        year: "2025",
        month: "08",
        day: "04",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "빨래하기",
    },
    {
        id: 6,
        year: "2025",
        month: "08",
        day: "05",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "밥하기",
    },
    {
        id: 7,
        year: "2025",
        month: "08",
        day: "06",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "청소하기",
    },
    {
        id: 8,
        year: "2025",
        month: "08",
        day: "07",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "빨래하기",
    },
    {
        id: 9,
        year: "2025",
        month: "08",
        day: "08",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "밥하기",
    },
    {
        id: 10,
        year: "2025",
        month: "08",
        day: "09",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "청소하기",
    },
    {
        id: 11,
        year: "2025",
        month: "08",
        day: "10",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "빨래하기",
    },
    {
        id: 12,
        year: "2025",
        month: "08",
        day: "11",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "가나다라",
    },
    {
        id: 13,
        year: "2025",
        month: "08",
        day: "01",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "마바사",
    },
    {
        id: 14,
        year: "2025",
        month: "08",
        day: "01",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "아자차",
    },
    {
        id: 15,
        year: "2025",
        month: "08",
        day: "01",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "타가파하",
    },
    {
        id: 16,
        year: "2025",
        month: "08",
        day: "01",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "타가파",
    },
    {
        id: 17,
        year: "2025",
        month: "08",
        day: "01",
        isDone: true,
        cycle: { year: false, month: false, day: false },
        text: "아자",
    },
];

const initialState = {
    todos: dummy,
    selectedDate: "",
    // filter:,
    activeFilter: [],
    filteredTodos: dummy,
};

// 액션 타입 상수
export const SELECT_TODAY_TODO = "SELECT_TODAY_TODO";
export const SELECT_MONTH_TODO = "SELECT_MONTH_TODO";
export const ADD_TODO = "ADD_TODO";
export const TODO_DONE = "TODO_DONE";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_ALL = "DELETE_ALL";
export const FILTER_TODO = "FILTER_TODO";
export const SELECT_DATE = "SELECT_DATE";

// 액션 생성자
export const selectDate = (date) => ({
    type: SELECT_DATE,
    payload: date,
});
export const selectTodayTodo = (year, month, day) => ({
    type: SELECT_TODAY_TODO,
    payload: day,
});
//선택한 날짜 TODO LIST
export const selectMonthTodo = (year, month) => ({
    type: SELECT_MONTH_TODO,
});
//MONTHLY TODO LIST
export const addTodo = (todo, date) => ({
    type: ADD_TODO,
    payload: {
        id: Date.now(), // 고유 ID 생성
        isDone: false, // 할 일의 완료 여부
        text: todo, // InputTodo에서 전달받은 내용
        date: date, // 선택된 날짜 정보 추가
    },
});
export const todoDone = (id) => ({
    type: TODO_DONE,
    payload: id,
});
export const deleteTodo = (selectedIds) => ({
    type: DELETE_TODO,
    selectedIds,
});
export const deleteAll = (year, month) => ({
    type: DELETE_ALL,
    year,
    month,
});

export const filterTodo = (text) => ({
    type: FILTER_TODO,
    text,
});

// 리듀서
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_DATE:
            // 달력에서 날짜를 클릭하면 selectedDate를 업데이트
            return {
                ...state,
                selectedDate: action.payload,
            };
        case SELECT_TODAY_TODO:
        case SELECT_MONTH_TODO:
        case ADD_TODO:
            // 새로운 할일 추가
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case TODO_DONE:
            // isDone 상태가 토글된 새로운 todos 배열 생성
            const newTodos = state.todos.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, isDone: !todo.isDone }
                    : todo
            );
            // filterTodo 배열도 동일하게 업데이트
            const newFilteredTodos = state.filteredTodos.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, isDone: !todo.isDone }
                    : todo
            );
            return {
                ...state,
                todos: newTodos,
                filteredTodos: newFilteredTodos, // filteredTodos도 업데이트하도록 추가
            };
        case DELETE_TODO:
            return {
                ...state,
                filteredTodos: state.todos.filter(
                    (todo) => !action.selectedIds.has(todo.id)
                ),
                todos: state.todos.filter(
                    (todo) => !action.selectedIds.has(todo.id)
                ),
            };
        case DELETE_ALL:
            return {
                ...state,
                filteredTodos: state.todos.filter(
                    (todo) =>
                        todo.year !== action.year && todo.month !== action.month
                ),
                todos: state.todos.filter(
                    (todo) =>
                        todo.year !== action.year && todo.month !== action.month
                ),
            };
        case FILTER_TODO:
            // 필터 값 모음 TOGGLE로 설정해주기
            let filterOptions = [];
            let filteredList = [];

            if (state.activeFilter.includes(action.text)) {
                filterOptions = state.activeFilter.filter(
                    (f) => f !== action.text
                );
            } else {
                filterOptions = [...state.activeFilter, action.text];
            }

            console.log(filterOptions);

            // 만약 todos.text랑 action.text랑 같다면 filteredList로
            if (filterOptions.length === 0) {
                filteredList = state.todos;
            } else {
                filteredList = state.todos.filter((todo) =>
                    filterOptions.includes(todo.text)
                );
            }

            return {
                ...state,
                activeFilter: filterOptions,
                filteredTodos: filteredList,
            };
        default:
            return state;
    }
}

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
