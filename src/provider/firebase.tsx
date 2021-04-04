import React from "react";

import firebase from "firebase/app";

export const FirebaseProvider:React.FunctionComponent = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyA-WsJd-d3Xopk0d8MKvT8A5RHwl_lFu7w",
    authDomain: "three-kingdoms-517f2.firebaseapp.com",
    projectId: "three-kingdoms-517f2",
    storageBucket: "three-kingdoms-517f2.appspot.com",
    messagingSenderId: "1060865598645",
    appId: "1:1060865598645:web:cf00f380b542b7dad80afc",
    measurementId: "G-PZP6M1P1BD",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return <>{children}</>;
};
