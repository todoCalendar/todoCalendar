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

const initialState = { todos: [] };

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

// 마지막에 추가할 기능
export const filterTodo = () => ({
    type: FILTER_TODO,
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
                todos: state.todos.filter((todo) => todo.id !== action.id),
            };
        case DELETE_ALL:
            return {
                todos: state.todos.filter(
                    (todo) =>
                        todo.year === action.year && todo.month === action.month
                ),
            };
        case FILTER_TODO:
        default:
            return state;
    }
}

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
