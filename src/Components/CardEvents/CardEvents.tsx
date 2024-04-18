import { DataView } from "primereact/dataview";
import styles from "./CardEvents.module.scss";

const CardEvents = ({ events }) => {
  const gridItem = (event, index) => {
    return (
      <div key={index} className={styles.card}>
        <div className={styles.columns}>
          <span>Дата</span>
          <span>Важность</span>
          <span>Оборудование</span>
          <span>Сообщение</span>
        </div>
        <div className={styles.info}>
          <span>{event.date}</span>
          <span>{event.important}</span>
          <span>{event.hardware}</span>
          <span>{event.message}</span>
        </div>
        <div>
          <img
            style={{ width: `65px` }}
            src="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-504f7687-6241-4430-8041-0854cffda1e9"
            alt="Аватарка пользователя"
          />
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
      <div className={styles.gridWrapper}>
        {events.map((event, index) => itemTemplate(event, index))}
      </div>
    );
  };

  return (
    <DataView value={events} paginator rows={6} listTemplate={listTemplate} />
  );
};

export default CardEvents;
