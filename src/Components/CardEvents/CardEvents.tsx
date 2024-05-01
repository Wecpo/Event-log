import { DataView } from "primereact/dataview";
import { Event } from "../../types";
import EventCard from "../EventCard/EventCard";
import { useEffect } from "react";

type CardEventsProps = {
  allEvents: Event[];
  changeReadStatusOfEvent: (
    eventAction: React.KeyboardEvent<HTMLDivElement>,
    selectedEvent: Event | null
  ) => void;
  selectedEvent: Event | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
};

const CardEvents = ({
  allEvents,
  changeReadStatusOfEvent,
  selectedEvent,
  setSelectedEvent,
}: CardEventsProps) => {
  const handleOnCardClick = (event: Event) => {
    if (event) setSelectedEvent(event);
    if (event === selectedEvent) setSelectedEvent(null);
  };

  useEffect(() => {
    const onOutsideOfCardClick = () => {
      const target = event?.target as HTMLElement;
      if (target.id !== "eventCard") {
        setSelectedEvent(null);
      }
    };

    document.addEventListener("click", onOutsideOfCardClick);

    return () => document.removeEventListener("click", onOutsideOfCardClick);
  }, []);

  const cardTemplate = (allEvents: Event[]): JSX.Element => {
    const list = allEvents.map((event: Event, index) => (
      <EventCard
        key={index}
        event={event}
        changeReadStatusOfEvent={changeReadStatusOfEvent}
        selectedEvent={selectedEvent}
        handleOnCardClick={handleOnCardClick}
      />
    ));
    return (
      <div style={{ minWidth: "1360px" }} className="grid ">
        {list}
      </div>
    );
  };
  return (
    <DataView
      value={allEvents}
      paginator
      rows={6}
      listTemplate={cardTemplate}
    />
  );
};

export default CardEvents;
