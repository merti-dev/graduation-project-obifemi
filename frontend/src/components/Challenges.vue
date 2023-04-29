<script>
import ChallengeItem from './ChallengeItem.vue'

export default {
  name: 'Challenges',
  components: {
    ChallengeItem
  },
  props: ['challenges']
}
</script>

<template lang="pug">
.challenges
  h1 Challenges
  ul
    li(v-for="challenge in challenges" :key="challenge._id")
        //- ChallengeItem(:challenge="challenge")
        ChallengeItem(:challenge="challenge")

</template>
