import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
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

    const calendarEvents = dummy.map((todo) => ({
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
        />
    );
}
