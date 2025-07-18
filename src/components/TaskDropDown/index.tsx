import { TASK_STATUS_OPTIONS } from 'appconfig/appconstants';
import MoreIcon from 'components/common/Icons/MoreIcon';
import { useState, useRef, useEffect } from 'react';


type Props = {
  value: string;
  onChange: (newStatus: string) => void;
};

const StatusDropdown: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

//   const selectedLabel =
//     TASK_STATUS_OPTIONS.find((option) => option.value === value)?.label || value;

  return (
    <div className="relative inline-block w-[100px] text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-1.5 py-1 cursor-pointer  bg-black rounded-md  text-xs  text-left"
      >
        <MoreIcon  size={14}/>
      </button>

      {isOpen && (
        <div className="absolute  mt-1 w-full   bg-[#171717] border rounded-md shadow-lg z-10">
          {TASK_STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full cursor-pointer text-left px-3 py-1 text-xs  ${
                value === option.value ? ' font-medium' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;

