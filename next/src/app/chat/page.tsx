'use client'
import "../../app/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState } from 'react';
import Chat from "../chat";




const ChatPage:React.FC = () => {
    return (
        <div>
            <Navbar/>
            <Chat/>
            <Footer/>
        </div>
    )
}

export default ChatPage