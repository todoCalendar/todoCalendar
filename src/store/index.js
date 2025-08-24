import { createStore } from "redux";

// const TODOS : [{
//   id:1
//   year:'',
//   month:'',
//   day:'',
//   isDone:false,
//   cycle:{year:false, month:false, day:false},
//   text:'',
// },{
//   id:2
//   year:'',
//   month:'',
//   day:'',
//   isDone:false,
//   cycle:{year:false, month:false, day:false},
//   text:'',
// }]

const initialState = { todos: [], selectedDate: "" };

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
export const deleteTodo = (id) => ({
    type: DELETE_TODO,
});
export const deleteAll = (year, month) => ({
    type: DELETE_ALL,
});

// 마지막에 추가할 기능
export const filterTodo = () => ({
    type: FILTER_TODO,
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
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, isDone: !todo.isDone }
                        : todo
                ),
            };
        case DELETE_TODO:
        case DELETE_ALL:
        case FILTER_TODO:
        default:
            return state;
    }
}

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
