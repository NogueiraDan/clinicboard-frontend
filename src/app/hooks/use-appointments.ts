import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/user-context";
import { formatDate } from "../utils/format-date";
import { appointmentService } from "@/app/service/business-service";
import { Appointment } from "@/types";

export function useAppointments(date: Date | undefined) {
  const { user } = useUser();

  const { data, isFetching, refetch } = useQuery<Appointment[] | undefined>({
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
