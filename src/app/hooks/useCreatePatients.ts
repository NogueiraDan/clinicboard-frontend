import { useMutation } from "@tanstack/react-query";
import api from "@/app/service/api";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { isAxiosError } from "axios";
import { PatientRequest, PatientResponse } from "../(pages)/dashboard/types";

export function useCreatePatient() {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: async (body : PatientRequest): Promise<PatientResponse> => {
      const response = await api.post(`/patient`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Paciente cadastrado com sucesso!");
      router.push('/dashboard');
    },
    onError(error) {
      console.log("Caiu no onError do useCreatePatient", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    },
  });

  return {
    createPatient: mutateAsync,
  };
}
