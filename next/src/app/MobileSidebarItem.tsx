"use client"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"

interface ISideBarItem {
    name: string,
    icon: LucideIcon,
    path: string
}

const MobileSideBarItem = ({item} : {item: ISideBarItem}) => {
    const {name, icon:Icon, path} = item 

    const router = useRouter();
    const pathname = usePathname();

    const onClick = () =>{
        router.push(path)
    }

    const isActive = useMemo(() =>{
        return path === pathname
    }, [path, pathname])

    return(
        <div className={'flex items-center gap-x-[3vw] p-3 hover:bg-gray-200 rounded-lg '}
            onClick={onClick}
        >
            <Icon/>
            <p className="text-[4vw]" style={{fontFamily:"Montserrat"}}>
                {name}
            </p>
            
        </div>
    )
} 

export default MobileSideBarItem