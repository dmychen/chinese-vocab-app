const { OpenAI } = require('openai');
require('dotenv').config(); // for our api key in .env

// test route
exports.testRouter = (req, res) => {
  res.send({ message: "Hello from gpt tester route!" });
};

// create our openai class instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // provide configuration details, ie apikey
});

// generate text from req.body 
exports.generateText = async (req, res) => {
  const { content } = req.body;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: content }],
      model: 'gpt-3.5-turbo',
    });
    res.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};