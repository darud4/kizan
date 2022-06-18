import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userInfo as userInfoContext } from "../../contexts/Classificators";

function Header() {
  const userInfo = useContext(userInfoContext);

  return (
    <header className="header">
      <h1 className="header__title">Кизань, {userInfo.username}</h1>
      <nav className="dashboard">
        <Link className="dashboard__link" to="/komand">
          Поиск
        </Link>
        <Link className="dashboard__link" to="/komand/card">
          Ввод новой карты
        </Link>
      </nav>
    </header>
  );
}

export default Header;
