type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({text, onClick, className = ''}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary px-[0.75vw] py-[0.5vw] rounded-[5px] text-[0.85vw] flex justify-center items-center ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;