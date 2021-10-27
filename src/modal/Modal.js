import React from "react";
import '../modal/Modal.css';
import logoIcon from '../icon/WebLog.png';

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => { setOpenModal(false);}}> X </button>
        </div>
        <div className="logoIcon"> 
        <img src ={logoIcon} alt="logo" className="modal-logo" /> </div>
        <div className="title"><h3>Are you sure you want to Logout?</h3></div>
        <div className="footer">
            <button onClick={() => { setOpenModal(false); }}id="cancelBtn">No</button>
            <button className="modal-btn"><a href="LoginForm.js" style={{textDecoration:'none',color:'white'}}>Yes</a></button>
        </div>
      </div>
    </div>
  );
}

export default Modal;