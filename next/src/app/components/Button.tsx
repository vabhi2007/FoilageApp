type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({text, onClick, className = ''}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#256963] px-[10] py-[10] rounded-[5px] ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;