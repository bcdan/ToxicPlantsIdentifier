import "./Modal.css";
import React, { useRef, useEffect, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import PlantDetails from '../PlantDetails'

const Modal = ({ showModal, setShowModal, plantID})=> {
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  useEffect(() => {
    if(showModal){
      document.body.style.overflow = 'hidden';
    }else         document.body.style.overflow = 'unset';
  },[showModal])


  return (
    <>
      {showModal ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
            <div className="modalWrapper" >
              <div className="modalContent">

                <PlantDetails plantID={plantID}/>
                <button onClick={() => setShowModal(prev => !prev)}>Close</button>
              </div>
              <MdClose className="closeModalButton"
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
