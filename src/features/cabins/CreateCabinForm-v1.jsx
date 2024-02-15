/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from '../../ui/FileInput';
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from '../../ui/Textarea';
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { isSaving, createCabin } = useCreateCabin();
  const { isupdating, updateCabin } = useUpdateCabin();

  const isWorking = isSaving || isupdating;
  function handleOnSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (data.discount === '') data.discount = 0;
    if (isEditSession) {
      updateCabin({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        }
      });
    }
    else {
      createCabin({ ...data, image }, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        }
      });
    }
  }

  function onError(errors) {
    console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow labelName='Cabin Name' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register('name', {
          required: 'This field is required',
        })} />
      </FormRow>

      <FormRow labelName='Maximun capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity must be greather than 0'
          }
        })} />
      </FormRow>

      <FormRow labelName='Regular price' error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" disabled={isWorking} {...register('regularPrice', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'The price must be greather than 0'
          }
        })} />
      </FormRow>

      <FormRow labelName='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register('discount', {
          // required: 'This field is required',
          validate: (value) => Number(getValues().regularPrice) > Number(value) || 'The discount must be less than the regular price'
        })} />
      </FormRow>

      <FormRow labelName='Description for website' error={errors?.description?.message}>
        <Textarea type="text" id="description" defaultValue="" disabled={isWorking} {...register('description', { required: 'This field is required' })} />
      </FormRow>

      <FormRow labelName='Cabin photo' error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" disabled={isWorking} {...register('image', {
          required: isEditSession ? false : 'This field is required'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCloseModal?.()} $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {
            isEditSession ?
              isWorking ?
                'Editing cabin...' : 'Edit cabin' :
              isWorking ? 'Creating cabin ...' : 'Create new cabin'
          }
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  onCloseModal: PropTypes.func,
  cabinToEdit: PropTypes.object
}

export default CreateCabinForm;
