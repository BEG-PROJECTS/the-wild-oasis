/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ onCloseModal, resource, onConfirm, disabled }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resource.name}</Heading>
      <p>
        Are you sure you want to delete this {resource.name} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button $variation="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={() => onConfirm(resource.id)}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

ConfirmDelete.propTypes = {
  resource: PropTypes.object,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func
}

export default ConfirmDelete;
