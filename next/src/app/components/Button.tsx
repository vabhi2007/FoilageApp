import Image from "next/image";
import Arrow from "../assets/ionicons/caret-down-white.svg";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  primary?: boolean;
};

const Button: React.FC<ButtonProps> = ({text, onClick, className = '', primary = true, showArrow = false}) => {
  return (
    <button
      onClick={onClick}
      className={`px-[0.75vw] py-[0.5vw] rounded-[5px] flex justify-center items-center ${className} ${primary ? 'bg-primary' : 'bg-tertiary'}`}
    >

      {showArrow ? (
        <div className={'w-full flex justify-between'}>
          {text}
          <Image
            src = {Arrow}
            alt = "Arrow"
            className="w-[0.5vw] h-auto"
          ></Image>
        </div>
      ) : (
        <div>
          {text}
        </div>
      )
    }

      
    </button>
  );
};

export default Button;