import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo } from "../store/index.js";
import styles from "../assets/css/todo-list.module.css";

export function FilteredTodoList() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const activeFilter = useSelector((state) => state.activeFilter);

    const filters = useMemo(() => {
        return new Set(todos.map((todo) => todo.text));
    });
    console.log(filters);

    return [...filters].map((filter, i) => (
        <button
            key={i}
            className={`${activeFilter.includes(filter) ? styles.active : ""} ${styles["filter-btn"]}`}
            onClick={() => dispatch(filterTodo(filter))}
        >
            {filter}
        </button>
    ));
}
