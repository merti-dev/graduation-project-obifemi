import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useAccountStore = defineStore('Account', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      this.user = (
        await axios.get('/accounts/session', {
          withCredentials: true
        })
      ).data
    },
    async login(email, password) {
      this.user = (
        await axios.post(
          '/accounts/session',
          { email, password },
          { withCredentials: true }
        )
      ).data
    },
    async logout() {
      await axios.delete('/accounts/session', {
        withCredentials: true
      })
      this.user = null
    }
    
  }
})
