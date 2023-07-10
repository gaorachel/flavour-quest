const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

async function getResFromOpenAI() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "what the best british food?" }],
  });
  console.log(1, completion.data.choices[0].message);
}

getResFromOpenAI();
