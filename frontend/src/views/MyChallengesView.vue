<script>
import { useAccountStore } from '../stores/account'
import { mapState } from 'pinia'
import ChallengeItem from '../components/ChallengeItem.vue'

export default {
  name: 'MyChallengesView',
  components: {
    ChallengeItem
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template lang="pug">
h1 {{ user?.name }}'s Challenges:
ul(v-if="user")
  li(v-for="challenge in user.challenges" :key="challenge._id")
    ChallengeItem(:challenge="challenge")
</template>
