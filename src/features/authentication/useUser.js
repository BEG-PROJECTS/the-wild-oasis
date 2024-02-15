import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
}