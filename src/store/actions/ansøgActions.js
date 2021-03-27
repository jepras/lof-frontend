export const send = (info) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // eslint-disable-next-line
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    dispatch({ type: 'UPDATE_PROFILE_STATUS_REQUEST' });
    firestore
      .collection('users')
      .doc(authorId)
      .update({
        status: 'sendt',
      })
      .then(() => {
        dispatch({ type: 'UPDATE_PROFILE_STATUS__SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_PROFILE_STATUS__ERROR' }, err);
      });

    console.log('FROM ansøgActions - send form initiated WITH: ', profile);

    dispatch({ type: 'SEND_FORM_REQUEST' });
    firestore
      .collection('forms')
      .add({
        ...profile,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'SEND_FORM_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SEND_FORM_ERROR' }, err);
      });
  };
};

export const save = (info) => {
  return (dispatch, getState, { getFirestore }) => {
    /* Initiate variables */
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    const stateInfo = getState().firebase;

    console.log('info received: ', info);

    /* Get DateTime */
    var today = new Date();
    var date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    /* Get numbers from state if not in form */
    var plusudgifternummer =
      (info.udgift1
        ? parseInt(info.udgift1, 10)
        : stateInfo.profile.udgift1
        ? parseInt(stateInfo.profile.udgift1, 10)
        : 0) +
      (info.udgift2
        ? parseInt(info.udgift2, 10)
        : stateInfo.profile.udgift2
        ? parseInt(stateInfo.profile.udgift2, 10)
        : 0) +
      (info.udgift3
        ? parseInt(info.udgift3, 10)
        : stateInfo.profile.udgift3
        ? parseInt(stateInfo.profile.udgift3, 10)
        : 0);
    var plusudgifter = plusudgifternummer.toString();
    console.log('plusudgifter', plusudgifter);

    var plusindtægternummer =
      (info.formueibank
        ? parseInt(info.formueibank, 10)
        : stateInfo.profile.formueibank
        ? parseInt(stateInfo.profile.formueibank, 10)
        : 0) +
      (info.indtægtansøger
        ? parseInt(info.indtægtansøger, 10)
        : stateInfo.profile.indtægtansøger
        ? parseInt(stateInfo.profile.indtægtansøger, 10)
        : 0) +
      (info.indtægtsamlever
        ? parseInt(info.indtægtsamlever, 10)
        : stateInfo.profile.indtægtsamlever
        ? parseInt(stateInfo.profile.indtægtsamlever, 10)
        : 0) +
      (info.boligsikring
        ? parseInt(info.boligsikring, 10)
        : stateInfo.profile.boligsikring
        ? parseInt(stateInfo.profile.boligsikring, 10)
        : 0) +
      (info.huslejetilskud
        ? parseInt(info.huslejetilskud, 10)
        : stateInfo.profile.huslejetilskud
        ? parseInt(stateInfo.profile.huslejetilskud, 10)
        : 0) +
      (info.børnebidrag
        ? parseInt(info.børnebidrag, 10)
        : stateInfo.profile.børnebidrag
        ? parseInt(stateInfo.profile.børnebidrag, 10)
        : 0) +
      (info.børnetilskud
        ? parseInt(info.børnetilskud, 10)
        : stateInfo.profile.børnetilskud
        ? parseInt(stateInfo.profile.børnetilskud, 10)
        : 0) +
      (info.familieydelse
        ? parseInt(info.familieydelse, 10)
        : stateInfo.profile.familieydelse
        ? parseInt(stateInfo.profile.familieydelse, 10)
        : 0);
    var plusindtægter = plusindtægternummer.toString();
    console.log('plusindtægter', plusindtægter);

    var totalkrnummer =
      (plusindtægter ? parseInt(plusindtægter, 10) : 0) -
      (plusudgifter ? parseInt(plusudgifter, 10) : 0);
    var totalkr = totalkrnummer.toString();
    console.log('totalkr', totalkr);

    var restnummer = parseInt(plusindtægter, 10) - parseInt(plusudgifter, 10);
    var rest = restnummer.toString();

    /* Dispatch action */
    if (authorId) {
      dispatch({ type: 'SAVE_FORM_REQUEST' });
      firestore
        .collection('users')
        .doc(authorId)
        .update({
          ...info,
          savedAt: dateTime,
          status: 'gemt',
          totalUdgift: plusudgifter
            ? plusudgifter
            : stateInfo.profile.totalUdgift,
          totalIndtægt: plusindtægter
            ? plusindtægter
            : stateInfo.profile.totalIndtægt,
          totalKroner: totalkr ? totalkr : stateInfo.profile.totalKroner,
          resttilunderhold: rest ? rest : stateInfo.profile.resttilunderhold,
        })
        .then(() => {
          dispatch({ type: 'SAVE_FORM_SUCCESS' });
        })
        .catch((err) => {
          dispatch({ type: 'SAVE_FORM_ERROR' }, err);
        });
    } else {
      console.warn('ERROR');
    }
  };
};

export const uploadSuccess = (file) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const authorId = getState().firebase.auth.uid;

    dispatch({ type: 'UPLOAD_FILE_REQUEST' });
    firebase
      .storage()
      .ref(authorId)
      .child(file.avatar)
      .getDownloadURL()
      .then((url) => {
        firestore
          .collection('users')
          .doc(authorId)
          .update({
            uploads: firebase.firestore.FieldValue.arrayUnion(file.avatar),
          });
      })
      .then(() => {
        dispatch({ type: 'UPLOAD_FILE_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'UPLOAD_FILE_ERROR' }, err);
      });
  };
};

export const deleteFile = (filNavn) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const authorId = getState().firebase.auth.uid;

    dispatch({ type: 'DELETE_FILE_STORAGE_REQUEST' });
    firestore
      .collection('users')
      .doc(authorId)
      .update({
        uploads: firebase.firestore.FieldValue.arrayRemove(filNavn),
      });

    var filRef = firebase.storage().ref(authorId).child(filNavn);

    filRef
      .delete()
      .then(() => {
        // File deleted successfully
        dispatch({ type: 'DELETE_FILE_STORAGE_SUCCESS' });
      })
      .catch((err) => {
        // Uh-oh, an error occurred!
        dispatch({ type: 'DELETE_FILE_STORAGE_ERROR', err: err });
      });
  };
};
