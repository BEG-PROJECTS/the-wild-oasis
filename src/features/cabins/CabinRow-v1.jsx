/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from "styled-components";
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal-v1';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm-v1';
import { useCreateCabin } from './useCreateCabin';
import { useDeleteCabin } from './useDeleteCabin';

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
          (<span>&mdash;</span>)
      }
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicateCabin}>
                Duplicate
              </Menus.Button>
              <Modal.Open opens='editCabin'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens='deleteCabin'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name='editCabin'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window name='deleteCabin'>
              <ConfirmDelete resource={cabin} disabled={isDeleting} onConfirm={deleteCabin} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}

CabinRow.propTypes = {
  cabin: PropTypes.object,
}

export default CabinRow
