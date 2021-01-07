import { createContext, useReducer } from "react";
import reducer from "../Reducers/userreducer";
import login_dispatch from "../Reducers/LoginReducer";
import search_reducer from "../Reducers/SearchReducer";
export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(reducer, {});
  const [isLogin, islogin_dispatch] = useReducer(login_dispatch, false);
  const [searchResult, search_dispatch] = useReducer(search_reducer, {});
  return (
    <UserContext.Provider
      value={{
        users,
        dispatch,
        isLogin,
        islogin_dispatch,
        searchResult,
        search_dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
