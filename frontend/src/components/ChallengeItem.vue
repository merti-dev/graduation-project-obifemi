<script>
import { useUserStore } from '../stores/user'
import { mapActions } from 'pinia'
import axios from 'axios'
const { data: challenges } = await axios.get('/challenges/')
export default {
  name: 'ChallengeItem',
  props: {
    challenge: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(useUserStore, ['joinChallenge']),
    async doJoinChallenge() {
      await this.joinChallenge(this.challenge._id)

      this.$router.push(`/challenges/${this.challenge._id}`)
    }
  }
}
</script>

<template lang="pug">
li
    <router-link :to="`/challenges/${challenge._id}`">
      | {{ challenge.challengesName }} - {{ challenge.level }}
    </router-link>
    <p>{{ challenge.attendees.length }} people are attending</p>
    <p>{{ challenge.description }} asdsad</p>
    button(@click="doJoinChallenge") JOIN
</template>
