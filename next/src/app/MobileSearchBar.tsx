'use client'
import "../app/globals.css"
import location from "../../public/images/location.svg"
import person from "../../public/images/person.svg"
import searchIcon from "../../public/images/search icon.svg"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchIcon from "../app/assets/SearchIcon.svg";
import LocationIcon from "../app/assets/LocationIcon.svg";

type SearchBarProps = {
  autoFillKeyword?: string,
  autoFillLocation?: string
};


interface SearchOptionInterface {
    iconSrc: string;
    text: string;
}


const MobileSearchBar: React.FC<SearchBarProps> = ({autoFillKeyword = '', autoFillLocation = ''}) => {
  const [keyword, setKeyword] = useState(autoFillKeyword);
  const [location, setLocation] = useState(autoFillLocation);
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/careers?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  return (

        <div style={{fontFamily:"Montserrat", fontWeight:500}} className= "flex grid grid-rows-3 gap-[2.0vw] p-[4vw] mx-[13vw] mb-[40vw] border text-[#333333] bg-white rounded-[3vw] text-[2.70vw]">
            <div  className="flex border border-black rounded-[3vw] p-[2vw] justify-left items-center">
                <div className="flex items-center mr-[1vw] w-[10vw]">
                    <img src={searchIcon.src} className="flex w-[6.0vw] mx-[2vw]  flex-shrink-0">
                    </img>
                </div>
                {/* <div className="flex content-center">
                Search by keyword (e.g. research)
                </div> */}
                <input 
                    placeholder="Search by keyword (e.g. research)" 
                    className="w-full outline-none flex content-center flex-grow"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div  className="flex border border-black rounded-[3vw] p-[2vw] justify-left items-center">
                <div className="flex items-center mr-[1vw] w-[10vw]">
                    <img src={LocationIcon.src} className="flex w-[6.0vw] mx-[2vw]  flex-shrink-0">
                    </img>
                </div>
                <input 
                    placeholder="Search by location (e.g. Seattle)" 
                    className="w-full outline-none flex content-center flex-grow"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <button 
                className="flex justify-center bg-[#023A22] text-white p-[3vw] text-white rounded-full"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
  );
};

export default MobileSearchBar;
