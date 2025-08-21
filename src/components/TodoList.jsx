import React, { useEffect, useState } from "react";

const TodoList = () => {
    const [selectedIds, setSelectedIds] = useState(new Set());

    function handleDeleteSelected() {
        //todo: 선택삭제 dispatch
        setSelectedIds(new Set());
    }
    function handleDeleteAll() {
        //todo: 전체삭제 dispatch
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
        console.log(selectedIds);
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
                        />
                        <label htmlFor="checkbox1">청소하기</label>
                    </div>
                    <div>
                        <input
                            id="checkbox2"
                            type="checkbox"
                            onChange={() => toggleSelected(2)}
                        />
                        <label htmlFor="checkbox2">설거지하기</label>
                    </div>
                </li>
            </ul>
        </aside>
    );
};

export default TodoList;
