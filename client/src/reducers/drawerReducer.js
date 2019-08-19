export const toggleDrawer = event => {
  if (
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return false;
  }
  return {
    type: "TOGGLE_DRAWER",
    data: true
  };
};

const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return true ? !state : state;
    default:
      return state;
  }
};

export default drawerReducer;
