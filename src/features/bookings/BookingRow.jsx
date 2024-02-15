/* eslint-disable no-unused-vars */
import { format, isToday } from "date-fns";
import styled from "styled-components";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import PropTypes from 'prop-types';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal-v1";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useDeleteBooking } from './useDeleteBooking';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;
  const { isCheckOut, checkout } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>
        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>
        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        <Amount>{formatCurrency(totalPrice)}</Amount>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            {status === 'unconfirmed' &&
              (
                <>
                  <Menus.Button
                    icon={<HiArrowDownOnSquare />}
                    onClick={() => navigate(`/checkin/${bookingId}`)}
                  >
                    Check in
                  </Menus.Button>
                  <Modal.Open opens='deleteBooking'>
                    <Menus.Button
                      icon={<HiTrash />}
                    >
                      Delete
                    </Menus.Button>
                  </Modal.Open>
                </>
              )
            }
            {
              status === 'checked-in' &&
              (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkout(bookingId)}
                  disable={isCheckOut}
                >
                  Check out
                </Menus.Button>
              )
            }
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name='deleteBooking'>
          <ConfirmDelete resource={booking} onConfirm={() => deleteBooking(bookingId)} disabled={isDeleting} />
        </Modal.Window>
      </Modal >
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.object,
}

export default BookingRow;