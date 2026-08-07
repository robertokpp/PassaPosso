import close from "../assets/icon-close.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  tittle: string;
};

export function Modal({ isOpen, onClose, children, tittle }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center p-4">
      <div className="w-110 h-fit bg-white  rounded-2xl">
        <header className="flex justify-between px-7 py-5">
          <strong className="font-bold">{tittle}</strong>
          <img
            src={close}
            alt="IconClose"
            onClick={onClose}
            className="cursor-pointer"
          />
        </header>
        
        <div className="px-7 py-8">{children}</div>
      </div>
    </div>
  );
}