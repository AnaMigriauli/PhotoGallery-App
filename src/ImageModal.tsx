import { createPortal } from "react-dom";
import styled from "styled-components";

const Modal = ({ children }) => {
  return createPortal(
    <div>
      <ImageModal>
        {children}
        <CloseButton>
          <svg
            // class="FsJPV"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            version="1.1"
            aria-hidden="false"
          >
            <desc lang="en-US">An X shape</desc>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
          </svg>
        </CloseButton>
      </ImageModal>
      ,<Overlay></Overlay>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;

const ImageModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  padding: 0 24px 40px 24px;
  border-radius: 12px;
  background: var(--white);
  z-index: 2500;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.24;
  background: var(--charcoal);
  z-index: 2000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;
