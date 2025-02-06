import { Applicant } from "../utils/consts";

export const hasToken = (): boolean => {
    return !!localStorage.getItem("token");
  };

  export const getUserType = (userdata: Applicant): string | null => {
    return userdata?.me?.userType || localStorage.getItem("userType") || null;
  };