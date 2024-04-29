import { SelectButton } from "primereact/selectbutton";
import { SELECT_BUTTON_OPTIONS } from "../../constants";

const ToggleEventsDisplayType = ({ displayType, setDisplayType }) => {
  return (
    <SelectButton
      className="mb-3"
      value={displayType}
      options={SELECT_BUTTON_OPTIONS}
      onChange={(e) => {
        if (e.value !== null) {
          setDisplayType(e.value);
        }
      }}
    />
  );
};

export default ToggleEventsDisplayType;
