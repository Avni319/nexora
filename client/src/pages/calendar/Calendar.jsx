import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getEvents, createEvent } from "../../services/eventService";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import EventModal from "../../components/calendar/EventModal";

function CalendarPage() {
  const { token } = useAuth();
  const { projectId } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    try {
      const response = await getEvents(token, projectId);
      setEvents(response.events.map((e) => ({ ...e, start: new Date(e.start), end: new Date(e.end) })));
    } catch { toast.error("Unable to load events"); }
    finally { setLoading(false); }
  };

  const handleCreate = async (data) => {
    try {
      const response = await createEvent(token, data);
      setEvents((prev) => [...prev, { ...response.event, start: new Date(response.event.start), end: new Date(response.event.end) }]);
      toast.success("Event created");
    } catch { toast.error("Unable to create event"); }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
            <CalendarIcon size={24} className="text-violet-600" />
            Project Calendar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {events.length} event{events.length !== 1 ? "s" : ""} scheduled
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
        >
          <Plus size={16} />
          New Event
        </button>
      </div>

      {loading ? (
        <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
      ) : (
        <CalendarGrid events={events} />
      )}

      {showModal && (
        <EventModal projectId={projectId} onSave={handleCreate} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default CalendarPage;
