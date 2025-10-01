"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/app/context/UserContext";
import { patientService } from "@/app/service/business-service";

export function usePatients() {
  const { user } = useUser();

  const { data, isFetching } = useQuery({
    queryKey: ["schedules", user?.id],
    queryFn: async () => {
      const response = await patientService.findAll();
      return response;
    },
  });

  return {
    patients: data ?? [],
    isFetching,
  };
}
