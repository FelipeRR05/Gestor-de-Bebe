import { redirect } from "react-router-dom";

const isAuthenticated = () => {
  const session = localStorage.getItem("session");

  if (session) throw redirect("/");
  return null;
};

const handleVerificationProtected = () => {
  const session = localStorage.getItem("session");

  if (!session) throw redirect("/signin");
  return null;
};

const signIn = async (email, password) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (storedUsers[email] && storedUsers[email].password === password) {
    const session = { email, timestamp: Date.now() };
    localStorage.setItem("session", JSON.stringify(session));
    return { success: true, session };
  }
  return { success: false, error: "Credenciais inválidas" };
};

const signUp = async (email, password) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (storedUsers[email]) {
    return { success: false, error: "Usuário já registrado" };
  }

  storedUsers[email] = { password };
  localStorage.setItem("users", JSON.stringify(storedUsers));

  const session = { email, timestamp: Date.now() };
  localStorage.setItem("session", JSON.stringify(session));

  return { success: true, session };
};

const initializeFakeUser = () => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (!storedUsers["user@gmail.com"]) {
    storedUsers["user@gmail.com"] = { password: "123456" };
    localStorage.setItem("users", JSON.stringify(storedUsers));
  }
};

const logout = (navigate) => {
  localStorage.removeItem("session");
  navigate("/signin");
};

export {
  isAuthenticated,
  handleVerificationProtected,
  signIn,
  signUp,
  logout,
  initializeFakeUser,
};
