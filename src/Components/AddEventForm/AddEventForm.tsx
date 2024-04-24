import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ChangeEventHandler } from "react";
import { EventFromAddForm } from "../../Pages/MainPage/MainPage";

const AddEventForm = ({
  changeEvent,
  addEventFormValue,
  addEvent,
}: {
  changeEvent: ChangeEventHandler<HTMLInputElement>;
  addEventFormValue: EventFromAddForm; //>
  addEvent: Function;
}) => {
  return (
    <div className="flex flex-column align-items-center m-5">
      <InputText
        className="m-1"
        name="important"
        value={addEventFormValue.important}
        placeholder="Важность"
        onChange={changeEvent}
      />
      <InputText
        className="m-1"
        name="hardware"
        value={addEventFormValue.hardware}
        placeholder="Оборудование"
        onChange={changeEvent}
      />
      <InputText
        className="m-1"
        name="message"
        value={addEventFormValue.message}
        placeholder="Сообщение"
        onChange={changeEvent}
        required={true}
      />
      <InputText
        className="m-1"
        name="responsible"
        value={addEventFormValue.responsible}
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
