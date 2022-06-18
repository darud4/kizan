import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { userInfo as userInfoContext } from "../contexts/Classificators.js";
import { api } from "../utils/api";
import { version } from "../utils/version";
import Popup from "./Popup/Popup";
import withProtection from "./ProtectedRoute/ProtectedRoute";
import Form from "./Form/Form";
import Overview from "./Overview/Overview";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function App() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    canView: false,
    canEdit: false,
    canAdd: false,
    canDelete: false,
    logLevel: 0,
  });
  const [loginLink, setLoginLink] = useState("");
  const ProtectedOverview = withProtection(Overview);
  const ProtectedForm = withProtection(Form);

  function handleLogin() {
    const interval = setInterval(() => {
      api.checkSession().then((res) => {
        if (res.result === "live") {
          setUserInfo({ username: res.username, canView: true });
          setLoginLink(null);
          clearInterval(interval);
        }
      });
    }, 700);
  }

  const checkSession = useCallback(() => {
    // Без бэкенда авторизации нет
    setUserInfo({ username: 'Тест', canView: true })
    // api
    //   .checkSession()
    //   .then((res) =>
    //     res.result === "dead"
    //       ? setLoginLink(res.link)
    //       : setUserInfo({ username: res.username, canView: true })
    //  );
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <userInfoContext.Provider value={userInfo}>
      <BrowserRouter>
        <div className="page">
          <Header />
          <main className="main">
            <ProtectedForm />
          </main>
          {loginLink && (
            <Popup titleText="Не удалось подтвердить доступ">
              <a
                href={loginLink}
                className="link"
                target="_blank"
                rel="noreferrer"
                onClick={handleLogin}
              >
                Авторизоваться
              </a>
            </Popup>
          )}
          <Footer version={version} />
        </div>
      </BrowserRouter>
    </userInfoContext.Provider>
  );
}

export default App;
