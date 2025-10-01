import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { isAxiosError } from "axios";
import { User } from "@/types";
import { authService } from "../service/auth-service";

export function useRegister() {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: async (body : Omit<User, "id" | "role">): Promise<User> => {
      const response = await authService.register(body);
      return response;
    },
    onSuccess: () => {
      toast.success("Registro completo com sucesso!");
      router.push('/dashboard');
    },
    onError(error) {
      console.log("Caiu no onError do useRegister", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    },
  });

  return {
    register: mutateAsync,
  };
}
