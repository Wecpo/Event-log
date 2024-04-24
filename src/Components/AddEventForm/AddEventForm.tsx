import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Event } from "../../Pages/MainPage/MainPage";
import { ChangeEventHandler } from "react";

const AddEventForm = ({
  changeEvent,
  inputValue,
  addEvent,
}: {
  changeEvent: ChangeEventHandler<HTMLInputElement>;
  inputValue: Event;
  addEvent: Function;
}) => {
  return (
    <div className="flex flex-column align-items-center m-5">
      <InputText
        className="m-1"
        name="important"
        value={inputValue.important}
        placeholder="Важность"
        onChange={changeEvent}
      />
      <InputText
        className="m-1"
        name="hardware"
        value={inputValue.hardware}
        placeholder="Оборудование"
        onChange={changeEvent}
      />
      <InputText
        className="m-1"
        name="message"
        value={inputValue.message}
        placeholder="Сообщение"
        onChange={changeEvent}
        required={true}
      />
      <InputText
        className="m-1"
        name="responsible"
        value={inputValue.responsible}
        placeholder="Ответственный"
        onChange={changeEvent}
      />

      <Button className="m-1" onClick={(e) => addEvent(e)}>
        Добавить событие
      </Button>
    </div>
  );
};

export default AddEventForm;
