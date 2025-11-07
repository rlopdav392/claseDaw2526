import Order from "./Order";
import styles from "./Footer.module.css";
const Footer = () => {
  const openHour = "10";
  const closeHour = "16";
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= openHour && currentHour <= closeHour;
  const objetoOrder = { openHour, closeHour };

  return (
    <footer>
      <div>
        <p>Soy el footer: </p>
        {isOpen && <Order order={objetoOrder} />}
      </div>
    </footer>
  );
};

export default Footer;
