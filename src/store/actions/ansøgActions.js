export const send = info => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // eslint-disable-next-line
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("forms")
      .add({
        ...info,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "SEND_FORM_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SEND_FORM_ERROR" }, err);
      });
  };
};

export const save = info => {
  return (dispatch, getState, { getFirestore }) => {
    /* Initiate variables */
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    const stateInfo = getState().firebase;

    console.log("info received: ", info);

    /* Get DateTime */
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    var plusudgifternummer =
      (info.udgift1
        ? parseInt(info.udgift1, 10)
        : parseInt(stateInfo.profile.udgift1, 10)) +
      (info.udgift2
        ? parseInt(info.udgift2, 10)
        : parseInt(stateInfo.profile.udgift2, 10)) +
      (info.udgift3
        ? parseInt(info.udgift3, 10)
        : parseInt(stateInfo.profile.udgift3, 10));
    var plusudgifter = plusudgifternummer.toString();

    console.log("plusudgifter", plusudgifter);

    var plusindtægternummer =
      (info.formueibank
        ? parseInt(info.formueibank, 10)
        : parseInt(stateInfo.profile.formueibank, 10)) +
      (info.indtægtansøger
        ? parseInt(info.indtægtansøger, 10)
        : parseInt(stateInfo.profile.indtægtansøger, 10)) +
      (info.indtægtsamlever
        ? parseInt(info.indtægtsamlever, 10)
        : parseInt(stateInfo.profile.indtægtsamlever, 10)) +
      (info.boligsikring
        ? parseInt(info.boligsikring, 10)
        : parseInt(stateInfo.profile.boligsikring, 10)) +
      (info.huslejetilskud
        ? parseInt(info.huslejetilskud, 10)
        : parseInt(stateInfo.profile.huslejetilskud, 10)) +
      (info.børnebidrag
        ? parseInt(info.børnebidrag, 10)
        : parseInt(stateInfo.profile.børnebidrag, 10)) +
      (info.børnetilskud
        ? parseInt(info.børnetilskud, 10)
        : parseInt(stateInfo.profile.børnetilskud, 10)) +
      (info.familieydelse
        ? parseInt(info.familieydelse, 10)
        : parseInt(stateInfo.profile.familieydelse, 10));
    var plusindtægter = plusindtægternummer.toString();

    console.log("plusindtægter", plusindtægter);

    if (plusindtægter || plusudgifter) {
      var totalkrnummer =
        parseInt(plusindtægter, 10) - parseInt(plusudgifter, 10);
      var totalkr = totalkrnummer.toString();
      console.log("totalkr", totalkr);
    }

    if (plusindtægter || plusudgifter) {
      var restnummer = parseInt(plusindtægter, 10) - parseInt(plusudgifter, 10);
      var rest = restnummer.toString();
    }

    if (authorId) {
      firestore
        .collection("users")
        .doc(authorId)
        .update({
          ...info,
          savedAt: dateTime,
          totalUdgift: plusudgifter
            ? plusudgifter
            : stateInfo.profile.totalUdgift,
          totalIndtægt: plusindtægter
            ? plusindtægter
            : stateInfo.profile.totalIndtægt,
          totalKroner: totalkr ? totalkr : stateInfo.profile.totalKroner,
          resttilunderhold: rest ? rest : stateInfo.profile.resttilunderhold
        })
        .then(() => {
          dispatch({ type: "SAVE_FORM_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "SAVE_FORM_ERROR" }, err);
        });
    } else {
      console.warn("ERROR");
    }
  };
};

export const uploadSuccess = file => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const authorId = getState().firebase.auth.uid;

    firebase
      .storage()
      .ref(authorId)
      .child(file.avatar)
      .getDownloadURL()
      .then(() => {
        dispatch({ type: "SEND_FORM_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SEND_FORM_ERROR" }, err);
      });
  };
};
