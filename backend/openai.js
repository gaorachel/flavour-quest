const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

async function askGPT(data, format) {
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

  return JSON.parse(completion.data.choices[0].message?.content);
}

module.exports = { askGPT };
