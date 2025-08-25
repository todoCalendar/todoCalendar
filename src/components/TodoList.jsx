import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAll, deleteTodo } from "../store/index.js";
import styles from "../assets/css/todo-list.module.css";
import { FilteredTodoList } from "./FilteredTodoList";

const TodoList = () => {
    const [selectedIds, setSelectedIds] = useState(new Set());

    const dispatch = useDispatch();

    const dummy = [
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

    const groupedDummy = Object.groupBy(dummy, ({ day }) => day);

    function handleDeleteSelected() {
        //TODO: 스토어 조회기능 개발완료시 작업
        const id = 1;
        dispatch(deleteTodo(id));
        setSelectedIds(new Set());
    }
    function handleDeleteAll() {
        //TODO: 스토어 조회기능 개발완료시 작업
        const year = "2025";
        const month = "08";
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

    useEffect(() => {
        console.log("selectedIds", selectedIds);
    }, [selectedIds]);

    return (
        <aside>
            <div className={styles["todo-header"]}>
                <h3>TO DO LIST</h3>
                <div className={styles["btn-group"]}>
                    <FilteredTodoList />
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
