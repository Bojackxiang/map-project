import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface ICheckAuthInput {
  successJumpTo?: string;
  failJumpTo?: string;
}

// check if the user is logged in or not
const useCheckSessionToken = (checkAuthInput?: ICheckAuthInput) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const history = useHistory();

  useEffect(() => {
    const isFindSessionToken = localStorage.getItem(
      process.env.REACT_APP_SESSION_NAME as string
    );

    // preventing incorrectly redirecting
    if (!isFindSessionToken) {
      if (checkAuthInput && checkAuthInput.failJumpTo ) {
      
        history.push(checkAuthInput.failJumpTo);
      } else {
        setIsAuth(false);
      }
    } else {
      if (checkAuthInput && checkAuthInput.successJumpTo) {
        history.push(checkAuthInput.successJumpTo);
      } else {
        setIsAuth(true);
      }
    }
  }, [history, checkAuthInput]);

  return {
    isAuth,
  };
};

export default useCheckSessionToken;