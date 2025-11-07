function Modal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Modal con Prop Drilling</h3>
        <p>El estado y las funciones se pasaron por props.</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
export default Modal;
