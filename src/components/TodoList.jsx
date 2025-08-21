import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAll, deleteTodo } from "../store/index.js";

const TodoList = () => {
    const [selectedIds, setSelectedIds] = useState(new Set());

    const dispatch = useDispatch();

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
            console.log("prevState:", prevState);
            console.log("prevState.has(id):", prevState.has(id));
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
            <h3>TODO LIST</h3>
            {/*필터 컴포넌트 추가되는 영역*/}

            <button onClick={handleDeleteSelected}>선택삭제</button>
            <button onClick={handleDeleteAll}>전체삭제</button>
            <ul>
                <li>
                    <span>1</span>
                    <div>
                        <input
                            id="checkbox1"
                            type="checkbox"
                            onChange={() => toggleSelected(1)}
                            checked={selectedIds.has(1)}
                        />
                        <label htmlFor="checkbox1">청소하기</label>
                    </div>
                    <div>
                        <input
                            id="checkbox2"
                            type="checkbox"
                            onChange={() => toggleSelected(2)}
                            checked={selectedIds.has(2)}
                        />
                        <label htmlFor="checkbox2">설거지하기</label>
                    </div>
                </li>
            </ul>
        </aside>
    );
};

export default TodoList;
