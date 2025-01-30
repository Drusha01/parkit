import React, { useState } from 'react';

const ViewModal = ({ isOpen, closeModal, FuncCall, title, Size, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
                    <div className={`bg-white rounded-lg shadow-lg ${Size ? Size : "w-10/12"} px-6 py-2 relative text-black`}>
                        <div className="flex justify-between">
                            <div className="modal-title text-xl font-semibold mt-4 text-black">
                                {title}
                            </div>
                            <div className="close-button">
                                <button className="btn btn-square btn-outline-transparent bg-transparent"  onClick={closeModal}>
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
                                </button>
                            </div>
                        </div>
                        <div>
                            <hr className="my-2" />
                            <div className="mb-6 overflow-y-auto max-h-96">{children}</div>
                            <hr className="my-2" />
                            <div className="flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 mx-2"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewModal;
