const initState = {
  sendLoading: false,
  saveLoading: false,
  deleteLoading: false,
  uploadLoading: false,
};

const ansøgReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_STATUS_REQUEST':
      console.log('send form fra reducer med: ', state);
      return { ...state, sendLoading: true };
    case 'UPDATE_PROFILE_STATUS_SUCCESS':
      return { ...state, sendLoading: false };
    case 'UPDATE_PROFILE_STATUS_ERROR':
      return {
        ...state,
        sendLoading: false,
        sendError: action.err,
        sendErrorMsg: 'Profilen kunne ikke gemmes, prøv igen',
      };

    case 'SEND_FORM_REQUEST':
      console.log('send form fra reducer med: ', state);
      return { ...state, sendLoading: true };
    case 'SEND_FORM_SUCCESS':
      return { ...state, sendLoading: false };
    case 'SEND_FORM_ERROR':
      return {
        ...state,
        sendLoading: false,
        sendError: action.err,
        sendErrorMsg: 'Ansøgningen kunne ikke sendes, prøv igen',
      };

    case 'SAVE_FORM_REQUEST':
      return { ...state, saveLoading: true };
    case 'SAVE_FORM_SUCCESS':
      return { ...state, saveLoading: false };
    case 'SAVE_FORM_ERROR':
      return {
        ...state,
        saveLoading: false,
        saveError: action.err,
        saveErrorMsg: 'Ansøgningen kunne ikke gemmes, prøv igen',
      };

    case 'UPLOAD_FILE_REQUEST':
      return { ...state, uploadLoading: true };
    case 'UPLOAD_FILE_SUCCESS':
      return { ...state, uploadLoading: false };
    case 'UPLOAD_FILE_ERROR':
      return {
        ...state,
        uploadLoading: false,
        uploadError: action.err,
        uploadErrorMsg: 'Filen kunne ikke uploades, prøv at opdater siden',
      };

    case 'DELETE_FILE_STORAGE_REQUEST':
      return { ...state, deleteLoading: true };
    case 'DELETE_FILE_STORAGE_SUCCESS':
      return { ...state, deleteLoading: false };
    case 'DELETE_FILE_STORAGE_ERROR':
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.err,
        deleteErrorMsg: 'Filen kunne ikke slettes, prøv at opdater siden',
      };

    default:
      return state;
  }
};

export default ansøgReducer;
