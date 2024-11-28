import React, { useState } from 'react';

const ModalSample = ({props,children}) => {
    const { size ,title, message, buttonText, buttonClass, submitButtonText,submitButtonClass,submitFunction } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmitFuction = () =>{
    setIsModalOpen( submitFunction());
  }

  return (
    <div className=''>
        <div 
            onClick={openModal} 
            className={buttonClass}>
            {buttonText}
        </div>

        {isModalOpen && (
            <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeModal}
            >
                <div 
                    className="modal modal-open"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <div className={`bg-white text-black p-3 rounded-xl ${size}`}>
                        <div className="modal-content">
                            <div className="modal-header mb-2">
                                <div className="flex justify-between">
                                    <div className="modal-title text-xl font-semibold mt-4">
                                        {title}
                                    </div>
                                    <div className="close-button">
                                
                                        <div className="btn btn-square btn-outline-transparent bg-transparent"  onClick={closeModal}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className=''/>
                            <div className="modal-body my-2">
                               {children}
                            </div>
                            <hr />
                            <div className="modal-footer mt-2">
                                <div className="flex justify-end gap-2">
                                    <button className=" bg-red-600 text-white py-2.5 px-3.5 rounded-lg"  onClick={closeModal}>
                                        Close
                                    </button>
                                    <button type="submit" className={submitButtonClass} onClick={handleSubmitFuction}>
                                        {submitButtonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ModalSample;
