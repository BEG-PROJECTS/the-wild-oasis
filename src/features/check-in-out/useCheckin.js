import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isCheckinIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
      status: 'checked-in',
      isPaid: true,
      ...breakfast
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      //INVALIDATE THE CURRENT QUERIES TO RENDER THE DATABASE 
      queryClient.invalidateQueries({
        active: true // SAME FUNCTION AS  queryKey: ['cabins'] 
      });
      navigate('/');
    },
    onError: (err) => {
      toast.error('There was an error while checking in the guest');
      throw new Error(err);
    }
  });
  return { isCheckinIn, checkin }
}