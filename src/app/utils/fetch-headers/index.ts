import Cookies from "js-cookie";

export const fetchHeaders = () => {
  const token = Cookies.get("sessionToken");
  const header = {
    Authorization: `Bearer ${token}`,
  };

  return header;
};
