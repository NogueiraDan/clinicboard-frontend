import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { Appointment } from "@/types";
import { appointmentService } from "@/app/service/business-service";

export function useCreateAppointment() {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: async (body: Omit<Appointment, "id">): Promise<Appointment> => {
      const response = await appointmentService.create(body);
      return response;
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
    createAppointment: mutateAsync,
  };
}
