import OpenAI from "openai";
import { streamText} from 'ai'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
  

const openai = new OpenAI({
  apiKey: "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",
});

export async function POST (req:Request) {
    try {

        if (!openai.apiKey){
            return new NextResponse('Missing OpenAI API Key.', {status: 400})
        }
        const { messages} = await req.json()
        if (!messages){
            return new NextResponse("Missing Messages in Request", {status: 400})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            stream: true,
            messages
          });

          let responseText = '';

          for await ( const chunk of response ) {
            if (chunk.choices && chunk.choices[0]?.delta?.content) {
                responseText += chunk.choices[0].delta.content
            }
          }

          return new NextResponse(responseText)
          
    } catch (error: any) {
        return new NextResponse("Internal Server Error", {status: 500})
    }
}


