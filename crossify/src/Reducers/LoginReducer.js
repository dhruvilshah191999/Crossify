const login_dispatch = (state, action) => {
  switch (action.type) {
    case "Login-Status":
      return action.status;
    case "Logout-Status":
      return action.status;
    default:
      return state;
  }
};

export default login_dispatch;
