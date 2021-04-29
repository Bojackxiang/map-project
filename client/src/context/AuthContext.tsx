import React, { useState, createContext, useEffect } from "react";
import useCheckiSessionToken from "../Components/CustomizedHooks/useCheckiSessionToken";


const userContext = {
  username: "",
  userRole: "",
  isLoggedIn: null,
  updateUserAuth: (newState: any) => {},
};
export const AuthContext = createContext(userContext);

interface IAuthContextProvider {
  children: React.ReactNode;
}
const AuthContextProvider = (props: IAuthContextProvider) => {
  const {children} = props

  const [userInfo, setUserInfo] = useState<any>({
    isLoggedIn: null,
  });

  const {isAuth} = useCheckiSessionToken()

  useEffect(() => {
    if(Boolean(isAuth)) {
      setUserInfo({
        isLoggedIn: true, 
      })
    }
  }, [isAuth])

  const updateUserAuth = (newUserState: any) => {
      setUserInfo({
        ...userInfo, 
        ...newUserState
      })
  };
  return (
    <AuthContext.Provider
      value={{ ...userInfo, updateUserAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
