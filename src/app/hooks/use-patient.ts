import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/app/service/business-service";
import { Patient } from "@/types";

export function usePatient(patientId: string) {
  const { data, isFetching, refetch } = useQuery<Patient | undefined>({
    queryKey: ["schedules", patientId],
    queryFn: async () => {
      const response = await patientService.findById(patientId);
      return response;
    },
    enabled: !!patientId,
  });

  return {
    patient: data,
    isFetching,
    refetchPatient: refetch,
  };
}
