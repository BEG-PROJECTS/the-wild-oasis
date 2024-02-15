import PropTypes from 'prop-types';
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const totalAvailable = numCabins * numDays;
  //NOTE 1- BOOKINGS STATS
  const numBookings = bookings.length;
  //NOTES 2- TOTAL SALES
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //NOTES 3- CHECKINS
  const checkins = confirmedStays.length;
  //NOTES 4- OCUPANCY RATES
  const confirmed = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0);
  const ocupation = confirmed / totalAvailable;

  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings.toString()} />
      <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title='Check Ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkins.toString()} />
      <Stat title='Ocupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={`${Math.round(ocupation * 100).toString()} %`} />
    </>
  );

}

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
  numDays: PropTypes.number,
  numCabins: PropTypes.number
}



export default Stats

