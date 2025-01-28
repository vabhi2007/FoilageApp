import { useNavigation } from '../utils/navigation';
import Image from "next/image";
import Logo from "../assets/FoliageLogo.svg"
import Navlink from "./Navlink";
import Button from "./Button";

const Navbar = () => {

    const { navigateTo } = useNavigation();
    
    return (

        <div className="w-full h-[4vw] bg-white px-[4vw] py-[2vw] flex items-center justify-between shadow-lg" style={{fontFamily: 'Montserrat'}}>
            <Image
            src = {Logo}
            alt = "Logo"
            >
            </Image>

            <div className="flex items-center gap-[4vw]">
            <Navlink
                text = "Home"
                link = "https://www.youtube.com/watch?v=CJOZc02VwJM"
            />

            <Navlink
                text = "Careers"
                link = "https://www.youtube.com/watch?v=CJOZc02VwJM"
            />

            <Navlink
                text = "Portal"
                link = "https://www.youtube.com/watch?v=CJOZc02VwJM"
            />
            </div>

            <div>
            <Button text="Join / Sign In" onClick={() => navigateTo('/testing')} ></Button>
            </div>
        </div>
    );
};

export default Navbar;