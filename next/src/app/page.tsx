'use client'

import "../app/globals.css";
import Navbar from "../app/components/Navbar";
import BackgroundImage from "../app/assets/BackgroundReducedNoise2.jpg";
import InfoTab from "../app/components/InfoTab";

import { AnimatedTestimonials } from "./components/animated-testimonials";
import { studentTestimonials, companyTestimonials } from "@/lib/utils";
import BagHandleIcon from "../app/assets/ionicons/bag-handle.svg";
import PeopleCircleIcon from "../app/assets/ionicons/people-circle.svg";
import BarChartIcon from "../app/assets/ionicons/bar-chart.svg";
import SearchBar from "../app/components/SearchBar";

import Footer from "../app/components/Footer";
import Slideshow from "./components/Slideshow";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>

      <div>
        <div className="relative">
          <img
            src={BackgroundImage.src}
            alt="Background"
            className="w-full h-[42vw] object-cover bg-black brightness-[0.65] overflow-hidden"
          />

          <div className="absolute inset-0 flex items-center justify-center text-white" style={{fontFamily: 'Montserrat'}}>
            <div className="text-center space-y-[3vw] mt-[-5vw]">
              <div className="space-y-[0.25vw]">
                <h1 className="text-[2.5vw] font-bold"> Tesla STEM Student Career Service </h1>
                <p className="text-[1.75vw]"> Jobs and internships made easy </p>
              </div>
              <SearchBar></SearchBar>
            </div>
          </div>
        </div>

        <Slideshow></Slideshow>

        <div className="mt-[8vw] mb-[10vw] mx-[8vw] space-y-[4vw]">
        {/*Main Content*/}

          <div className="text-[2.5vw]" style={{fontFamily: 'Montserrat'}}>
            <span className="text-tertiary">Nurturing</span>{' '}
            <span className="text-primary font-semibold">Connections,</span>{' '}
            <span className="text-tertiary">Cultivating</span>{' '}
            <span className="text-primary font-semibold">Success.</span>
          </div>

          <div className="gap-[3vw] flex flex-row">
            <InfoTab icon={BagHandleIcon} 
              title="Access to Opportunities" 
              text="We connect you to a curated list of internships and job opportunities tailored to your interests and skills." 
            ></InfoTab>

            <InfoTab icon={PeopleCircleIcon} 
              title="Employer Collaboration" 
              text="We provide employers with the tools to find passionate and talented individuals while ensuring students access legitimate, meaningful opportunities." 
            ></InfoTab>

            <InfoTab icon={BarChartIcon} 
              title="Growth and Development" 
              text="Your career growth is at the heart of Foliage. We’re here to nurture your development every step of the way." 
            ></InfoTab>
          </div>
          
          {/*End Main Content*/}
        </div>
      </div>

      <div className="text-[2.5vw] mb-[8vw] mx-[8vw] space-y-[4vw]" style={{fontFamily: 'Montserrat'}}>
            <span className="text-tertiary">Success for</span>{' '}
            <span className="text-primary font-semibold">Students,</span>{' '}
            <span className="text-tertiary">and</span>{' '}
            <span className="text-primary font-semibold">Employers.</span>

            <div className="flex gap-4">
              <AnimatedTestimonials testimonials={studentTestimonials} autoplay={true} />
              <AnimatedTestimonials testimonials={companyTestimonials} autoplay={true}/>
            </div>
      </div>

      <Footer></Footer>
    </div>
  );
}