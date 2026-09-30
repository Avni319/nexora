import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarGrid({ events }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="p-5">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 620 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#7C3AED",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              padding: "2px 8px",
            },
          })}
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: "transparent",
            },
          })}
        />
      </div>
    </div>
  );
}

export default CalendarGrid;
