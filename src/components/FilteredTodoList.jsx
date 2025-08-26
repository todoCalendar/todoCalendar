import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo } from "../store/index.js";

export function FilteredTodoList() {
    const todos = useSelector((state) => state.todos);

    const filters = useMemo(() => {
        return new Set(todos.map((todo) => todo.text));
    });
    console.log(filters);
    return [...filters].map((filter, i) => <button key={i}>{filter}</button>);
}
