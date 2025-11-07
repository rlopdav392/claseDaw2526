import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

function Modal() {
  const { closeModal } = useContext(ModalContext);
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Modal con Context API</h3>
        <p>El estado se maneja globalmente sin prop drilling.</p>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
