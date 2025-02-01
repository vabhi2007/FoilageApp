import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
        console.log("Received messages:", messages);  // Log incoming request data

        const result = await streamText({
            model: openai("gpt-4"),
            messages,
        });
        console.log("AI Response:", result);  // Log the response

        return NextResponse.json({ text: result });
    } catch (error) {
        console.error("Error occurred:", error);  // Log any errors
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
}
