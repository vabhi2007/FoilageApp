'use client'
import MobileNavBar from "./MobileNavBar"
import MobileSearchBar from "./MobileSearchBar"
import bg from "../../public/images/mobile home page bg.svg"
import searchIcon from "../../public/images/search icon.svg"
import MobileSignUpBox from "./MobileSignUpBox"
import MobilePopularJobs from "./MobilePopularJobs"
import MobileSidebar from "./MobileSidebar"
import { useState } from "react"
import { useRouter } from "next/router"

const MobileHomePage : React.FC = () => {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }



    return(
        <div>
            <div className="absolute bg-white w-full h-full" style={{zIndex:-2}}></div>
            <MobileNavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
            <img className="absolute w-full " style ={{zIndex:-1}} src={bg.src}>
            </img>
            <div className="ml-[15vw] text-white mt-[20vw] mb-[8vw]" style={{fontFamily:"Montserrat", fontSize:"6vw"}}>
                Welcome to Foliage.
            </div>
            <MobileSearchBar/>
            <MobileSignUpBox/>
            {/* <MobilePopularJobs/> */}

            <MobileSidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
        </div>

        
    )
}

export default MobileHomePage