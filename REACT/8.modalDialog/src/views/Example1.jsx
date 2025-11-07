import { useState } from "react";

export default function Example1() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="example">
      <header>
        <button onClick={() => setIsOpen(true)}>Abrir modal</button>
      </header>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modal sin prop drilling</h3>
            <p>Todo está en el mismo componente.</p>
            <button onClick={() => setIsOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
