import Header from "../componentsContextAPI/Header";
import Modal from "../componentsContextAPI/Modal";
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export default function Example3() {
  const { isOpen } = useContext(ModalContext);
  return (
    <div className="example">
      <Header />
      {isOpen && <Modal />}
    </div>
  );
}
