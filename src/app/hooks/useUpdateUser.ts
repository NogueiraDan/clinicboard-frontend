import { useMutation } from "@tanstack/react-query";
import api from "@/app/service/api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useUser } from "../context/UserContext";
import { UserUpdateRequest, UserUpdateResponse } from "../(pages)/dashboard/types";

export function useUpdateUser() {
  const { setUser, user } = useUser();

  const handleSuccess = (data: UserUpdateResponse) => {
    toast.success("Usuário atualizado com sucesso!");
    setUser(data);
    window.location.reload();
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (data: UserUpdateRequest) => {
      const response = await api.patch(`/users/${user?.id}`, data);
      return response.data;
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
