import stylesHeader from "./header.module.css";
import Navigation from "./Navigation/Navigation";
function Header() {
  return (
    <header
      className={`${stylesHeader.header} ${stylesHeader["background-header"]}`}
    >
      <span>logo</span>
      <Navigation />
    </header>
  );
}

export default Header;
