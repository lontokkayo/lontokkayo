import React, {useState} from 'react';
import Modal from "../modal/Modal.js";
import * as RiIcons from "react-icons/ri";
import '../modal/AppModal.css';

function AppModal() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
    <div className="App">
         {modalOpen && <Modal setOpenModal={setModalOpen} />}
         <button className="openModalBtn"onClick={() => {setModalOpen(true);}}><RiIcons.RiShutDownLine />      Logout</button>
    </div>
    )
}

export default AppModal
