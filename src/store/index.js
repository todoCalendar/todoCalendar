import { createStore } from "redux";

export const dummy = [
    {
        id: 1,
        year: "2025",
        month: "08",
        day: "01",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "청소하기",
    },
    {
        id: 2,
        year: "2025",
        month: "08",
        day: "01",
        isDone: false,
        cycle: { year: false, month: false, day: false },
        text: "빨래하기",
    },
    {
        id: 3,
        year: "2025",
        month: "08",
        day: "02",
        isDone: false,
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
        text: "밥하기",
    },
];

const initialState = {
    todos: dummy,
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

// 액션 생성자
export const selectTodayTodo = (year, month, day) => ({
    type: SELECT_TODAY_TODO,
    payload: day,
});
//선택한 날짜 TODO LIST
export const selectMonthTodo = (year, month) => ({
    type: SELECT_MONTH_TODO,
});
//MONTHLY TODO LIST
export const addTodo = (todo) => ({
    type: ADD_TODO,
});
export const todoDone = (id) => ({
    type: TODO_DONE,
});
export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id,
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
        case SELECT_TODAY_TODO:
        case SELECT_MONTH_TODO:
        case ADD_TODO:
        case TODO_DONE:
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id),
            };
        case DELETE_ALL:
            return {
                ...state,
                todos: state.todos.filter(
                    (todo) =>
                        todo.year === action.year && todo.month === action.month
                ),
            };
        case FILTER_TODO:
            // action.text
            // 필터 값 모음 TOGGLE로 설정해주기
            const filterOptions = [];
            const filteredList = [];

            if (state.activeFilters.includes(action.text)) {
                state.activity.filter((f) => f !== action.text);
            } else {
                [...state.activityFilters, action.text];
            }

            // 만약 todos.text랑 action.text랑 같다면 filteredList로
            if (newFilters.length === 0) {
                filteredList = state.todos;
            } else {
                state.todos.filter((todo) => newFilters.includes(todo.text));
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
