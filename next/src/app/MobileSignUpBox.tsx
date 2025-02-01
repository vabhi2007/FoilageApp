'use client'

import { useRouter } from "next/navigation"

const SignUpBox:React.FC = () =>{
    
    const router = useRouter()

    const onSignUpClick = () =>{
        router.push("/signIn")
    }

    return(
        <div className="flex justify-center mt-[55vw] py-[3vw] rounded-[2vw] mx-[10vw] bg-[#023A22]">
            <div className="flex flex-col items-center justify-center">
                <div className="text-[3vw] text-white" style={{fontFamily: "Montserrat"}}>
                    Create an account and join now
                </div>
                <div className="text-[3vw] p-[2vw] text-white rounded-[1vw] mt-[3vw] bg-[#00834D] hover:bg-[#005C36]" style={{fontFamily: "Montserrat"}} onClick={onSignUpClick}>
                    Sign Up
                </div>
            </div>
        </div>
    )
}

export default SignUpBox