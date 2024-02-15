import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField='discount' options={[
        {
          name: 'All',
          value: 'all'
        },
        {
          name: 'No discount',
          value: 'no-discount'
        },
        {
          name: 'With discount',
          value: 'with-discount'
        },
      ]} />
      <SortBy options={[
        {
          name: 'Sort by name (A-Z)',
          value: 'name-asc'
        },
        {
          name: 'Sort by name (Z-A)',
          value: 'name-desc'
        },
        {
          name: 'Sort by price (low first)',
          value: 'regularPrice-asc'
        },
        {
          name: 'Sort by price (high first)',
          value: 'regularPrice-desc'
        },
        {
          name: 'Sort by capacity (low first)',
          value: 'maxCapacity-asc'
        },
        {
          name: 'Sort by capacity (high first)',
          value: 'maxCapacity-desc'
        }
      ]} />
    </TableOperations>
  )
}

export default CabinTableOperations
