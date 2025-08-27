import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo } from "../store/index.js";
import styles from "../assets/css/filter-btns.module.css";

export function FilteredTodoList() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    const filters = useMemo(() => {
        const filterSet = new Set(todos.map((todo) => todo.text));
        return Array.from(filterSet);
    }, [todos]);

    const [visibleCount, setVisibleCount] = useState(0);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    // 토글 확장, 축소 조절
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMoreClick = () => {
        setIsExpanded((prevState) => !prevState); // 현재 상태의 반대값으로 변경
    };

    const updateVisibleButtons = useCallback(() => {
        if (!containerRef.current || filters.length === 0) return;

        // 모든 버튼을 일단 렌더링해야 측정이 가능하므로, 임시로 모두 보이게 설정
        setVisibleCount(filters.length);

        // setTimeout을 사용해 '모두 보이는' 상태가 DOM에 반영된 후 계산을 시작
        setTimeout(() => {
            const containerRect = containerRef.current.getBoundingClientRect();
            // '더보기' 버튼은 항상 마지막 요소이므로, ref에서 가져옵니다.
            const moreBtn = itemRefs.current[filters.length];

            let overflowIndex = -1;

            for (let i = 0; i < filters.length; i++) {
                const buttonElement = itemRefs.current[i];
                if (!buttonElement) continue;

                const buttonRect = buttonElement.getBoundingClientRect();
                if (buttonRect.bottom > containerRect.bottom) {
                    overflowIndex = i;
                    break;
                }
            }

            if (overflowIndex === -1) {
                // 모든 버튼이 다 들어맞는 경우, 그대로 유지
                return;
            }

            let newVisibleCount = overflowIndex;

            while (newVisibleCount > 0) {
                const lastVisibleButton = itemRefs.current[newVisibleCount - 1];
                if (!lastVisibleButton || !moreBtn) break;

                const lastVisibleButtonRect =
                    lastVisibleButton.getBoundingClientRect();
                if (
                    lastVisibleButtonRect.right + moreBtn.offsetWidth <
                    containerRect.right
                ) {
                    break;
                }
                newVisibleCount--;
            }

            setVisibleCount(newVisibleCount);
        }, 0);
    }, [filters]);

    useEffect(() => {
        updateVisibleButtons();
        window.addEventListener("resize", updateVisibleButtons);

        return () => {
            window.removeEventListener("resize", updateVisibleButtons);
        };
    }, [filters, updateVisibleButtons]);

    return (
        <div className={styles["filter-btn-group"]} ref={containerRef}>
            {/* ✅ slice를 사용해 계산된 만큼만 렌더링합니다. */}
            {filters.slice(0, visibleCount).map((filter, i) => (
                <button
                    key={i}
                    ref={(el) => (itemRefs.current[i] = el)}
                    className={styles["filter-btn"]}
                    onClick={() => dispatch(filterTodo(filter))}
                >
                    {filter}
                </button>
            ))}
            {/* ✅ '더보기' 버튼도 항상 렌더링하되, ref만 연결해 둡니다. */}
            {/* 최종적으로 visibleCount < filters.length 조건에 따라 보이거나 보이지 않게 됩니다.*/}

            {/* <button
                ref={(el) => (itemRefs.current[filters.length] = el)}
                className={styles["btn-more"]}
                // visibleCount가 filters.length보다 작을 때만 보이도록 설정
                style={{
                    display:
                        visibleCount < filters.length ? "inline-flex" : "none",
                }}
            >
                ...
            </button> */}
            {visibleCount < filters.length && (
                <button
                    className={styles["btn-more"]}
                    ref={(el) => (itemRefs.current[filters.length] = el)}
                    onClick={handleMoreClick} // 클릭 핸들러 연결
                >
                    ...
                </button>
            )}
            {isExpanded && visibleCount < filters.length && (
                <div className={styles["dropdown-menu"]}>
                    {/* visibleCount 이후의 숨겨진 버튼들만 렌더링 */}
                    {filters.slice(visibleCount).map((filter, i) => (
                        <button
                            key={i}
                            className={styles["filter-btn"]}
                            onClick={() => {
                                dispatch(filterTodo(filter));
                                setIsExpanded(false); // 필터 선택 시 드롭다운 닫기
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
