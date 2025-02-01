import React, { useState, useEffect, useRef } from 'react';
import Button from './components/Button';
import MobileButton from './MobileButton';


type DropdownProps = {
  options: string[];
  buttonText: string;
  closeAllDropdowns: () => void;
};

const MobileDropdown: React.FC<DropdownProps> = ({ options, buttonText, closeAllDropdowns }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State to store the selected option
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef} className="relative inline-block w-full" >
      <MobileButton text={buttonText} onClick={toggleDropdown} showArrow={true} className="w-full h-[6.5vw] text-[3.5vw] px-[2vw]"  />

      {isOpen && (
        <div className="absolute left-0 w-full bg-white border border-secondary shadow-lg" style={{zIndex:99}}>
          <ul className="list-none">
            {options.map((option, index) => (
              <li style={{zIndex:99}}
                key={index}
                className={`px-[2vw] py-[0.5vw] text-[4vw] border-b border-secondary text-tertiary cursor-pointer ${
                  selectedOption === option ? 'bg-secondary' : 'hover:bg-secondary'
                }`}
                onClick={() => {
                  setSelectedOption(selectedOption === option ? null : option); // Toggle selected option
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

export default MobileDropdown;
