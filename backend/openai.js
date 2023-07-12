const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

async function askGPT(answer) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Hi, can you give me 1 recipe in HTML format based on the following info. No need to meet all the requirements: ${answer}`,
      },
    ],
  });
  // console.log(completion.data.choices[0].message);
  return completion.data.choices[0].message;
}

module.exports = { askGPT };
