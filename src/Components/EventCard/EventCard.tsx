import { Event } from "../../types";

type EventCardProps = {
  event: Event;
  selectedEvent: Event | null;
  handleOnCardClick: (event: Event) => void;
  changeReadStatusOfEvent: (
    eventAction: React.KeyboardEvent<HTMLDivElement>,
    selectedEvent: Event | null
  ) => void;
};

const EventCard = ({
  event,
  selectedEvent,
  handleOnCardClick,
  changeReadStatusOfEvent,
}: EventCardProps) => {
  const cardStyle = () => {
    let rowClass =
      "flex flex-row  border-3 border-round-lg p-2 m-3 cursor-pointer hover:text-primary-700 ";
    if (event === selectedEvent && !event.isRead) {
      rowClass += "underline bg-gray-300 ";
    }
    if (event === selectedEvent && event.isRead) {
      rowClass += "underline ";
    }
    if (!event.isRead) {
      rowClass += "bg-gray-300";
    }
    return rowClass;
  };
  return (
    <div
      id="eventCard"
      style={{ width: "420px", minHeight: "180px" }}
      tabIndex={0}
      className={cardStyle()}
      onClick={() => handleOnCardClick(event)}
      onKeyDown={(eventAction) => {
        changeReadStatusOfEvent(eventAction, selectedEvent);
      }}
    >
      <div
        id="eventCard"
        className="flex flex-column align-items-start mb-1 mr-3"
      >
        <span id="eventCard" className="font-semibold">
          Дата
        </span>
        <span id="eventCard" className="font-semibold">
          Важность
        </span>
        <span id="eventCard" className="font-semibold">
          Оборудование
        </span>
        <span id="eventCard" className="font-semibold">
          Сообщение
        </span>
      </div>
      <div id="eventCard" className="flex flex-column align-items-start mb-2">
        <span id="eventCard" style={{ minWidth: "150px" }}>
          {event.date}
        </span>
        <span id="eventCard">{event.important}</span>
        <span id="eventCard">
          {event.hardware ? event.hardware : "--------------"}
        </span>
        <span id="eventCard">{event.message ? event.message : " 1"}</span>
      </div>
      <div
        id="eventCard"
        className="flex flex-column align-items-center flex-wrap "
      >
        <img
          id="eventCard"
          style={{ width: `55px` }}
          src={event.avatarSRC}
          alt=""
        />
        <span id="eventCard">{event.responsible}</span>
      </div>
    </div>
  );
};

export default EventCard;
