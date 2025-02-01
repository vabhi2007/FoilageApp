'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import CitationsImg from "../../../public/FoliageCitations.jpg";
import Image from "next/image";

export default function Citations() {
  
  return (
    <div>
      <Navbar></Navbar>

      <div className='w-full flex items-center justify-center p-[1vw] bg-secondary'>
        <Image src={CitationsImg} alt="Citations" className="w-[50vw] h-auto"></Image>
      </div>

      <Footer></Footer>
    </div>
  );
}
