const initState = {
  sendLoading: false,
  saveLoading: false,
  deleteLoading: false,
  deleteError: false,
  deleteErrorMsg: false,
  deleteSuccess: false,
  uploadLoading: false,
  downloadUrl: null,
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case 'DOWNLOAD_FILE_STORAGE_SUCCESS':
      console.log('download file storage success', action.payload);
      return { ...state, downloadUrl: action.payload };
    case 'SEND_DECISION_REQUEST':
      console.log('decision fra reducer med: ', state);
      return { ...state, sendLoading: true };
    case 'SEND_DECISION_SUCCESS':
      return { ...state, sendLoading: false };
    case 'SEND_DECISION_ERROR':
      return {
        ...state,
        sendLoading: false,
        sendError: action.err,
        sendErrorMsg: 'Handlingen kunne ikke gennemføres, prøv igen',
      };
    case 'DELETE_USER_REQUEST':
      console.log('deleting user fra reducer med: ', state);
      return { ...state, deleteLoading: true, deleteSuccess: false };
    case 'DELETE_USER_SUCCESS':
      return { ...state, deleteLoading: false, deleteSuccess: true };
    case 'DELETE_USER_ERROR':
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.err,
        deleteErrorMsg: 'Handlingen kunne ikke gennemføres, prøv igen',
      };

    case 'DELETE_USER_FORM_REQUEST':
      console.log('deleting user fra reducer med: ', state);
      return { ...state };
    case 'DELETE_USER_FORM_SUCCESS':
      return { ...state };
    case 'DELETE_USER_FORM_ERROR':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
