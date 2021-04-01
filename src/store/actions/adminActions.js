export const deleteUserData = (data) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    /* Initiate all variables */
    const firestore = getFirestore();
    const firebase = getFirebase();

    const selectedUserFormId = data.formId;
    const selectedUserUserId = data.selectedUser;
    const formData = data.formData;
    const formUploads = formData.uploads;

    console.log('dispatching deleteUserData with: ', data);

    /* Dispatch redux action */
    dispatch({ type: 'DELETE_ALL_REQUEST' });

    /* Delete stored uploads */
    var arrayLength = formUploads.length;
    console.log('arrayLength: ', arrayLength);
    // eslint-disable-next-line
    for (var i = 0; i < arrayLength; i++) {
      console.log('name: ', formUploads[i]);
      var filNavn = formUploads[i];
      var filRef = firebase.storage().ref(selectedUserUserId).child(filNavn);
      // eslint-disable-next-line
      filRef
        .delete()
        // eslint-disable-next-line
        .then(() => {
          console.log('file deleted: ', filRef);
        })
        // eslint-disable-next-line
        .catch((error) => {
          console.log('error happened to: ', filRef);
        });
    }

    /* Delete saved form document */
    firestore
      .collection('forms')
      .doc(selectedUserFormId)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_ALL_SUCCESS' });
        console.log('User form deleted');

        /* Delete user document */
        firestore
          .collection('users')
          .doc(selectedUserUserId)
          .delete()
          .then(() => {
            dispatch({ type: 'DELETE_ALL_SUCCESS' });
            console.log('User deleted');
          })
          .catch((error) => {
            dispatch({ type: 'DELETE_ALL_ERROR' }, error);

            console.log("User wasn't deleted");
          });
      })
      .catch((error) => {
        dispatch({ type: 'DELETE_ALL_ERROR' }, error);
        console.log("User wasn't deleted");
      });
  };
};

export const decide = (info) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // eslint-disable-next-line
    const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;

    dispatch({ type: 'SEND_DECISION_REQUEST' });
    firestore
      .collection('forms')
      .doc(info.formId)
      .update({
        decision: info.decision,
        decisionMadeBy: profile.fornavn,
        decisionTakenAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'SEND_DECISION_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SEND_DECISION_ERROR' }, err);
      });
  };
};

export const downloadFile = (userData) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log('userData fra Redux', userData);

    const firebase = getFirebase();
    const authorId = userData.selectedUser;
    const filNavn = userData.filNavn;
    const formData = userData.formData;
    const formUploads = formData.uploads;

    var arrayLength = formUploads.length;
    for (var i = 0; i < arrayLength; i++) {
      console.log('array #', [i]);
      console.log('name: ', formUploads[i]);
    }

    dispatch({ type: 'DOWNLOAD_FILE_STORAGE_REQUEST' });

    /* create ref  */
    var filRef = firebase.storage().ref(authorId).child(filNavn);

    // Get the download URL
    filRef
      .getDownloadURL()
      .then(function (url) {
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        /* xhr.responseType = 'blob';
        xhr.onload = function (event) {
          var blob = xhr.response;
        }; */
        xhr.open('GET', url);
        xhr.send();

        /* url */
        console.log('url', url);

        dispatch({
          type: 'DOWNLOAD_FILE_STORAGE_SUCCESS',
          payload: url,
          linkUpload: filNavn,
        });
      })
      .catch(function (error) {
        dispatch({ type: 'DOWNLOAD_FILE_STORAGE_ERROR' });

        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            console.log('object not found');
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('no permission');
            break;

          case 'storage/canceled':
            // User canceled the upload
            console.log('user cancelled');
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log('unknown error');
            break;

          default:
            console.log('default');
            break;
        }
      });
  };
};
