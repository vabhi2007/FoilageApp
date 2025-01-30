import Image from "next/image";
import Arrow from "../assets/ionicons/caret-down-white.svg";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
};

const Button: React.FC<ButtonProps> = ({text, onClick, className = '', showArrow = false}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary px-[0.75vw] py-[0.5vw] rounded-[5px] text-[0.85vw] flex justify-center items-center ${className}`}
    >
      <div className="w-full flex justify-between">
      {text}

      {showArrow && (
        <Image
          src = {Arrow}
          alt = "Arrow"
          className="w-[0.5vw] h-auto"
        ></Image>
      )}

      </div>
    </button>
  );
};

export default Button;