<template>
  <h1>ScoreBoard</h1>
  <ul>
    <li v-for="score in scoreBoard" :key="score._id">{{ score.name }} - {{ score.score }}</li>
  </ul>
</template>

<script>
import axios from 'axios'
import { socket } from '../stores/socket'

export default {
  data() {
    return {
      scoreBoard: []
    }
  },
  async created() {
    await this.getScoreBoard()

    socket.on('score:updated', ({ user }) => {
      console.log('score:updated')

      // if (this.scoreBoard.length == 10 && user.score < this.scoreBoard[this.scoreBoard.length - 1])
      // return

      // let indexToInsert = this.scoreBoard.findIndex((score, index) => score.score < user.score)

      // this.scoreBoard.splice(indexToInsert, 0, user)
      // this.scoreBoard = this.scoreBoard.slice(0, 10)
      // this.scoreBoard.pop()

      let indexOfUser = this.scoreBoard.findIndex((score) => score._id == user._id)

      if (indexOfUser == -1) {
        this.scoreBoard.push(user)
      } else {
        this.scoreBoard[indexOfUser] = user
      }

      this.scoreBoard.sort((a, b) => b.score - a.score)
      this.scoreBoard = this.scoreBoard.slice(0, 10)
    })
  },
  methods: {
    async getScoreBoard() {
      const { data: scoreBoard } = await axios.get('/analytics/leaderboard')
      this.scoreBoard = scoreBoard
    }
  }
}
</script>
