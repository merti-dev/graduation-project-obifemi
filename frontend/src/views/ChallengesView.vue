<script setup>
import axios from 'axios'
// import ChallengesDetail from '../components/ChallengesDetail.vue'
import Counter from '../components/Counter.vue'
import CounterOptionsApiVue from '../components/CounterOptionsApi.vue'
import ChallengeItem from '../components/ChallengeItem.vue'
import { useAccountStore } from '../stores/account'
import Challenges from '../components/Challenges.vue'

const { data: challenges } = await axios.get('/challenges/')
const userStore = useAccountStore()
</script>

<template lang="pug">
<Counter name="Composition Api 1"  />
<Counter name="Composition Api 2"  />

Challenges(:challenges = "challenges")
//- <CounterOptionsApiVue name="Option Api"  />
//- <ChallengesDetail challengedetails="challengesssss" />


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
