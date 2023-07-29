import { Configuration, OpenAIApi } from "openai";

import type { Choices, Format } from "@/type";

export async function askGPT(data: Choices, format: Format) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Hi, can you give me 1 recipe based on the following info. No need to meet all the requirements: ${data}. . Here is the result format: ${JSON.stringify(
          format
        )}`,
      },
    ],
  });

  return JSON.parse(completion.data.choices[0].message?.content as string);
}
