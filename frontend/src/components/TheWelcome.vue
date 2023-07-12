<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import axios from 'axios'

const { data: challenges } = await axios.get('/challenges/')
</script>

<template>
  <h1>Challenges</h1>
  <ul>
    <li v-for="challenge in challenges" :key="challenge.id">
      {{ challenge.level }}
    </li>
  </ul>

</template>
