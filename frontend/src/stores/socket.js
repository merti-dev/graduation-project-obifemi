import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const socket = io(
  import.meta.env.NODE_ENV === 'production' ? 'https://api.mertin.info' : 'http://127.0.0.1:3000'
)

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
