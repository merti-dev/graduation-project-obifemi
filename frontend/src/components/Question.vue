<script>
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'Question',
  props: ['challenge', 'questionID', 'score'],
  data() {
    return {
      // challenge: null,
      // questionID: 0,
      message: ''
      // score: 0
      //this.answer
    }
  },
  methods: {
    async submitAnswer(e) {
      const answer = document.querySelector('input[name="answer"]:checked').value
      const { data: result } = await axios.post(
        `/challenges/${this.$route.params._id}/${this.questionID}`,
        { answer }
      )
      this.message = result.message
    }
  },
  async created() {
    // console.log('params:', this.$route.params)
    // const { data: challenge } = await axios.get(`/challenges/${this.$route.params._id}`)
    // // this.challenge = challenge.challenge
    // // this.questionID = challenge.questionID
    // console.log(this.challenge)
  }
}
</script>

<template lang="pug">
form(@submit.prevent="submitAnswer")
  fieldset
    legend {{challenge.questions[questionID].question}}
    div
      input#a(type='radio' name='answer' :value="challenge.questions[questionID].options[0]" checked='')
      label(for='a') {{challenge.questions[questionID].options[0]}}
    div
      input#b(type='radio' name='answer' :value= "challenge.questions[questionID].options[1]")
      label(for='b') {{challenge.questions[questionID].options[1]}}
    div
      input#c(type='radio' name='answer' :value= "challenge.questions[questionID].options[2]")
      label(for='c') {{challenge.questions[questionID].options[2]}}
    div
      input#d(type='radio' name='answer' :value= "challenge.questions[questionID].options[3]")
      label(for='d') {{challenge.questions[questionID].options[3]}}
    button(type='submit') Submit Answer

</template>
