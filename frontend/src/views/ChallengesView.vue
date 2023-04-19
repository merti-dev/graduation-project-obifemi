<script setup>
import axios from 'axios'
const { data: challenges } = await axios.get('http://127.0.0.1:3000/challenges/')
</script>

<template>
  <div class="challenges">
    <h1>Challenges</h1>
    <ul>
      <li v-for="challenge in challenges" :key="challenge.id">
        The challange is:
        {{ challenge.challengesName }} and the attendees are {{ challenge.attendees[0].name }} and
        {{ challenge.attendees[1].name }}
      </li>
    </ul>
  </div>
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
