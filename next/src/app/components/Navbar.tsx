import { useNavigation } from '../utils/navigation';
import Image from "next/image";
import Logo from "../assets/FoliageLogo.svg"
import Navlink from "./Navlink";
import Button from "./Button";
import { GET_ME } from '@/graphql/queries';
import { useQuery } from '@apollo/client';

const Navbar = () => {

    const { navigateTo } = useNavigation();
    const { data: medata, loading, error } = useQuery(GET_ME);
    
    return (

        <div className="w-full h-0 bg-white px-[8vw] py-[1.75vw] flex items-center justify-between shadow-lg" style={{fontFamily: 'Montserrat'}}>
            <a href = "">
                <Image
                src = {Logo}
                className='w-[8vw] h-auto'
                alt = "Logo"
                >
                </Image>
            </a>

            <div className="flex items-center gap-[4vw]">
            <Navlink
                text = "Home"
                link = "/"
            />

            <Navlink
                text = "Careers"
                link = "/careers"
            />

            <Navlink
                text = "Portal"
                link = "/portal"
            />
            </div>

            <div>
            <Button text="Join / Sign In" onClick={() => navigateTo('/signIn')} ></Button>
            </div>
        </div>
    );
};

export default Navbar;