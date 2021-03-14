const initState = {
  sendLoading: false,
  saveLoading: false,
  deleteLoading: false,
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

    default:
      return state;
  }
};

export default adminReducer;
