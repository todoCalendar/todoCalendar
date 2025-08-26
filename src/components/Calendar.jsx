import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector, useDispatch } from "react-redux";
import { selectDate } from "../store";
import "../assets/css/calendar.css";

export default function Calendar() {
    const todos = useSelector((state) => state.filteredTodos);
    const dispatch = useDispatch();

    const calendarEvents = todos.map((todo) => ({
        title: todo.text,
        start: `${todo.year}-${todo.month}-${todo.day}`,
        id: todo.id,
        className: todo.isDone ? "done" : "",
    }));

    const handleDateClick = (arg) => {
        dispatch(selectDate(arg.dateStr));
    };

    return (
        <div id="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
                events={calendarEvents}
                selectable={true}
                height={792.93}
                locale="ko"
                dayCellContent={(arg) => {
                    // 날짜에서 '일' 글자를 제거하고 숫자만 반환
                    return arg.dayNumberText.replace("일", "");
                }}
                // titleFormat={{ month: "long" }}
                headerToolbar={{
                    left: "",
                    center: "prev title next",
                    right: "",
                }}
                dayHeaderFormat={{ weekday: "short" }}
                dayMaxEvents={true} // 하루 칸의 크기에 따라 동적으로 할 일 개수를 조절해주는 설정
            />
        </div>
    );
}
