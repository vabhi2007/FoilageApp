'use client'

import { useState } from "react";
import MobileNavBar from "./MobileNavBar"
import MobileSidebar from "./MobileSidebar"

const MobileSignInPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }

    return(
        <div>
            <div className="absolute bg-white w-full h-full" style={{zIndex:-2}}></div>
            <MobileNavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
            <MobileSidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
        </div>
    )
}

export default MobileSignInPage