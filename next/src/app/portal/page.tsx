'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import CareersImage from "../../app/assets/CareersImage.svg";
import Image from "next/image";
import InfoTab from "../../app/components/InfoTab";
import Button from "../../app/components/Button";
import Dropdown from "../../app/components/Dropdown";
import BagHandleIcon from "../../app/assets/ionicons/bag-handle.svg";
import PeopleCircleIcon from "../../app/assets/ionicons/people-circle.svg";
import BarChartIcon from "../../app/assets/ionicons/bar-chart.svg";
import Footer from "../../app/components/Footer";
import JobList from '../../app/components/JobList';
import React, { useState } from 'react';

export default function Portal() {
  return (
    <div>
      <Navbar></Navbar>

      <div className="w-full h-[40vw] px-[10vw] py-[5vw] bg-secondary flex items-center justify-center">

            <div className="w-full h-full bg-white "></div>    

      </div>

      <Footer></Footer>
    </div>
  );
}
