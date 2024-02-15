import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    onError: (err) => toast.error(err)
  });
  return { isLoading, settings };
}