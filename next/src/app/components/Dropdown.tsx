import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

type DropdownProps = {
  options: string[];
  buttonText: string;
  closeAllDropdowns: () => void;
  onSelect: (option: string | null) => void; // New prop
};

const Dropdown: React.FC<DropdownProps> = ({ options, buttonText, closeAllDropdowns, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      closeAllDropdowns();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      <Button text={buttonText} onClick={toggleDropdown} showArrow={true} className="w-full h-[2.5vw] text-[0.8vw]" />
      {isOpen && (
        <div className="absolute left-0 w-full bg-white border border-secondary shadow-lg">
          <ul className="list-none">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-[1vw] py-[0.5vw] text-[0.85vw] border-b border-secondary text-tertiary cursor-pointer ${
                  selectedOption === option ? 'bg-secondary' : 'hover:bg-secondary'
                }`}
                onClick={() => {
                  setSelectedOption(selectedOption === option ? null : option);
                  onSelect(selectedOption === option ? null : option); // Update parent state
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
