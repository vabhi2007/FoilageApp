import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

type DropdownProps = {
  options: string[];
  buttonText: string;
  closeAllDropdowns: () => void; // Add this prop to close other dropdowns
};

const Dropdown: React.FC<DropdownProps> = ({ options, buttonText, closeAllDropdowns }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      closeAllDropdowns(); // Close other dropdowns when one is opened
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      {/* Button to trigger dropdown */}
      <Button text={buttonText} onClick={toggleDropdown} showArrow={true} className="w-full h-[2.5vw]" />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-full bg-white border border-secondary shadow-lg">
          <ul className="list-none">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-[1vw] py-[0.5vw] text-[0.85vw] border-b border-secondary text-tertiary hover:bg-secondary cursor-pointer"
                onClick={() => {
                  console.log(option);
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
