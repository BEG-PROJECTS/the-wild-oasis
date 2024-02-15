import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading, data: cabins, error } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
    onError: (err) => toast.error(err)
  });
  return { isLoading, cabins, error }
}