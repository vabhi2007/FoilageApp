import Image from "next/image";
import SearchIcon from "../../app/assets/SearchIcon.svg";
import LocationIcon from "../../app/assets/LocationIcon.svg";

const Button: React.FC = () => {
  return (
    <div className="w-[50vw] h-[3vw] bg-white flex items-center text-tertiary justify-center rounded-[5px] px-[1.5vw] gap-[1.5vw]" style={{ fontFamily: 'Montserrat' }}>
      <div className="w-full flex gap-[1vw]">
        <Image src={SearchIcon} alt="Search" />
        <div className="w-full flex flex-col items-center justify-center">
            <input 
            placeholder="Search by keyword (eg. research)" 
            className="w-full text-[1vw] outline-none flex-grow" 
            />
            
        </div>
      </div>
      <div className="text-[2vw]" style={{ fontFamily: 'Montserrat-Light' }}>|</div>
      <div className="w-full flex gap-[1vw] items-center">
        <Image src={LocationIcon} alt="Location" />
        <input 
          placeholder="Search by location (eg. Seattle)" 
          className="w-full text-[1vw] outline-none flex-grow" 
        />
      </div>
      <button className="bg-tertiary text-white py-[0.4vw] px-[0.5vw] rounded-full text-[0.75vw]">Search</button>
    </div>
  );
};

export default Button;
