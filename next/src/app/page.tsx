'use client'

import "../app/globals.css";
import Navbar from "../app/components/Navbar";
import BackgroundImage from "../app/assets/BackgroundImage.svg";
import BackgroundVideo from "next-video/dist/cjs/components/background-video.js";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>

      <Image
        src = {BackgroundImage}
        className = "w-full h-[36vw] object-cover bg-black brightness-[0.65]"
        alt = "Background"
      >
      </Image>

    </div>
  );
}