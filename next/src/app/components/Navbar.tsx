import { useNavigation } from '../utils/navigation';
import Image from "next/image";
import Logo from "../assets/FoliageLogo.svg"
import Navlink from "./Navlink";
import Button from "./Button";
import { GET_ME } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { adminRef, employerRef, jobSeekerRef } from "../utils/consts";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserIcon from "../../app/assets/StudentIcon.svg";


const Navbar = () => {
    const router = useRouter();

    const { navigateTo } = useNavigation();
    const { data: userdata, loading: userloading, error: usererror, refetch: refetchMe } = useQuery(GET_ME);
    const [userType, setUserType] = useState<string>("employer");

    const handleSignUpClick = () => {
        console.log("User Data:", userdata);
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signIn"); // Redirect if not logged in
        }
        if (userdata?.me?.userType) {
          setUserType(userdata.me.userType);
        }
      }
    
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
            {userType === jobSeekerRef || userType === employerRef || userType === adminRef ? (
                <Image src = {UserIcon} alt="Icon Image" className='cursor-pointer' onClick={() => router.push('/portal')}></Image>
            ) : (
                <Button text="Join / Sign In" onClick={handleSignUpClick} ></Button>
            )}
            
            </div>
        </div>
    );
};

export default Navbar;