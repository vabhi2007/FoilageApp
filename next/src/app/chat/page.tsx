'use client'
import "../../app/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState , useEffect, use} from 'react';
import { useChat } from "ai/react";
import { EnhancedGenerateContentResponse, GoogleGenerativeAI} from "@google/generative-ai"
import ChatHistory from "../components/ChatHistory";
import Loading from "../components/Loading";
import MobileNavBar from "../MobileNavBar";
import MobileSidebar from "../MobileSidebar";

export interface ChatMessage {
    type: "user" | "bot"; // You can expand this with other types if needed.
    content: string; // Or other properties depending on your use case.
  }

export default function Chat() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }

    const [userInput, setUserInput] = useState("")
    const[chatHistory, setChatHistory] = useState<ChatMessage[]>([])
    const[isLoading, setIsLoading] = useState(false)

    const genAI = new GoogleGenerativeAI("AIzaSyDoULbSsVPia3BGA0ZKaTDqo_eWQ5gFVaI")
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

    const handleUserInput = (e : any) => {
        setUserInput(e.target.value);
    }

    const sendMessage = async () => {

        try{
            const result = await model.generateContent(userInput)
            
            const response = await result.response

            console.log(response)
            setChatHistory([
                ...chatHistory, 
                {type:"user", content: userInput },
                {type:"bot", content: response.text()} ,
            ])
        }catch {
            console.error("Error sending message")
        }finally{
            setUserInput("")
            setIsLoading(false)
        }

    }

    const clearChat = () => {
        setChatHistory([])
    }
    return (
        <div>
            <div className="absolute bg-white w-full h-full" style={{zIndex:-2}}></div>
            <MobileNavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
            <MobileSidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
            <div className="container mx-auto px-5 py-8" style={{fontFamily:"Montserrat"}}>
            
                <h1 className="text-3xl font-bold text-center mb-4 text-[#256963] " >LeafBot</h1>
                <div className="text-xl font-bold text-center mb-4 text-black " >Try out our internship helper LeafBot!</div>

                <div className="chat-container rounded-lg shadow-md p-4">
                    <ChatHistory chatHistory={chatHistory}/>
                    <Loading isLoading={isLoading}/>
                </div>
                <div className="flex mt-4">
                    <input
                        type="text"
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Ask me any internship questions..."
                        value={userInput}
                        onChange={handleUserInput}
                    />
                    <button 
                        className="px-4 py-2 ml-2 rounded-lg bg-[#36ABA1] text-white hover:bg-[#256963]"
                        onClick={sendMessage}
                        disabled={isLoading}
                    >
                        Send
                    </button>
                </div>
                <button
                    className="mt-4 block px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-600 text-white"
                    onClick={clearChat}
                >
                    Clear Chat
                </button>
            </div>
        </div>
    )
}


