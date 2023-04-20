<script>
export default {
  name: 'ChallengeItem',
  props: {
    challenge: {
      type: Object,
      required: true
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
</template>
