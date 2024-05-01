import { SelectButton } from "primereact/selectbutton";
import { SELECT_BUTTON_OPTIONS } from "../../constants";

type ToggleEventsDisplayTypeProps = {
  displayType: string;
  setDisplayType: React.Dispatch<React.SetStateAction<string>>;
};

const ToggleEventsDisplayType = ({
  displayType,
  setDisplayType,
}: ToggleEventsDisplayTypeProps) => {
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
