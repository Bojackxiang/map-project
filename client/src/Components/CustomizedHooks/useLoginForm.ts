import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import configs from "../../support/config";

export enum Roles {
  ADMIN = "ADMIN",
  READER = "READER",
}

interface ILoginForm {
  email: string;
  password: string;
}

type formInputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
const useLoginForm = (updateFu: (newState: any) => void) => {
  const histroy = useHistory();
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, serError] = useState({
    error: false,
    message: "",
  });

  const _onFormChange = (e: formInputEvent) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const _onSubmit = async () => {
    try {
      serError({
        error: false,
        message: "",
      });
      if (!loginForm.email || !loginForm.password) {
        serError({
          error: true,
          message: "Please complete the form",
        });
        return;
      }
      const {
        data: { success, message, payload },
      } = await axios.post(`${configs.api_url}/api/verify-user`, {
        email: loginForm.email,
        password: loginForm.password,
      });

      if (!success) {
        throw new Error(message);
      }

      // success login => save the session token int the session storage
      localStorage.setItem(
        process.env.REACT_APP_SESSION_NAME as string,
        payload.token
      );

      updateFu({
        isLoggedIn: true,
      });

      histroy.push("/");
    } catch (error) {
      console.log(error.message);
      serError({
        error: true,
        message: error.message,
      });
    }
  };

  return {
    email: loginForm.email,
    password: loginForm.password,
    _onFormChange,
    _onSubmit,
    loading,
    setLoading,
    error,
  };
};
export default useLoginForm