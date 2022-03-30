import { useCallback } from "react";
import axios from "axios";

const useAPI = () => {
  const makeAPICall = useCallback(async (url, config) => {
    try {
      return (await axios(url, config)).data;
    } catch (error) {
      return { success: false, data: null, error: "Something went Wrong" };
    }
  }, []);

  const login = useCallback(
    async (username, password) => {
      return await makeAPICall("/api/users/login", {
        method: "post",
        data: {
          username,
          password,
        },
      });
    },
    [makeAPICall]
  );

  const logout = useCallback(async () => {
    return await makeAPICall("/api/users/logout", {
      method: "get",
    });
  }, [makeAPICall]);

  const register = useCallback(
    async (username, password) => {
      return await makeAPICall("/api/users/register", {
        method: "put",
        data: {
          username,
          password,
        },
      });
    },
    [makeAPICall]
  );

  const verify = useCallback(async () => {
    return await makeAPICall("/api/users/verify", {
      method: "get",
    });
  }, [makeAPICall]);
  return { login, logout, register, verify };
};

export default useAPI;
