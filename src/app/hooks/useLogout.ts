"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import Cookie from "js-cookie";

export function useLogout() {
    const { clearUser } = useUser();
    const router = useRouter();
    const logout = () => {
        clearUser();
        Cookie.remove("sessionToken");
        Cookie.remove("userRole");
        router.push('/login');
    };
    return {
        logout,
    };
}