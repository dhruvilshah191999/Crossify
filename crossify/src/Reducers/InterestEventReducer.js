const interestevent_dispatch = (state, action) => {
  switch (action.type) {
    case "Add-Event":
      return action.add;
    case "Delete-Event":
      return [];
    default:
      return state;
  }
};

export default interestevent_dispatch;
