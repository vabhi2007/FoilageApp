'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchIcon from "../../app/assets/SearchIcon.svg";
import LocationIcon from "../../app/assets/LocationIcon.svg";

type SearchBarProps = {
  autoFillKeyword?: string,
  autoFillLocation?: string
};

const SearchBar: React.FC<SearchBarProps> = ({autoFillKeyword = '', autoFillLocation = ''}) => {
  const [keyword, setKeyword] = useState(autoFillKeyword);
  const [location, setLocation] = useState(autoFillLocation);
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/careers?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  useEffect(() => {
    setKeyword(autoFillKeyword);
    setLocation(autoFillLocation);
  }, [autoFillKeyword, autoFillLocation]);

  return (
    <div className="w-[50vw] h-[3vw] bg-white flex items-center text-tertiary justify-center rounded-[5px] px-[1.5vw] gap-[1.5vw]" style={{ fontFamily: 'Montserrat' }}>
      <div className="w-full flex gap-[1vw]">
        <Image src={SearchIcon} alt="Search" />
        <input 
          placeholder="Search by keyword (eg. research)" 
          className="w-full text-[1vw] outline-none flex-grow"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="text-[2vw]" style={{ fontFamily: 'Montserrat-Light' }}>|</div>
      <div className="w-full flex gap-[1vw] items-center">
        <Image src={LocationIcon} alt="Location" />
        <input 
          placeholder="Search by location (eg. Seattle)" 
          className="w-full text-[1vw] outline-none flex-grow"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button 
        className="bg-tertiary text-white py-[0.4vw] px-[0.5vw] rounded-full text-[0.75vw]"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
