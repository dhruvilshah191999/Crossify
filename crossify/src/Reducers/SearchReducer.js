const search_reducer = (state, action) => {
  switch (action.type) {
    case "Add-Search":
      return action.add;
    case "Remove-Search":
      return {};
    default:
      return state;
  }
};

export default search_reducer;
