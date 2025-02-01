import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));