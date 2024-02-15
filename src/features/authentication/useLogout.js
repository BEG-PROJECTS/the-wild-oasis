import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOut as logoutApi } from "../../services/apiAuth";


export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      //NOTE TO REMOVE ALL QUERIES
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    }
  });
  return { logout, isLoading };
}