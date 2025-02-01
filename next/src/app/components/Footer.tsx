import Logo from "../assets/FoliageLogo-White.svg"
import Image from "next/image"

const Footer = () => {
    return (
    <footer className="bg-primary text-white py-[4vw] bottom-0">
      <div className="w-full mx-auto px-[4vw]">
        {/* Footer content */}
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href = "">
                <Image src={Logo} alt="Logo" className="w-[8vw] h-auto"></Image>
            </a>
          </div>

          {/* Links Section */}
          <div className="flex space-x-[4vw]">

            <div>
              <h2 className="font-semibold text-[1vw]"><a href="/citations">Citations</a></h2>
            </div>

            <div>
              <h2 className="font-semibold text-[1vw]"><a href="https://github.com/vabhi2007/JobFinderWebsite" target="_blank" rel="noopener noreferrer">GitHub</a></h2>
            </div>

          </div>
        </div>

        {/* Line Separator */}
        <hr className="my-[2vw] border-white" />

        {/* Copyright Section */}
        <div className="text-center text-[1vw]">
          <span>© 2024 Your Company. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer