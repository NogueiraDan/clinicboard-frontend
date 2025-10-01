import api from "./api";
import { API_ENDPOINTS } from "../constants/endpoints";
import { User } from "@/types";

export const userService = {
  update: async (user: User, id: string): Promise<User> => {
    const { data } = await api.patch<User>(
      API_ENDPOINTS.USER_SERVICE.UPDATE_USER(id),
      user
    );
    return data;
  },
};
