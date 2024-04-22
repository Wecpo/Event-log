import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TABLE_COLUMNS } from "../../fakeAPI/tableColumns";
import { useEffect } from "react";

const TableEvents = ({
  events,
  handleKey,
  selectedEvent,
  setSelectedEvent,
}) => {
  const rowClassName = (event) => {
    if (event === selectedEvent && event.isRead) return "  surface-300";

    if (event === selectedEvent && !event.isRead) {
      return " bg-red-300 ";
    }
    if (!event.isRead) return `bg-red-100 `;
  };
  return (
    <DataTable
      value={events}
      stripedRows
      paginator
      rowClassName={rowClassName}
      emptyMessage={"Сообщений не найдено, попробуйте другой поисковой запрос."}
      rows={5}
      onRowSelect={(event) => {
        if (event.data === selectedEvent) {
          return setSelectedEvent(null);
        }
        setSelectedEvent(event.data);
        handleKey(event.data);
      }}
      onKeyDown={(eventAction) => handleKey(eventAction, selectedEvent)}
      globalFilterFields={["message"]}
      showGridlines={true}
      selectionMode="single"
      rowHover={true}
      tableStyle={{ minWidth: "50rem", minHeight: "25rem" }}
    >
      {TABLE_COLUMNS.map((event) => (
        <Column key={event.field} field={event.field} header={event.header} />
      ))}
    </DataTable>
  );
};

export default TableEvents;
