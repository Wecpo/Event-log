import { DataView } from "primereact/dataview";
import { useState } from "react";

const CardEvents = ({ events, handleKey }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const cardStyle = (event) => {
    const mainStyle = `flex flex-row justify-content-center border-solid p-2 m-3 cursor-pointer hover:border-primary `;
    const unreadStyle = ` bg-red-100 `;
    const selectedItemStyle = mainStyle + "border-primary";
    if (event.isRead) {
      return mainStyle;
    }
    if (event === selectedEvent && !event.isRead) {
      return mainStyle + selectedItemStyle + unreadStyle;
    }
    if (!event.isRead) return mainStyle + unreadStyle;
  };

  const gridItem = (event, index) => {
    return (
      <div
        key={index}
        style={{ width: "420px" }}
        tabIndex={0}
        className={cardStyle(event)}
        onClick={() => handleClick(event)}
        onKeyDown={(eventAction) => {
          handleKey(eventAction, selectedEvent);
        }}
      >
        <div className="flex flex-column align-items-start mb-1 mr-3">
          <span className="font-semibold">Дата</span>
          <span className="font-semibold">Важность</span>
          <span className="font-semibold">Оборудование</span>
          <span className="font-semibold">Сообщение</span>
        </div>
        <div className="flex flex-column align-items-start mb-2">
          <span style={{ minWidth: "150px" }}>{event.date}</span>
          <span>{event.important}</span>
          <span>{event.hardware ? event.hardware : "--------------"}</span>
          <span>{event.message ? event.message : " 1"}</span>
        </div>
        <div className="flex flex-column align-items-center flex-wrap ">
          <img style={{ width: `55px` }} src={event.avatarSRC} alt="" />
          <span>{event.responsible}</span>
        </div>
      </div>
    );
  };

  const itemTemplate = (event, index) => {
    if (!event) {
      return;
    }
    return gridItem(event, index);
  };

  const listTemplate = (events) => {
    return (
      <div className="grid">
        {events.map((event, index) => itemTemplate(event, index))}
      </div>
    );
  };

  const handleClick = (event) => {
    if (event) setSelectedEvent(event);
    else setSelectedEvent(null);
  };

  return (
    <DataView value={events} paginator rows={12} listTemplate={listTemplate} />
  );
};

export default CardEvents;
