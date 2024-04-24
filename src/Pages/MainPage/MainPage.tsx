import { useEffect, useState } from "react";
import TableEvents from "../../Components/TableEvents/TableEvents";
import CardEvents from "../../Components/CardEvents/CardEvents";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { eventsArray } from "../../fakeAPI/eventsArray";
import AddEventForm from "../../Components/AddEventForm/AddEventForm";
import dayjs from "dayjs";

export type Event = {
  id: number;
  date: string;
  important: string;
  hardware: string;
  message: string;
  responsible: string;
  isRead: boolean;
  avatarSRC: string;
};

export type EventFromAddForm = {
  important: string;
  hardware: string;
  message: string;
  responsible: string;
  avatarSRC: string;
};

const MainPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const selectButtonOptions = ["Таблица", "Карточки"];
  const [dispayType, setDisplayType] = useState(selectButtonOptions[0]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState(eventsArray);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // !!!!!!!!!!!
  //!!!!!!!!!!!!!!!!! Поправить тип setSelectedEvent

  const [addEventFormValue, setAddEventFormValue] = useState({
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    important: "",
    hardware: "",
    message: "",
    responsible: "",
    avatarSRC:
      "https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-504f7687-6241-4430-8041-0854cffda1e9",
  });

  const changeReadStatusOfEvent = (
    eventAction: React.KeyboardEvent<HTMLElement>,
    selectedEvent: Event
  ) => {
    if (selectedEvent && eventAction.code === "Space") {
      const changedEvents = events.map((event: Event) => {
        if (selectedEvent?.id === event?.id) {
          event.isRead = !event.isRead;
        }
        return event;
      });
      setEvents(changedEvents);
    }
    return;
  };

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name: key, value } = e.target;
    const newValue = { ...addEventFormValue, [key]: value };
    setAddEventFormValue(newValue);
  };
  useEffect(() => {
    // Имитируем запрос событий при монтировании
    setEvents(eventsArray);
  }, []);

  useEffect(() => {
    setFilteredEvents(filterEvents());
  }, [events]);

  const filterEvents = () =>
    // функция выполняемая при отправке `поискового запроса`, поиск по всем имеющимся событиям
    events.filter((event) =>
      event.message
        .toLowerCase()
        .includes(searchValue.toLocaleLowerCase().trim())
    );

  const addEvent = () => {
    const newEvent = {
      ...addEventFormValue,
      date: dayjs(new Date()).format("DD.MM.YYYY HH:mm:ss"),
      isRead: false,
      id: events.length + 1,
    };
    setTimeout(() => {
      setEvents((prev) => [...prev, newEvent]);
    }, 800);
  };

  return (
    <>
      <AddEventForm
        changeEvent={changeEvent}
        addEventFormValue={addEventFormValue}
        addEvent={addEvent}
      />
      <SelectButton
        value={dispayType}
        options={selectButtonOptions}
        onChange={(e) => {
          if (e.value !== null) {
            setDisplayType(e.value);
          }
        }}
      />

      <InputText
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Button onClick={() => setFilteredEvents(filterEvents())}>Поиск</Button>

      {dispayType === "Таблица" ? (
        <TableEvents
          events={filteredEvents}
          handleKey={changeReadStatusOfEvent}
          setSelectedEvent={setSelectedEvent}
          selectedEvent={selectedEvent}
        />
      ) : (
        <CardEvents
          events={filteredEvents}
          handleKey={changeReadStatusOfEvent}
          setSelectedEvent={setSelectedEvent}
          selectedEvent={selectedEvent}
        />
      )}
    </>
  );
};

export default MainPage;
