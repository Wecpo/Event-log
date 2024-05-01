import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TABLE_COLUMNS } from "../../constants";
import { Event } from "../../types";
import { useEffect } from "react";

type TableEventsProps = {
  allEvents: Event[];
  changeReadStatusOfEvent: (
    eventAction: React.KeyboardEvent<HTMLDivElement>,
    selectedEvent: Event | null
  ) => void;
  selectedEvent: Event | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
};

const TableEvents = ({
  allEvents,
  changeReadStatusOfEvent,
  selectedEvent,
  setSelectedEvent,
}: TableEventsProps) => {
  useEffect(() => {
    const handleMouseOutOfRowsClick = (): void => {
      const target = event?.target as HTMLElement;
      if (!target.matches("td")) {
        setSelectedEvent(null);
      }
    };

    document.addEventListener("click", handleMouseOutOfRowsClick);

    return () =>
      document.removeEventListener("click", handleMouseOutOfRowsClick);
  }, []);

  const rowClassName = (event: Event): string | undefined => {
    let rowClass = "hover:text-primary-700 ";
    if (event === selectedEvent && !event.isRead) {
      rowClass += "underline bg-gray-300 ";
    }
    if (event === selectedEvent && event.isRead) {
      rowClass += "underline ";
    }
    if (!event.isRead) {
      rowClass += "bg-gray-300";
    }
    return rowClass;
  };

  return (
    <DataTable
      value={allEvents}
      paginator
      rowClassName={rowClassName}
      emptyMessage={"Сообщений не найдено, попробуйте другой поисковой запрос."}
      rows={5}
      onRowClick={(event) => {
        const currentEvent = event.data as Event;
        setSelectedEvent(currentEvent);
      }}
      onKeyDown={(eventAction) =>
        changeReadStatusOfEvent(eventAction, selectedEvent)
      }
      stripedRows={true}
      globalFilterFields={["message"]}
      showGridlines={true}
      selectionMode="single"
      tableStyle={{ minWidth: "1200px" }}
    >
      {TABLE_COLUMNS.map((column) => (
        <Column
          key={column.field}
          sortable
          field={column.field}
          header={column.header}
        />
      ))}
    </DataTable>
  );
};

export default TableEvents;
