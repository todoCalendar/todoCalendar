import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
    const handleDateClick = (arg) => {
        alert(arg.dateStr);
        // 오늘의 할 일과 input 창 렌더
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
            events={[
                {
                    title: "청소하기",
                    start: "2025-08-20",
                },
                {
                    title: "설거지하기",
                    start: "2025-08-20",
                },
                {
                    title: "산책하기",
                    start: "2025-08-22",
                },
            ]}
        />
    );
}
