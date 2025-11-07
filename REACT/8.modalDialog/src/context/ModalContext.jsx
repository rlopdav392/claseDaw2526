import { createContext, useState } from "react";

const ModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

function ModalContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const ctxValue = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
  );
}

export { ModalContext, ModalContextProvider };
