import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { isAxiosError } from "axios";
import { Patient } from "@/types";
import { patientService } from "../service/business-service";
  
export function useCreatePatient() {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: async (body : Omit<Patient, 'id'>): Promise<Patient> => {
      const response = await patientService.create(body);
      return response;
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
