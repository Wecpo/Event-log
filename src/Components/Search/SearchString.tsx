import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Event } from "../../types";

const SearchString = ({
  allEvents,
  setFilteredEvents,
}: {
  allEvents: Event[];
  setFilteredEvents: any; /////////////////////////////////!!!!!!!!!!!!!!
}) => {
  const [searchStringValue, setSearchStringValue] = useState<string>("");
  const filterEvents = () =>
    // функция выполняемая при отправке `поискового запроса`, поиск по всем имеющимся событиям
    allEvents.filter((event: Event) =>
      event.message
        .toLowerCase()
        .includes(searchStringValue.toLocaleLowerCase().trim())
    );

  return (
    <div className="mb-5">
      <InputText
        value={searchStringValue}
        onChange={(e) => setSearchStringValue(e.target.value)}
      />

      <Button onClick={() => setFilteredEvents(filterEvents())}>Поиск</Button>
    </div>
  );
};

export default SearchString;
