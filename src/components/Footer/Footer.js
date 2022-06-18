import "./Footer.css";

function Footer({version}) {
  return (
    <footer className="footer">
      <p className="footer__text">
        Павел Безруков, 2022
      </p>
      <p className="footer__text">
        Билд: {version}
      </p>
    </footer>
  );
}

export default Footer;
