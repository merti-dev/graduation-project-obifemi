import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('User', {
  actions: {
    async signup(name, level, email, password) {
      await axios.post('/users', { name, level, email, password })
    },
    async joinChallenge(challengeId) {
      const challenge = await axios.post(`/users/challenges/${challengeId}/attendees`)

      return challenge
    }
  }
})
