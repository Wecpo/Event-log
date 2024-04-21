import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TABLE_COLUMNS } from "../../fakeAPI/tableColumns";
import { useState } from "react";

const TableEvents = ({ events, handleKey }) => {
  const rowClassName = (event) => (event.isRead ? "" : `bg-red-100 `);
  const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <DataTable
      value={events}
      stripedRows
      paginator
      rowClassName={rowClassName}
      emptyMessage={"Сообщений не найдено, попробуйте другой поисковой запрос."}
      rows={5}
      selection={selectedEvent}
      onSelectionChange={(event) => {
        setSelectedEvent(event.value);
        eventReadStatusChange(event.value);
      }}
      onKeyDownCapture={(eventAction) => handleKey(eventAction, selectedEvent)}
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
