import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";

export default function Calendar() {
    const todos = useSelector((state) => state.todos);

    const calendarEvents = todos.map((todo) => ({
        title: todo.text,
        start: `${todo.year}-${todo.month}-${todo.day}`,
        id: todo.id,
    }));

    const handleDateClick = (arg) => {
        alert("Date clicked: " + arg.dateStr);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            selectable={true}
            locale="ko"
            dayCellContent={(arg) => {
                // 날짜에서 '일' 글자를 제거하고 숫자만 반환
                return arg.dayNumberText.replace("일", "");
            }}
            titleFormat={{ month: "long" }}
            headerToolbar={{
                left: "title,prev,next",
                center: "",
                right: "",
            }}
            dayHeaderFormat={{ weekday: "short" }}
            events={calendarEvents}
            dayMaxEvents={true} // 하루 칸의 크기에 따라 동적으로 할 일 개수를 조절해주는 설정
        />
    );
}
