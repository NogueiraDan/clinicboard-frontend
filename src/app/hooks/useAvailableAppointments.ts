import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import { formatDate } from "../utils/format-date";
import { appointmentService } from "@/app/service/business-service";

export function useAvailableAppointments(date: Date | undefined) {
  const { user } = useUser();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["appointments", date, user?.id],
    queryFn: async () => {
      const response = await appointmentService.findByDate(
        user?.id,
        formatDate(date)
      );
      return response;
    },
    enabled: !!date,
  });

  return {
    appointments: data ?? [],
    isFetching,
    refetchAppointments: refetch,
  };
}
