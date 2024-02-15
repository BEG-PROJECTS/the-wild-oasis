import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", name: "All" },
          { value: "checked-out", name: "Checked out" },
          { value: "checked-in", name: "Checked in" },
          { value: "unconfirmed", name: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", name: "Sort by date (recent first)" },
          { value: "startDate-asc", name: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            name: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", name: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
