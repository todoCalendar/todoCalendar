import React, {
    useState,
    useLayoutEffect, // useEffect 대신 useLayoutEffect를 import
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

    // 초기값은 filters.length로 유지하여 첫 렌더링 시 모든 버튼을 DOM에 그려 측정을 준비합니다.
    const [visibleCount, setVisibleCount] = useState(filters.length);
    const containerRef = useRef(null);
    const buttonRefs = useRef([]); // 일반 필터 버튼 ref
    const moreBtnRef = useRef(null); // '더보기' 버튼 ref

    const [isExpanded, setIsExpanded] = useState(false);
    const handleMoreClick = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const updateVisibleButtons = useCallback(() => {
        if (!containerRef.current || filters.length === 0) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const moreBtn = moreBtnRef.current;
        let overflowIndex = -1;

        for (let i = 0; i < filters.length; i++) {
            const buttonElement = buttonRefs.current[i];
            if (!buttonElement) continue;

            const buttonRect = buttonElement.getBoundingClientRect();
            if (buttonRect.bottom > containerRect.bottom) {
                overflowIndex = i;
                break;
            }
        }

        if (overflowIndex === -1) {
            setVisibleCount(filters.length);
            return;
        }

        let newVisibleCount = overflowIndex;

        while (newVisibleCount > 0) {
            const lastVisibleButton = buttonRefs.current[newVisibleCount - 1];
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
    }, [filters]);

    // useEffect를 useLayoutEffect로 변경
    useLayoutEffect(() => {
        // setTimeout 없이 직접 함수 호출
        updateVisibleButtons();
        window.addEventListener("resize", updateVisibleButtons);

        return () => {
            window.removeEventListener("resize", updateVisibleButtons);
        };
    }, [filters, updateVisibleButtons]);

    const showMoreButton = visibleCount < filters.length;

    return (
        // 드롭다운 메뉴 위치 기준을 위한 wrapper
        <div className={styles["filter-btn-wrapper"]}>
            <div className={styles["filter-btn-group"]} ref={containerRef}>
                {filters.slice(0, visibleCount).map((filter, i) => (
                    <button
                        key={i}
                        ref={(el) => (buttonRefs.current[i] = el)}
                        className={styles["filter-btn"]}
                        onClick={() => dispatch(filterTodo(filter))}
                    >
                        {filter}
                    </button>
                ))}
                {showMoreButton && (
                    <button
                        className={styles["btn-more"]}
                        ref={moreBtnRef}
                        onClick={handleMoreClick}
                    >
                        ...
                    </button>
                )}
            </div>
            {isExpanded && showMoreButton && (
                <div className={styles["dropdown-menu"]}>
                    {filters.slice(visibleCount).map((filter, i) => (
                        <button
                            key={i}
                            className={styles["filter-btn"]}
                            onClick={() => {
                                dispatch(filterTodo(filter));
                                setIsExpanded(false);
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
