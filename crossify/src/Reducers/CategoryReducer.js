const category_dispatch = (state, action) => {
  switch (action.type) {
    case "Add-Category":
      return action.add;
    case "Delete-Category":
      return [];
    default:
      return state;
  }
};

export default category_dispatch;
