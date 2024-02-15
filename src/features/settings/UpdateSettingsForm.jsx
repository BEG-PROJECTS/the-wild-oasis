import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestPerBooking, breakfastPrice } = {} } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  if (isLoading) return <Spinner />
  function handleUpdating(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow labelName='Minimum nights/booking' >
        <Input disabled={isUpdating} type='number' id='min-nights' defaultValue={minBookingLength} onBlur={(e) => handleUpdating(e, 'minBookingLength')} />
      </FormRow>
      <FormRow labelName='Maximum nights/booking'>
        <Input disabled={isUpdating} type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={(e) => handleUpdating(e, 'maxBookingLength')} />
      </FormRow>
      <FormRow labelName='Maximum guests/booking'>
        <Input disabled={isUpdating} type='number' id='max-guests' defaultValue={maxGuestPerBooking} onBlur={(e) => handleUpdating(e, 'maxGuestPerBooking')} />
      </FormRow>
      <FormRow labelName='Breakfast price'>
        <Input disabled={isUpdating} type='number' id='breakfast-price' defaultValue={breakfastPrice} onBlur={(e) => handleUpdating(e, 'breakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
