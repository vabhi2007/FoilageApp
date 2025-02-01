export const hasToken = (): boolean => {
    return !!localStorage.getItem("token");
  };

  export const getUserType = (userdata: any): string | null => {
    return userdata?.me?.userType || localStorage.getItem("userType") || null;
  };