import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import dayjs from "dayjs";
import { Dropdown } from "primereact/dropdown";
import { EVENT_IMPORTANT_TYPE } from "../../constants";
import { Event } from "../../types";

const addEventFormInitialState = {
  hardware: "",
  message: "",
  responsible: "",
  avatarSRC:
    "https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-504f7687-6241-4430-8041-0854cffda1e9",
};

type AddEventFormProps = {
  setAllEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  allEvents: Event[];
};

const AddEventForm = ({ setAllEvents, allEvents }: AddEventFormProps) => {
  const [addEventFormValue, setAddEventFormValue] = useState(
    addEventFormInitialState
  );

  const [selectedImportantOfNewEvent, setSelectedImportantOfNewEvent] =
    useState(EVENT_IMPORTANT_TYPE[1]);

  const changeEventForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name: key, value } = e.target;
    const newValue = { ...addEventFormValue, [key]: value };
    setAddEventFormValue(newValue);
  };

  const addEvent = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newEvent = {
      ...addEventFormValue,
      important: selectedImportantOfNewEvent.name,
      date: dayjs(new Date()).format("DD.MM.YYYY HH:mm:ss"),
      isRead: false,
      id: allEvents.length + 1,
    };
    setTimeout(() => {
      setAllEvents((prev) => [...prev, newEvent]);
    }, 800);
    setAddEventFormValue(addEventFormInitialState);
  };

  return (
    <form
      className="flex flex-column align-items-center m-7"
      onSubmit={addEvent}
    >
      <Dropdown
        value={selectedImportantOfNewEvent}
        options={EVENT_IMPORTANT_TYPE}
        optionLabel="name"
        placeholder="Важность"
        onChange={(e) => setSelectedImportantOfNewEvent(e.value)}
      />
      <InputText
        className="m-1"
        name="hardware"
        value={addEventFormValue.hardware}
        placeholder="Оборудование"
        onChange={changeEventForm}
      />
      <InputText
        className="m-1"
        name="message"
        required
        value={addEventFormValue.message}
        placeholder="Сообщение"
        onChange={changeEventForm}
      />
      <InputText
        className="m-1"
        required
        name="responsible"
        value={addEventFormValue.responsible}
        placeholder="Ответственный"
        onChange={changeEventForm}
      />

      <Button className="m-2" type="submit">
        Добавить событие
      </Button>
    </form>
  );
};

export default AddEventForm;
