import { useEffect, useState } from "react";
import TableEvents from "../../Components/TableEvents/TableEvents";
import CardEvents from "../../Components/CardEvents/CardEvents";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { eventsArray } from "../../fakeAPI/eventsArray";

const MainPage = () => {
  const [events, setEvents] = useState([]);
  const selectButtonOptions = ["Таблица", "Карточки"];
  const [dispayType, setDisplayType] = useState(selectButtonOptions[0]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsArray);

  useEffect(() => {
    // Имитируем запрос событий при монтировании
    setEvents(eventsArray);
  }, []);

  const filterEvents = () =>
    // функция выполняемая при отправке поискового запроса, поиск по всем имеющимся событиям
    events.filter((event) =>
      event.message
        .toLowerCase()
        .includes(searchValue.toLocaleLowerCase().trim())
    );

  return (
    <>
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
        <TableEvents events={filteredEvents} />
      ) : (
        <CardEvents events={filteredEvents} />
      )}
    </>
  );
};

export default MainPage;