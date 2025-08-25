import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo } from "../store/index.js"; // filterTodo 액션 생성자

export function FilteredTodoList() {
    const todos = useSelector((state) => state.todos); //콜백함수라서 이렇게 불러와야됨

    // filter, map,
    const filters = useMemo(() => {
        return new Set(todos.map((todo) => todo.text));
    });
    console.log(filters);
    return [...filters].map((filter, i) => <button key={i}>{filter}</button>);
}
