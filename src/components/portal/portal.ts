import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal: FC = ({ children }) => {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement>();

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
