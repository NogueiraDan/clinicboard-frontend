import { useMutation } from "@tanstack/react-query";
import api from "@/app/service/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { ScheduleRequest, ScheduleResponse } from "../(pages)/dashboard/types";
import { fetchHeaders } from "../utils/fetch-headers";

export function useCreateSchedule() {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: async (body: ScheduleRequest): Promise<ScheduleResponse> => {
      const response = await api.post(`/appointment`, body, {
        headers: fetchHeaders(),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Agendamento criado com sucesso!");
      router.push("/dashboard");
    },
    onError(error) {
      console.log("Caiu no onError do useCreatePatient", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
        console.log(error);
      }
    },
  });

  return {
    createSchedule: mutateAsync,
  };
}
