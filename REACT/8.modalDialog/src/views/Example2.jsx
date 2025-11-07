import { useState } from "react";
import Modal from "../componentesPropDrilling/Modal";
import Header from "../componentesPropDrilling/Header";

export default function Example2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="example">
      <Header onOpen={() => setIsOpen(true)} />
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
