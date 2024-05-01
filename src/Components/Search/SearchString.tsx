import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Event } from "../../types";

type SearchStringProps = {
  allEvents: Event[];
  setFilteredEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};

const SearchString = ({ allEvents, setFilteredEvents }: SearchStringProps) => {
  const [searchStringValue, setSearchStringValue] = useState<string>("");
  const filterEvents = () =>
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
