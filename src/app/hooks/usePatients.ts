"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/app/context/UserContext";
import api from "@/app/service/api";
import { fetchHeaders } from "@/app/utils/fetch-headers";

export function usePatients() {
  const { user } = useUser();

  const { data, isFetching } = useQuery({
    queryKey: ["schedules", user?.id],
    queryFn: async () => {
      const response = await api.get(`/patient/professional/${user?.id}`, {
        headers: fetchHeaders(),
      });
      return response.data;
    },
  });

  return {
    patients: data ?? [],
    isFetching,
  };
}
