import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { appointmentService } from "@/app/service/business-service";

export function useDeleteAppointment(id: string) {
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await appointmentService.delete(id);
    },
    onSuccess: () => {
      toast.success("Agendamento deletado com sucesso!");
      window.location.reload();
    },
    onError(error) {
      console.log("Caiu no onError do useDeleteAppointment", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    },
  });

  return {
    deleteAppointment: mutateAsync,
  };
}
