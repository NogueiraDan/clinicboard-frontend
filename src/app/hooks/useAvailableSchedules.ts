import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import api from "../service/api";
import { formatDate } from "../utils/format-date";
import { fetchHeaders } from "../utils/fetch-headers";

export function useAvailableSchedules(date: Date | undefined) {
  const { user } = useUser();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["schedules", date, user?.id],
    queryFn: async () => {
      const response = await api.get(
        `/appointment/available-times?id=${
          user?.id
        }&date=${formatDate(date)}`,
        { headers: fetchHeaders() }
      );
      return response.data;
    },
    enabled: !!date,
  });

  return {
    schedules: data ?? [],
    isFetching,
    refetchSchedules: refetch,
  };
}
