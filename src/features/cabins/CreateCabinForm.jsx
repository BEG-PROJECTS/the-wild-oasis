/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from '../../ui/FileInput';
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from '../../ui/Textarea';

function CreateCabinForm({ showForm, cabinId = '' }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
  const { isLoading: isSaving, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
      showForm((show) => !show);
    },
    onError: (err) => toast.error(err.message)
  })

  function handleOnSubmit(data) {
    mutate({ ...data, image: data.image[0] });
    // console.log(data);
  }

  function onError(errors) {
    console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit, onError)}>
      <FormRow labelName='Cabin Name' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isSaving} {...register('name', {
          required: 'This field is required',
        })} />
      </FormRow>

      <FormRow labelName='Maximun capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isSaving} {...register('maxCapacity', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity must be greather than 0'
          }
        })} />
      </FormRow>

      <FormRow labelName='Regular price' error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" disabled={isSaving} {...register('regularPrice', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'The price must be greather than 0'
          }
        })} />
      </FormRow>

      <FormRow labelName='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isSaving} {...register('discount', {
          required: 'This field is required',
          validate: (value) => Number(getValues().regularPrice) > Number(value) || 'The discount must be less than the regular price'
        })} />
      </FormRow>

      <FormRow labelName='Description for website' error={errors?.description?.message}>
        <Textarea type="text" id="description" defaultValue="" disabled={isSaving} {...register('description', { required: 'This field is required' })} />
      </FormRow>

      <FormRow labelName='Cabin photo' error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" disabled={isSaving} {...register('image', {
          required: 'This field is required'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSaving}>{isSaving ? 'Creating cabin ...' : 'Add cabin'}</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  showForm: PropTypes.func,
  cabinId: PropTypes.object
}

export default CreateCabinForm;
