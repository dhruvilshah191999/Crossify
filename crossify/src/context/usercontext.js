import { createContext, useReducer } from "react";
import reducer from "../Reducers/userreducer";

export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(reducer, {});
  return (
    <UserContext.Provider value={{ users, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
