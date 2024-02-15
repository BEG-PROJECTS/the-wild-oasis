import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ password, fullName, avatar }) => updateUserApi({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      //NOTE MANUALLLY UPATE THE CACHE
      queryClient.setQueryData(['user'], user); //NOTE HAVE SOME ISSUES
      //NOTE TO UPDATE THE DATA ON CACHE WE NEED TO USE THE INVALIDATEQUERIES
      //queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => toast.error(err.message)
  });
  return { updateUser, isUpdating };
}