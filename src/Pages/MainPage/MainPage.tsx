import { useEffect, useState } from "react";
import { eventsArray } from "../../mockData/eventsArray";
import AddEventForm from "../../Components/AddEventForm/AddEventForm";
import { Event } from "../../types";
import SearchString from "../../Components/Search/SearchString";
import EventsDisplay from "../../Components/EventsDisplay/EventsDisplay";

const MainPage = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState(eventsArray);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const changeReadStatusOfEvent = (
    eventAction: React.KeyboardEvent<HTMLElement>,
    selectedEvent: Event
  ) => {
    if (selectedEvent && eventAction.code === "Space") {
      const changedEvents = allEvents.map((event: Event) => {
        if (selectedEvent.id === event.id) {
          event.isRead = !event.isRead;
        }

        return event;
      });
      setAllEvents(changedEvents);
    }
  };

  useEffect(() => {
    // Имитируем запрос событий при монтировании
    setAllEvents(eventsArray);
  }, []);

  useEffect(() => {
    setFilteredEvents(allEvents);
  }, [allEvents]);

  return (
    <>
      <AddEventForm setAllEvents={setAllEvents} allEvents={allEvents} />
      <SearchString
        allEvents={allEvents}
        setFilteredEvents={setFilteredEvents}
      />
      <EventsDisplay
        allEvents={filteredEvents}
        changeReadStatusOfEvent={changeReadStatusOfEvent}
        setSelectedEvent={setSelectedEvent}
        selectedEvent={selectedEvent}
      />
    </>
  );
};

export default MainPage;
