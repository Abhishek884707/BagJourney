import instagram from "/instagram.svg";
import facebook from "/facebook.svg";
import twitter from "/twitter.svg";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer">
      <p className="footerText">
        {`Copyright \u00A9 ${year} Abhishek Kumar Mourya. All right reserved.`}
      </p>
      <div className="footerSocial">
        <img src={instagram} alt="Instagram Logo" className="social" />
        <img src={facebook} alt="Facebook Logo" className="social" />
        <img src={twitter} alt="Twitter Logo" className="social" />
      </div>
    </div>
  );
};

export default Footer;
