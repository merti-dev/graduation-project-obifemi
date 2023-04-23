<script setup>
import axios from 'axios'
import ChallengesDetail from '../components/ChallengesDetail.vue'
import Counter from '../components/Counter.vue'
import CounterOptionsApiVue from '../components/CounterOptionsApi.vue'
import ChallengeItem from '../components/ChallengeItem.vue'
const { data: challenges } = await axios.get('http://127.0.0.1:3000/challenges/')
</script>

<template lang="pug">
<Counter name="Composition Api 1"  />
<Counter name="Composition Api 2"  />

//- <CounterOptionsApiVue name="Option Api"  />
//- <ChallengesDetail challengedetails="challengesssss" />
.challenges
  h1 Challenges
  ul
    li(v-for="challenge in challenges" :key="challenge._id")
        //- ChallengeItem(:challenge="challenge")
        <ChallengeItem :challenge="challenge" />

    //- li(v-for="challenge in challenges" :key="challenge._id")
    //-   RouterLink(:to="`/challenges/${challenge._id}`")
    //-     | {{ challenge.challengesName }} - {{ challenge.level }}
    //-   p {{ challenge.attendees.length }} people are attending

</template>

<style scoped>
h1 {
  color: #3eaf7c;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
.challenges {
  display: block;
}
</style>
