import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TABLE_COLUMNS } from "../../constants";
import { Event } from "../../types";

const TableEvents = ({
  allEvents,
  changeReadStatusOfEvent,
  selectedEvent,
  setSelectedEvent,
}: {
  allEvents: Event[];
  changeReadStatusOfEvent: Function;
  selectedEvent: Event;
  setSelectedEvent: Function;
}) => {
  // const rowClassName = (event: Event): string | undefined => {
  //   if (event === selectedEvent && event.isRead) {
  //     return "border-primary hover:bg-blue-100 ";
  //   }

  //   if (event === selectedEvent && !event.isRead) {
  //     return "border-primary bg-red-300 hover:bg-blue-100 ";
  //   }

  //   if (!event.isRead) return `bg-red-100 hover:bg-blue-100 `;
  // };
  return (
    <DataTable
      value={allEvents}
      paginator
      emptyMessage={"Сообщений не найдено, попробуйте другой поисковой запрос."}
      rows={5}
      onRowSelect={(event) => {
        if (event.data === selectedEvent) {
          return setSelectedEvent(null);
        }
        setSelectedEvent(event.data);
        changeReadStatusOfEvent(event.data);
      }}
      onKeyDown={(eventAction) =>
        changeReadStatusOfEvent(eventAction, selectedEvent)
      }
      stripedRows={true}
      globalFilterFields={["message"]}
      showGridlines={true}
      selectionMode="single"
      tableStyle={{ minWidth: "50rem" }}
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
