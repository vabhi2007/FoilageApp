import Image from "next/image";

type InfoTabProps = {
    icon: string;
    title: string;
    text: string;
    className?: string;
  };
  
  const InfoTab: React.FC<InfoTabProps> = ({icon, title, text, className = ''}) => {
    return (
      <div
        className={`w-full bg-secondary px-[2vw] py-[2vw] rounded-[5px] space-y-[1vw] drop-shadow-[0_0.4vw_0.1vw_rgba(0,0,0,0.2)] ${className}`}
      >
        <Image
            src = {icon}
            className='w-[3.5vw] h-auto'
            alt = "Logo"
        ></Image>

        <div className="space-y-[0.5vw] text-tertiary" style={{fontFamily: 'Montserrat'}}>
            <div className="text-[1.25vw] font-semibold"> {title} </div>
            <div className="text-[1vw] font-medium"> {text} </div>
        </div>

      </div>
    );
  };
  
  export default InfoTab;