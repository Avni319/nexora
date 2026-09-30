function EventCard({ event }) {
  return (
    <div
      className="truncate rounded-lg px-2 py-1 text-xs font-semibold text-white shadow-sm"
      style={{ backgroundColor: event.color || "#7C3AED" }}
      title={event.title}
    >
      {event.title}
    </div>
  );
}

export default EventCard;
