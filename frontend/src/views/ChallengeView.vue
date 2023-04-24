<script>
import axios from 'axios'
export default {
  name: 'ChallengeView',
  data() {
    return {
      challenge: [],
      questionID: 0,
      message: '',
      score: 0,
      user: {}
    }
  },
  async created() {
    const { data: challenge } = await axios.get(`/challenges/${this.$route.params._id}`)
    this.challenge = challenge
    console.log(this.challenge)
  }
}
</script>

<template lang="pug">


h1 Welcome to German Challenge! Now you are in: {{challenge.challenge.questions[0].question}}


//working part in pug
  //- if message=='Correct'
  //-   h5.green Your Score is: #{score}
  //-   h2.green Correct!
  //-   a(href=`/challenges/${challenge._id}/${questionID+1}`) Next Question

  //- else if message=='Incorrect'

  //-   h2.red Incorrect!
  //-   a(href=`/challenges/${challenge._id}/${questionID+1}`) Next Question
  //- else

  //-   form(action=`/challenges/${challenge._id}/${questionID}` method='POST')
  //-     fieldset
  //-       legend= challenge.questions[questionID].question
  //-       div
  //-         input#a(type='radio' name='answer' value= challenge.questions[questionID].options[0] checked='')
  //-         label(for='a')= challenge.questions[questionID].options[0]
  //-       div
  //-         input#b(type='radio' name='answer' value= challenge.questions[questionID].options[1])
  //-         label(for='b')= challenge.questions[questionID].options[1]
  //-       div
  //-         input#c(type='radio' name='answer' value= challenge.questions[questionID].options[2])
  //-         label(for='c')= challenge.questions[questionID].options[2]
  //-       div
  //-         input#d(type='radio' name='answer' value= challenge.questions[questionID].options[3])
  //-         label(for='d')= challenge.questions[questionID].options[3]
  //-       input#Mert(type='hidden' name='userID' value= `${user._id}`)
  //-       button(type='submit') Submit Answer




  //- form(action=`/challenges/${challenge.challengesName}/attendees/Mert` method='POST')



  //-   fieldset
  //-     legend= challenge.questions[0].question
  //-     div
  //-       input#a(type='radio' name='drone' value='a' checked='')
  //-       label(for='a')= challenge.questions[0].options[0]
  //-     div
  //-       input#b(type='radio' name='drone' value='b')
  //-       label(for='b')= challenge.questions[0].options[1]
  //-     div
  //-       input#c(type='radio' name='drone' value='c')
  //-       label(for='c')= challenge.questions[0].options[2]
  //-     div
  //-       input#d(type='radio' name='drone' value='d')
  //-       label(for='d')= challenge.questions[0].options[3]


</template>
