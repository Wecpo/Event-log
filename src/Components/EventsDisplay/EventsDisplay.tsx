import { useState } from "react";
import { SELECT_BUTTON_OPTIONS } from "../../constants";
import CardEvents from "../CardEvents/CardEvents";
import TableEvents from "../TableEvents/TableEvents";
import ToggleEventsDisplayType from "../ToggleEventsDisplayType/ToggleEventsDisplayType";
import { Event } from "../../types";

type EventsDisplayProps = {
  allEvents: Event[];
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  selectedEvent: Event | null;
  setAllEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

const EventsDisplay = ({
  allEvents,
  setSelectedEvent,
  selectedEvent,
  setAllEvents,
}: EventsDisplayProps) => {
  const [displayType, setDisplayType] = useState(SELECT_BUTTON_OPTIONS[0]);
  const changeReadStatusOfEvent = (
    eventAction: React.KeyboardEvent<HTMLElement>,
    selectedEvent: Event | null
  ) => {
    if (selectedEvent && eventAction.code === "Space") {
      const changedEvents = allEvents.map((event) => {
        if (selectedEvent.id === event.id) {
          event.isRead = !event.isRead;
        }

        return event;
      });

      setAllEvents(changedEvents);
    }
  };

  return (
    <>
      <ToggleEventsDisplayType
        displayType={displayType}
        setDisplayType={setDisplayType}
      />
      {displayType === "Таблица" ? (
        <TableEvents
          allEvents={allEvents}
          changeReadStatusOfEvent={changeReadStatusOfEvent}
          setSelectedEvent={setSelectedEvent}
          selectedEvent={selectedEvent}
        />
      ) : (
        <CardEvents
          allEvents={allEvents}
          changeReadStatusOfEvent={changeReadStatusOfEvent}
          setSelectedEvent={setSelectedEvent}
          selectedEvent={selectedEvent}
        />
      )}
    </>
  );
};

export default EventsDisplay;
