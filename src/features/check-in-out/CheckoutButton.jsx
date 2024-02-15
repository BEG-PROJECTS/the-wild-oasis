import PropTypes from 'prop-types';
import Button from "../../ui/Button";
import { useCheckOut } from './useCheckout';


function CheckoutButton({ bookingId }) {
  const { checkout, isLoadingState } = useCheckOut();

  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isLoadingState}>
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number
}

export default CheckoutButton;
