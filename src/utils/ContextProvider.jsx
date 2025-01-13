import { useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightTheme, setLightTheme] = useState(true);

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
    wishlist,
    setWishlist,
    lightTheme,
    setLightTheme,
    toastErr,
    toastSuc,
  };

  return <Context.Provider value={dataValues}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
