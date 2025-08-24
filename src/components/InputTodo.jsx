import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, todoDone } from "../store";

function InputTodo() {
    // 입력 값을 저장할 state 생성
    const [text, setText] = useState("");
    const [showRepeatList, setShowRepeatList] = useState(false);

    // dispatch 함수 가져오기
    const dispatch = useDispatch();

    // Redux 스토어에서 todos와 selectedDate 상태를 가져오기
    const todos = useSelector((state) => state.todos);
    const selectedDate = useSelector((state) => state.selectedDate);

    // **임시로 selectedDate를 설정합니다.**
    // 다른 팀원이 달력 기능을 완성하면 이 부분은 제거하고
    // `useSelector`로 가져온 selectedDate를 사용하면 됩니다.
    const tempSelectedDate = "2025-08-02";

    // 날짜 문자열에서 일(day)을 추출
    // const day = selectedDate ? selectedDate.split("-")[2] : "";
    const day = tempSelectedDate ? tempSelectedDate.split("-")[2] : "";

    // 요일 이름을 추출하는 함수
    const getDayName = (dateString) => {
        if (!dateString) return "";
        const days = [
            "일요일",
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
        ];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

    const dayName = getDayName(tempSelectedDate);

    const date = new Date(tempSelectedDate);
    const dayIndex = date.getDay(); // 요일 인덱스 (0:일, 1:월, ..., 6:토)

    // 요일 인덱스에 따라 다른 클래스 이름을 반환하는 함수
    const getDayClassName = (index) => {
        if (index === 0) {
            // 일요일
            return "sunday";
        } else if (index === 6) {
            // 토요일
            return "saturday";
        } else {
            // 평일
            return "weekday";
        }
    };
    // 최종적으로 적용될 클래스 이름
    const dayClass = getDayClassName(dayIndex);

    // 입력값이 변경될때마다 state 업데이트
    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    //  추가 버튼 클릭시 실행될 함수
    const handleAddTodo = () => {
        if (text.trim() === "") {
            alert("할 일을 입력해주세요.");
            return;
        }

        // addTodo 액션 생성자를 사용해 dispatch 함
        // dispatch(addTodo(text, selectedDate));
        dispatch(addTodo(text, tempSelectedDate));
        setText("");
    };

    const handleToggleDone = (id) => {
        dispatch(todoDone(id));
    };

    //  selectedDate를 사용해 할 일을 필터링
    // const filteredTodos = todos.filter((todo) => todo.date === selectedDate);
    const filteredTodos = todos.filter(
        (todo) => todo.date === tempSelectedDate
    );

    // 반복 버튼 클릭 시 핸들러 함수
    const handleRepeatClick = () => {
        setShowRepeatList(!showRepeatList);
    };

    return (
        <div className="input-todo">
            <div className="view-box">
                <strong className={dayClass}>
                    {day
                        ? `${parseInt(day)}일 ${dayName}`
                        : "날짜를 선택해 주세요"}
                </strong>
                <ul className="todaylist">
                    {filteredTodos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                id={`todolist-${todo.id}`}
                                checked={todo.isDone}
                                onChange={() => handleToggleDone(todo.id)}
                            />
                            <label
                                htmlFor={`todolist-${todo.id}`}
                                className={todo.isDone ? "checked" : ""}
                            >
                                {todo.text}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="add-box">
                <label htmlFor="inputText" className="sr-only">
                    할일 입력
                </label>
                <input
                    type="text"
                    id="inputText"
                    placeholder="할 일을 입력해주세요"
                    value={text}
                    onChange={handleInputChange}
                />
                <div className="btn-box">
                    <button
                        type="button"
                        className="add-btn btn"
                        onClick={handleAddTodo}
                    >
                        추가
                    </button>
                    <button
                        type="button"
                        className="repeat-btn btn"
                        onClick={handleRepeatClick}
                    >
                        반복
                    </button>
                    <ul
                        className={`repeat-list ${showRepeatList ? "show" : ""}`}
                    >
                        <li>매일마다</li>
                        <li>매주마다</li>
                        <li>매월마다</li>
                        <li>매년마다</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InputTodo;
