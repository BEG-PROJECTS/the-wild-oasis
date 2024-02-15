import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckOut() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { isLoading: isCheckOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, {
      status: 'checked-out',
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      //INVALIDATE THE CURRENT QUERIES TO RENDER THE DATABASE 
      queryClient.invalidateQueries({
        active: true // SAME FUNCTION AS  queryKey: ['cabins'] 
      });
      // navigate('/');
    },
    onError: (err) => {
      toast.error('There was an error while checking out the guest');
      throw new Error(err);
    }
  });
  return { isCheckOut, checkout }
}