<script>
import Question from '../components/Question.vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
export default {
  name: 'ChallengeView',
  data() {
    return {
      challenge: null,
      questionID: 0,
      message: '',
      score: 0
      //this.answer
    }
  },
  components: {
    RouterLink,
    Question
  },
  methods: {
    async submitAnswer(e) {
      const answer = document.querySelector('input[name="answer"]:checked').value
      const { data: result } = await axios.post(
        `/challenges/${this.$route.params._id}/${this.questionID}`,
        { answer }
      )
      console.log(result)
      this.message = result.message
      this.score = result.score
      this.questionID = result.questionID
    },
    resetMessage() {
      this.message = ''
      this.questionID = this.questionID + 1
    }
  },
  async created() {
    console.log('params:', this.$route.params)
    const { data: challenge } = await axios.get(`/challenges/${this.$route.params._id}`)
    this.challenge = challenge.challenge
    this.questionID = challenge.questionID
    console.log(this.challenge)
  }
}
</script>

<template lang="pug">
div(v-if="challenge")
  h1 Welcome to German Challenge! Now you are in: {{challenge.challengesName}}

  div(v-if="message=='correct'")
    h5.green Your Score is: {{score}}
    h2.green Correct!
    //- RouterLink(:to="`/challenges/${challenge._id}/${questionID+1}`") Next Question
    button(@click="resetMessage") Next Question

  div(v-else-if="message=='incorrect'")
    h2.red Incorrect!
    //- RouterLink(:to="`/challenges/${challenge._id}/${questionID+1}`") Next Question
    button(@click="resetMessage") Next Question

  div(v-else)
    //- Question(:challenge="challenge" :questionID="questionID" :score="score")
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
