/* eslint-disable no-unused-vars */

import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from "./CabinRow-v1";
import { useCabins } from "./useCabins";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return (<Spinner />);
  if (error) throw new Error(error.message);
  if (!cabins.length) return <Empty resourceName='cabins' />;
  //FILTER OPTIONS
  const filterValue = searchParams.get('discount');
  let filteredCabins;
  switch (filterValue) {
    case 'all':
      filteredCabins = cabins;
      break;
    case 'no-discount':
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case 'with-discount':
      filteredCabins = cabins.filter((cabin) => cabin.discount >= 0);
      break;
    default:
      filteredCabins = cabins;
  }

  //SORT OPTIONS
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  //CREATE A MODIFIER TO TRICK THE SORT ASC OR DEC
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);



  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 2fr'>
        <Table.Header>
          <div></div>
          <div>CABIN</div>
          <div>CAPACITY</div>
          <div>PRICE</div>
          <div>DISCOUNT</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => (<CabinRow cabin={cabin} key={cabin.id} />)} />
      </Table>
    </Menus>
  )
}

export default CabinTable
