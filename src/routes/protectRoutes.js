import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authMeProcess } from "../Api/auth";
import { syncToken } from "../Api/url";

export default function ProtectRoute({ children }) {
  const role = useSelector((state) => state.auth.role);
  const auth = Cookies.get("myapps_token");
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  console.log("isAuth =>", isAuth);

  const [process, setProcess] = React.useState(true);
  let dispatch = useDispatch();

  const onLoaded = async (values) => {
    let result = await dispatch(authMeProcess(values));
    syncToken();
    setProcess(false);

    console.log("Result =>", result);
  };

  React.useEffect(() => {
    if (!isAuth) {
      if (auth !== undefined) {
        onLoaded();
      } else {
        setProcess(false);
      }
    } else {
      syncToken();
      setProcess(false);
    }
  }, []);

  if (process) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p>Loading</p>
      </div>
    );
  } else {
    console.log("auth =>", auth);
    console.log("role", role);

    if (role === "administrator" || role === "petugas") {
      return auth !== undefined ? children : <Navigate to="/login" />;
    } else {
      return auth !== undefined ? (
        <Navigate to="/beranda" />
      ) : (
        <Navigate to="/login" />
      );
    }
  }
}
