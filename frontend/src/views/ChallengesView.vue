<script>
import axios from 'axios'
// import ChallengesDetail from '../components/ChallengesDetail.vue'
import { useUserStore } from '../stores/user'
import { mapActions } from 'pinia'
import { socket } from '../stores/socket'

// const { data: challenges } = await axios.get('/challenges/')
// const userStore = useAccountStore()
// const userStore = useUserStore()
// const doJoinChallenge = async () => {
//   await userStore.joinChallenge(challenge._id)
// }

export default {
  name: 'ChallengesView',
  data() {
    return {
      challenges: []
    }
  },
  async created() {
    await this.getChallenge()

    socket.on('challenge:joined', ({ challenge }) => {
      console.log('challenge:joined', challenge)
      this.challenges = this.challenges.map((c) => {
        if (c._id === challenge._id) {
          return challenge
        }
        return c
      })
    })
  },

  methods: {
    ...mapActions(useUserStore, ['joinChallenge']),
    async doJoinChallenge(challenge_id) {
      await this.joinChallenge(challenge_id)

      // this.$router.push(`/challenges/${challenge_id}`)
    },
    async getChallenge() {
      const { data: challenges } = await axios.get('/challenges/')
      this.challenges = challenges
    }
  }
}
</script>

<template lang="pug">
//- <Counter name="Composition Api 1"  />
//- <Counter name="Composition Api 2"  />

//- Challenges(:challenges = "challenges")
//- <CounterOptionsApiVue name="Option Api"  />
//- <ChallengesDetail challengedetails="challengesssss" />


li(v-for="challenge in challenges" :key="challenge._id")
  RouterLink(:to="`/challenges/${challenge._id}`")
    | {{ challenge.challengesName }} - {{ challenge.level }}
  p {{ challenge.attendeeCount }} people are attending
  button(@click="doJoinChallenge(challenge._id)") JOIN

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
