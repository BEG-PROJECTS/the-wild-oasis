/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from "styled-components";
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal-v1';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm-v1';
import { useCreateCabin } from './useCreateCabin';
import { useDeleteCabin } from './useDeleteCabin';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  padding: 1rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
`
function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isSaving, createCabin } = useCreateCabin();

  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity, regularPrice, discount, image, description
    });
  }
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {
        discount ?
          (<Discount>{formatCurrency(discount)}</Discount>) :
          <span>&mdash;</span>
      }
      <ButtonGroup>
        <Button disabled={isDeleting || isSaving} onClick={handleDuplicateCabin}>
          <HiSquare2Stack />
        </Button>
        <Modal>
          <Modal.Open opens='editCabin'>
            <Button disabled={isDeleting || isSaving}>
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name='editCabin'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens='deleteCabin'>
            <Button disabled={isDeleting || isSaving}>
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name='deleteCabin'>
            <ConfirmDelete resource={cabin} disabled={isDeleting} onConfirm={deleteCabin} />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </Table.Row>
  )
}

CabinRow.propTypes = {
  cabin: PropTypes.object,
}

export default CabinRow
