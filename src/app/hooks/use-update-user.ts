import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useUser } from "../context/user-context";
import { User } from "@/types";
import { userService } from "@/app/service/user-service";

export function useUpdateUser() {
  const { setUser, user } = useUser();

  const handleSuccess = (data: User) => {
    toast.success("Usuário atualizado com sucesso!");
    setUser(data);
    window.location.reload();
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (data: User): Promise<User> => {
      const response = await userService.update(data, user?.id || "");
      return response;
    },
    onSuccess: (data) => handleSuccess(data),
    onError(error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error);
      }
    },
  });

  return {
    updateUser: mutateAsync,
  };
}
