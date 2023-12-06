import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-xl h-auto md:max-w-xl">
          {/* Modal Content */}
          <div className="h-full lg:h-auto border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-[#111] outline-none focus:outline-none py-5">
            {/* Modal Header */}
            <div className="flex items-center justify-center p-4 rounded-t">
              <h3 className="text-3xl text-white font-medium">{title}</h3>
              <button
                className="h-7 w-7 bg-white rounded-full p-1 ml-auto border-0 hover:bg-opacity-70 transition"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-4 relative flex-auto">{body}</div>
            {/* Modal Footer */}
            <div className="p-4 flex flex-col gap-2">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
