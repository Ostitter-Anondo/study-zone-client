import { useEffect, useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase.init";
import axios from "axios";

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [booked, setBooked] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState({sessId:"", price: 0});

  // firebase stuff

  const signupMailPass = (mail, pass) => {
    return createUserWithEmailAndPassword(auth, mail, pass);
  };

  const loginMailPass = (mail, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, mail, pass);
  };

  const signOutUser = () => {
    setLoading(true);
    setUserData(null);
    setPaymentInfo({sessId:"", price: 0});
    toastSuc(`user successfully signed out`);
    return signOut(auth);
  };

  // toasts

  const toastErr = (msg) =>
    toast.error(`${msg}`, {
      style: {
        padding: "16px",
        background: "#ff4d52",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#ff4d52",
      },
    });

  const toastSuc = (msg) =>
    toast.success(`${msg}`, {
      style: {
        padding: "16px",
        background: "#4de62e",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#4de62e",
      },
    });

  const dataValues = {
    loading,
    setLoading,
    userData,
    setUserData,
    booked,
    setBooked,
    signupMailPass,
    loginMailPass,
    signOutUser,
    paymentInfo,
    setPaymentInfo,
    toastErr,
    toastSuc,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user = { uid: currentUser.uid };

        axios
          .post(`${import.meta.env.VITE_dbApi}/jwt`, user, {
            withCredentials: true,
          })
          .then((res) => {
            setUserData(res.data.userData);
            setBooked(res.data.booked);
            setLoading(false);
          })
          .catch((err) => console.error(err));
      } else {
        axios
          .post(
            `${import.meta.env.VITE_dbApi}/logout`,
            {},
            { withCredentials: true }
          )
          .then((res) => console.log("logout", res.data))
          .then(() => {
            setLoading(false);
            setUserData(null);
          })
          .catch((err) => console.error(err));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <Context.Provider value={dataValues}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
