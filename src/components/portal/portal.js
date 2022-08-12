import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const [modalRoot, setModalRoot] = useState(
    document.getElementById("modal-root")
  );

  useEffect(() => {
    if (!modalRoot) {
      const createdModalRoot = document.createElement("div");

      createdModalRoot.setAttribute("id", "modal-root");

      document.body.appendChild(createdModalRoot);

      setModalRoot(createdModalRoot);
    }
  }, [modalRoot]);

  return modalRoot ? createPortal(children, modalRoot) : null;
};

export default Portal;
