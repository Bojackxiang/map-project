import axios from "axios";
import  configs from "../support/config";
import { useEffect, useState } from "react";

const useRequest = () => {
  const [uiState, setUIState] = useState({
    loading: true,
    response: "",
  });

  useEffect(() => {
    (async () => {
      console.log(process.env);
      const url = `${configs.api_url}/get/visit`
      const resp = await axios.get(url);
      setUIState((prevState) => ({
        ...prevState,
        loading: false,
        response: resp.data,
      }));
    })();
  }, []);

  return { response: uiState.response, loading: uiState.loading };
};

export default useRequest;
