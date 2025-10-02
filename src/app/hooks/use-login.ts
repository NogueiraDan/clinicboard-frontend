import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError, isAxiosError } from "axios";
import Cookie from "js-cookie";
import { useUser } from "../context/user-context";
import { authService } from "../service/auth-service";
import { LoginRequest } from "@/types";

export function useLogin() {
  const router = useRouter();
  const { setUser } = useUser();

  const handleSuccess = (role: string) => {
    toast.success("Login realizado com sucesso!");
    if (role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const handleError = (error: AxiosError | Error) => {
    toast.error(error.message);
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (body: LoginRequest) => {
      const data = await authService.login(body);
      Cookie.set("sessionToken", data.access_token, { expires: 1 / 12 });
      Cookie.set("userRole", data.role);
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        contact: data.contact,
        role: data.role,
      });
      return data;
    },
    onSuccess: (data) => handleSuccess(data.role),
    onError: handleError,
  });

  return {
    login: mutateAsync,
  };
}
