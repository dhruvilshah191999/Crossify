import { createContext, useReducer } from "react";
import reducer from "../Reducers/userreducer";
import login_dispatch from "../Reducers/LoginReducer";
import search_reducer from "../Reducers/SearchReducer";
import category_reducer from "../Reducers/CategoryReducer";
import event_reducer from "../Reducers/EventReducer";
import club_reducer from "../Reducers/ClubReducer";
import interest_reducer from "../Reducers/InterestEventReducer";

export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(reducer, {});
  const [isLogin, islogin_dispatch] = useReducer(login_dispatch, false);
  const [searchResult, search_dispatch] = useReducer(search_reducer, {});
  const [category, category_dispatch] = useReducer(category_reducer, []);
  const [EventData, event_dispatch] = useReducer(event_reducer, []);
  const [ClubData, club_dispatch] = useReducer(club_reducer, []);
  const [InterestEventData, interestevent_dispatch] = useReducer(
    interest_reducer,
    []
  );

  return (
    <UserContext.Provider
      value={{
        users,
        dispatch,
        isLogin,
        islogin_dispatch,
        searchResult,
        search_dispatch,
        category,
        category_dispatch,
        EventData,
        event_dispatch,
        ClubData,
        club_dispatch,
        InterestEventData,
        interestevent_dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
