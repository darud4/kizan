import './Dashboard.css';
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <nav className="dashboard">
      <Link className="dashboard__link" to="/komand">Поиск</Link>
      <Link className="dashboard__link" to="/komand/card">Ввод новой карты</Link>
    </nav>
  );
}

export default Dashboard;
