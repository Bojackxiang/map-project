import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../support/config";

const useCheckRole = () => {
  const [isAdmin, setIsAdmin] = useState({
    isAdmin: false,
    message: "",
    loading: true,
    data: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const authCheckResult = await axios.post(
          `${config.api_url}/api/admin_only`,
          {
            sessionToken: localStorage.getItem(
              process.env.REACT_APP_SESSION_NAME as string
            ),
          }
        );
        
        const { message, code, payload } = authCheckResult.data;

        setIsAdmin({
          isAdmin: code === 200 ? true : false,
          message,
          loading: false,
          data: payload.data,
        });
      } catch (error) {
        setIsAdmin({
          ...isAdmin,
          message: error.message,
          loading: false,
        });
      }
    })();
     // eslint-disable-next-line
  }, []);

  return {
    isAdmin: isAdmin.isAdmin,
    message: isAdmin.message,
    data: isAdmin.data,
    loading: isAdmin.loading, 
  };
};

export default useCheckRole;
