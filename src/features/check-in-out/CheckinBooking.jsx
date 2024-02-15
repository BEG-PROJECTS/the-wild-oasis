/* eslint-disable no-unused-vars */
import styled from "styled-components";

import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import BookingDataBox from "../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConmfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading, booking = {} } = useBooking();
  const moveBack = useMoveBack();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const { checkin, isCheckinIn } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  //TO CONFIMR IF ISPAID BY DEFAULT OR NOT FOR THE INFORMATION THAT COMMING FROM THE DATABASE
  //CREATE AN EFFECT WHEN THE VARIABLE IS AVAILABLE
  useEffect(function () {
    setConmfirmPaid(booking?.isPaid ?? false);
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking.isPaid, booking.hasBreakfast]);

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast:
        {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }

  }
  if (isLoading || isLoadingSettings) return <Spinner />
  const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {/* ADDING THE CHECKBOX TO IMPLEMENT THE FEATURE TO CONFIRM THE PAYMENT */}
      {!hasBreakfast &&
        (<Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !addBreakfast);
              setConmfirmPaid(false);
            }}
            id='breakfast'
          // disabled={addBreakfast || isCheckinIn}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </Checkbox>
        </Box>)}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConmfirmPaid((confirm) => !confirm)}
          id='confirm'
          disabled={confirmPaid || isCheckinIn}
        >
          I confirm that {guests.fullName} has paid the total amount of
          {
            addBreakfast ? `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})` : formatCurrency(totalPrice)
          }
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckinIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
