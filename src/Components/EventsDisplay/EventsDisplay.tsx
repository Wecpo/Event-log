import { useState } from "react";
import { SELECT_BUTTON_OPTIONS } from "../../constants";
import CardEvents from "../CardEvents/CardEvents";
import TableEvents from "../TableEvents/TableEvents";
import ToggleEventsDisplayType from "../ToggleEventsDisplayType/ToggleEventsDisplayType";
const EventsDisplay = ({
  allEvents,
  changeReadStatusOfEvent,
  setSelectedEvent,
  selectedEvent,
}) => {
  const [displayType, setDisplayType] = useState(SELECT_BUTTON_OPTIONS[0]);
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
