import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

function Header() {
  const { openModal } = useContext(ModalContext);
  return <button onClick={openModal}>Abrir modal</button>;
}

export default Header;
