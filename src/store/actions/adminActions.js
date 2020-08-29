export const decide = info => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // eslint-disable-next-line
    const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;

    dispatch({ type: "SEND_DECISION_REQUEST" });
    firestore
      .collection("forms")
      .doc(info.formId)
      .update({
        decision: info.decision,
        decisionMadeBy: profile.fornavn,
        decisionTakenAt: new Date()
      })
      .then(() => {
        dispatch({ type: "SEND_DECISION_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SEND_DECISION_ERROR" }, err);
      });
  };
};
