import React from "react";
import ReactMarkdown from "react-markdown";
import {  ChatMessage } from "@/app/chat/page"

interface ChatHistoryProps {
    chatHistory: ChatMessage[];
  }

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((message: any, index: any) => (
        <div
          key={index}
          className={`flex items-start flex-col py-2 px-4 my-[3vw] rounded-lg ${
            message.type === "user"
              ? "bg-gray-100 text-gray-800"
              : "bg-[#256963] text-white"
          }`}
        >
          {message.type === "user" && (
            <div className="mr-2 font-bold text-gray-600 " >You:</div>
          )}
          {message.type === "bot" && (
            <span className="mr-2 font-bold text-white mb-[3vw]">LeafBot:</span>
          )}

          <div>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;
