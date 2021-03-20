import React, { useReducer, createContext } from "react";
import jwt from "jsonwebtoken";

const initialState = {
  user: null,
};
if (localStorage.getItem("token")) {
  const token = jwt.decode(localStorage.getItem("token"));
  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = token;
  }
}
const AuthContext = createContext({
  user: null,
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};
export { AuthContext, AuthProvider };
