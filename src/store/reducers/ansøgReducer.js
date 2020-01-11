const initState = {};

const ansøgReducer = (state = initState, action) => {
  switch (action.type) {
    case "SAVE_FORM_SUCCESS":
      console.log("save form success");
      return state;
    case "SAVE_FORM_ERROR":
      console.log("save form error");
      return state;
    case "SEND_FORM_SUCCESS":
      console.log("send form success");
      return state;
    case "SEND_FORM_ERROR":
      console.log("send form error");
      return state;
    default:
      return state;
  }
};

export default ansøgReducer;
