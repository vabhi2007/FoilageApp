import leaf from "../../public/images/leaf.svg"
import avatar from "../../public/images/avatar icon.svg"
import menu from "../../public/images/mobile menu.svg"
import { AlignJustify } from "lucide-react";
import React, { ReactNode, useState } from "react"
import { useRouter } from "next/navigation";

interface MobileNavBarProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({toggleSidebar, isSidebarOpen})  => {

    const router = useRouter()
    const onAvatarClick = () => {
        router.push("/signIn")
    }
    const onLeafClick = () => {
        router.push("/")
    }
    

    return(
        <nav className="  bg-white py-[4vw] pl-[6vw] pr-[4vw] drop-shadow-md">
            
                <div className="flex grid-row justify-between items-center h-[10vw] ">

                    <img src={leaf.src} className="h-full max-h-full" onClick={onLeafClick}/>
                    <div className="flex items-center gap-[4vw] h-full max-h-full">
                        <img src={avatar.src} className="h-full max-h-full" onClick={onAvatarClick}/>
                        {!isSidebarOpen ?  (
                        <AlignJustify className="p-[1vw] hover:bg-gray-200 rounded-[2vw]" size={45} onClick={toggleSidebar} color="#727272"/>
                            ) : (
                                <div>
            
                                </div>
                            )
                        }
                    </div>
                    
                </div>

        </nav>
    );
}

export default MobileNavBar