import { createContext, useReducer } from "react";
import reducer from "../Reducers/userreducer";
import login_dispatch from "../Reducers/LoginReducer";
export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(reducer, {});
  const [isLogin, islogin_dispatch] = useReducer(login_dispatch, false);
  return (
    <UserContext.Provider
      value={{ users, dispatch, isLogin, islogin_dispatch }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
