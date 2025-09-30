import { useMutation } from "@tanstack/react-query";
import api from "../service/api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { fetchHeaders } from "../utils/fetch-headers";

export function useDeleteSchedule(id: string) {
    const { mutateAsync } = useMutation({
      mutationFn: async () => {
        await api.delete(`/appointment/${id}`,{
          headers: fetchHeaders(),
        });
      },
      onSuccess: () => {
        toast.success("Agendamento deletado com sucesso!");
        window.location.reload();
      },
      onError(error) {
        console.log("Caiu no onError do useDeleteSchedule", error);
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
          console.log(error);
        }
      },
    });
  
    return {
      deleteSchedule: mutateAsync,
    };
  }
  