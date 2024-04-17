import { Column } from "primereact/column";
import { messagesArray } from "../../fakeAPI/eventsArray";
import { DataTable } from "primereact/datatable";
import { TABLE_COLUMNS } from "../../fakeAPI/tableColumns";

const TableEvents = ({ events }) => {
  return (
    <DataTable
      value={events}
      stripedRows
      headerColumnGroup={false}
      paginator
      emptyMessage={"Сообщений не найдено, попробуйте другой поисковой запрос."}
      rows={28}
      globalFilterFields={["message"]}
      showGridlines
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
