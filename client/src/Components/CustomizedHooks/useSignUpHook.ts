import axios from "axios";
import { useState } from "react";

import configs from "../../support/config";
import { validateEmail } from "../../utils/email";

interface ILoginForm {
  email: string;
  password: string;
  username: string;
  role: String;
}

type formInputEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
const useSignUpHook = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [message, setMessage] = useState("");
  const [signUpForm, setSignUpForm] = useState<ILoginForm>({
    email: "",
    password: "",
    username: "",
    role: isAdmin ? "ADMIN" : "READER",
  });

  const _onFormChange = (e: formInputEvent) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const _onModeSwitch = () => {
    setIsAdmin(!isAdmin);
  };

  const _onSubmit = async () => {
    try {
      setMessage("");
      if (!signUpForm.email || !signUpForm.password || !signUpForm.username) {
        setMessage("Please complete the form");
        return;
      }

      if(!validateEmail(signUpForm.email )){
        setMessage("Invalid email");
        return;
      }

      if(signUpForm.password.length < 6){
        setMessage("Password length must larger then 6");
        return;
      }

      const {
        data: { success, message },
      } = await axios.post(`${configs.api_url}/api/create-user`, {
        email: signUpForm.email,
        password: signUpForm.password,
        username: signUpForm.username,
        role: isAdmin ? "ADMIN" : "READER",
      });

      if (!success) {
        throw new Error(message);
      }

      setMessage("Created successfully! Go to login now!");
      setSignUpForm({
        ...signUpForm,
        email: "",
        password: "",
        username: "",
      });
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  return {
    email: signUpForm.email,
    password: signUpForm.password,
    username: signUpForm.username,
    _onFormChange,
    _onSubmit,
    loading,
    setLoading,
    message,
    isAdmin,
    _onModeSwitch,
  };
};

export default useSignUpHook;
