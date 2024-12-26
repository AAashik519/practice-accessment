"use client";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 " // Corrected z-index class
        onClose={() => setIsOpen(false)}
      >
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 z-50 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-full   p-4 text-center sm:p-0">
            {/* Modal Panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="w-full px-4 py-4 mx-4 text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-[800px] sm:p-6"
                onClick={(e) => e.stopPropagation()} // Ensure clicks inside the modal don't propagate
              >
                {/* Render children content */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
