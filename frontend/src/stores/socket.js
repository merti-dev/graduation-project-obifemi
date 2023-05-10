import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
console.log('socket env: ', import.meta.env)
export const socket = io(import.meta.env.VITE_API_URL)

export const useSocketStore = defineStore('Socket', {
  state: () => ({
    connected: false
  }),
  actions: {
    init() {
      socket.on('connect', () => {
        this.connected = true
        console.log('connected')
      })

      socket.on('disconnect', () => {
        this.connected = false
        console.log('disconnected')
      })
    }
  }
})
