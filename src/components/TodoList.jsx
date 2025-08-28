import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, deleteTodo } from "../store/index.js";
import styles from "../assets/css/todo-list.module.css";
import { FilteredTodoList } from "./FilteredTodoList";

const TodoList = () => {
    const [selectedIds, setSelectedIds] = useState(new Set());

    const dispatch = useDispatch();
    const dummy = useSelector((state) => state.todos);

    const groupedDummy = Object.groupBy(dummy, ({ day }) => day);

    function handleDeleteSelected() {
        if (!confirm("선택하신 일정을 모두 삭제하시겠습니까?")) return;
        dispatch(deleteTodo(selectedIds));
        setSelectedIds(new Set());
    }
    function handleDeleteAll() {
        if (dummy.length === 0) return;

        if (!confirm("전체 일정을 삭제하시겠습니까?")) return;

        const year = dummy[0].year;
        const month = dummy[0].month;
        dispatch(deleteAll(year, month));
        setSelectedIds(new Set());
    }

    function toggleSelected(id) {
        setSelectedIds((prevState) => {
            const next = new Set(prevState);

            if (prevState.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    }

    return (
        <aside>
            <div className={styles["todo-header"]}>
                <div className={styles["list-group"]}>
                    <h3>TO DO LIST</h3>
                    <FilteredTodoList />
                </div>
                <div className={styles["btn-group"]}>
                    <button
                        className={styles["delete-btn"]}
                        onClick={handleDeleteSelected}
                    >
                        선택삭제
                    </button>
                    <button
                        className={styles["delete-all-btn"]}
                        onClick={handleDeleteAll}
                    >
                        전체삭제
                    </button>
                </div>
            </div>

            <ul className={styles["todo-list"]}>
                {Object.values(groupedDummy)
                    .sort((a, b) => a[0].day.localeCompare(b[0].day))
                    .map((dataList, index) => {
                        return (
                            <li key={index}>
                                <time dateTime="2025-08-01">
                                    {parseInt(dataList[0].day)}일
                                </time>
                                <ul>
                                    {dataList.map((data) => {
                                        return (
                                            <li
                                                className={styles["todo-li"]}
                                                key={data.id}
                                            >
                                                <input
                                                    id={`checkbox${data.id}`}
                                                    type="checkbox"
                                                    onChange={() =>
                                                        toggleSelected(data.id)
                                                    }
                                                    checked={selectedIds.has(
                                                        data.id
                                                    )}
                                                />
                                                <label
                                                    className={
                                                        data.isDone
                                                            ? "done"
                                                            : ""
                                                    }
                                                    htmlFor={`checkbox${data.id}`}
                                                >
                                                    {data.text}
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className={styles["list-line"]}></div>
                            </li>
                        );
                    })}
            </ul>
        </aside>
    );
};

export default TodoList;
