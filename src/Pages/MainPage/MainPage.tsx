import { useEffect, useState } from "react";
import TableEvents from "../../Components/TableEvents/TableEvents";
import CardEvents from "../../Components/CardEvents/CardEvents";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { eventsArray } from "../../fakeAPI/eventsArray";
import AddEventForm from "../../Components/AddEventForm/AddEventForm";
import dayjs from "dayjs";

const MainPage = () => {
  const [events, setEvents] = useState([]);
  const selectButtonOptions = ["Таблица", "Карточки"];
  const [dispayType, setDisplayType] = useState(selectButtonOptions[0]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsArray);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [inputValue, setInputValue] = useState({
    important: "",
    hardware: "",
    message: "",
    responsible: "",
  });

  const changeReadStatusOfEvent = (eventAction, selectedEvent) => {
    if (selectedEvent && eventAction.code === "Space") {
      const changedEvents = events.map((event) => {
        if (selectedEvent?.id === event?.id) {
          event.isRead = !event.isRead;
        }
        return event;
      });
      setEvents(changedEvents);
    }
    return;
  };

  const changeEvent = (e) => {
    const { name: key, value } = e.target;
    const newValue = { ...inputValue, [key]: value };
    setInputValue(newValue);
  };
  console.log();

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
      ...inputValue,
      date: dayjs(new Date()).format("DD.MM.YYYY HH:mm:ss"),
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
        inputValue={inputValue}
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
