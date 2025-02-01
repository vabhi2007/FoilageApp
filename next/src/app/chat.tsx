'use client ' 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useChat} from "ai/react"
import { SendHorizontalIcon } from 'lucide-react';

const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading, error} =
        useChat()
    return(
        <section className="text-zinc-700">
            <div className="container flex h-screen flex-col items-center justify-center">
                <h1 className="font-serif text-[10vw] font-medium">
                    LeafBot
                </h1>
                <div className="mt-[50vw] w-full max-w-lg"> 
                    {/* response container */}
                    {/* input form */}
                    <form onSubmit={handleSubmit} className="relative">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask me anything about internships..."
                            className="pr-12 placeholder:italic placeholder:text-zinc-600"
                        />
                        <Button
                            size = "icon"
                            type = "submit"
                            variant = "secondary"
                            disabled = {isLoading}
                            className = "absolute right-1 top-1 h-8 w-10"
                        />
                        <SendHorizontalIcon className="h-5 w-5 text-emerald-500"/>
                    </form>
                </div>           
            </div>
        </section>
    )
}

export default Chat
