import React, { useState } from "react";
// import "./styles.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

// import { AddBoardModal } from '../../cmps/app/modal/add-board-modal';


export function UserDetails() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="App">
      <button onClick={toggleModal}>Open modal</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>My modal dialog.</div>
        <button onClick={toggleModal}>Close modal</button>
      </Modal>
    </div>
  );
}


