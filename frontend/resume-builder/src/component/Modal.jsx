import React from 'react'

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnText,
  actionBtnIcon,
  onActionClick
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      
      {/* modal content */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* modal header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">
              {title}
            </h3>

            {showActionBtn && (
              <button
                className="btn-small-light mr-12"
                onClick={onActionClick}
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5"
          onClick={onClose}
        >
          ✕
        </button>

        {/* modal body scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>

      </div>
    </div>
  )
}

export default Modal