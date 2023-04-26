<script>
import { useAccountStore } from '../stores/account'
import { mapState } from 'pinia'

export default {
  name: 'MyChallengesView',
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template lang="pug">
h1 My Challenges: {{ user?.challenges }}
ul(v-if="user")
  li(v-for="challenge in user.challenges" :key="challenge._id")
    router-link(:to="`/challenges/${challenge._id}`") {{challenge.challengesName}}
</template>
