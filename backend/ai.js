const { Configuration, OpenAIApi } = require('openai')

dotenv = require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
async function main() {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Create an analogy for this phrase:\n\nQuestions are arrows in that:',
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
  console.log(response.data)
}
main()
