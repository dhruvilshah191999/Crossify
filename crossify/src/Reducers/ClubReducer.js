const club_dispatch = (state, action) => {
  switch (action.type) {
    case "Add-Club":
      return action.add;
    case "Delete-Club":
      return [];
    default:
      return state;
  }
};

export default club_dispatch;
