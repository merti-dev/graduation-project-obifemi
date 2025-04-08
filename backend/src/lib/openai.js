// const { Configuration, OpenAIApi } = require('openai')

// require('dotenv').config()
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)

// module.exports = async function (name) {
//   this.name = name
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `Create a description for the language challenge by the following information:
//     Challenge Name: ${name}
//     `,
//     temperature: 0.5,
//     max_tokens: 60,
//     top_p: 1.0,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.0,
//   })
//   console.log({ name }, response.data.choices[0].text)
//   return response.data.choices[0].text || 'No response'
// }
