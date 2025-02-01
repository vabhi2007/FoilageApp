"use client"
import { AlignJustify } from "lucide-react"
import { LucideIcon } from "lucide-react"
import leaf from "../../public/images/leaf.svg"
import Home from "./page"
import React, { ReactNode, useState } from "react"
import { House } from 'lucide-react';
import { Sprout } from 'lucide-react';
import { UserSearch } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { MessageCircle } from "lucide-react"
import MobileSideBarItem from "./MobileSidebarItem"



const items = [
    {
        name: "Home",
        icon: House,
        path: "/"
    },
    {
        name:"Portal",
        icon: Sprout,
        path: "/portal"
    },
    {
        name:"Career",
        icon: UserSearch,
        path: "/careers"
    },
    {
        name:"Sign In",
        icon: LogIn,
        path: "/signIn"
    },
    {
        name:"Chat",
        icon: MessageCircle,
        path: "/chat"
    },
]

interface SidebarProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
  }

const MobileSidebar: React.FC<SidebarProps> = ({toggleSidebar, isSidebarOpen}) =>{



    return (

    <div>
        {isSidebarOpen ? (
        <div className={`fixed  top-0 z-10 right-0 pt-[4.5vw] p-[4vw] flex flex-col justify-self-end bg-white h-screen w-[40vw] shadow-md " `}>
            
                <div>
                    <div className="flex justify-end rounded-[2vw]" >
                            <AlignJustify className="hover:bg-gray-200 rounded-[2vw] p-[1vw] " color={"#727272"} onClick={toggleSidebar} size={45}/>
                    </div>
                    
                    <div className="mt-[8vw] space-y-[2vw]">
                        {items.map(item => (
                            // <p key={item.path}>
                            //     {item.name}
                            // </p>
                            <MobileSideBarItem key={item.path} item={item}/>
                        ))}
                    </div>
                </div>

            
        </div>
    ) : (
        <div></div>
    )}
    </div>
    )
}

export default MobileSidebar