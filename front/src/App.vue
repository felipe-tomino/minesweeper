<template>
  <div>
    <div>
      <input v-model.number="rows" type="number" />
      <input v-model.number="cols" type="number" />
      <input v-model.number="bombs" type="number" />
      <button @click="generateNewGame" >Novo jogo</button>
      
      <span v-if="won">Ganhou!</span>
      <span v-else-if="died">Morreu!</span>
      <span v-else>Jogando!</span>
    </div>
    <Board
      :board="board"
      @open-cell="openCell"
      @toggle-flag="toggleFlag"
    />
  </div>
</template>

<script>
import Board from './components/Board.vue'
import { generateFullGame, openCell } from './app/minesweeper'

export default {
  components: { Board },
  name: 'App',
  data() {
    return {
      board: [],
      died: false,
      rows: 3,
      cols: 3,
      bombs: 2,
    }
  },
  created () {
    this.generateNewGame()
  },
  computed: {
    won () {
      for (const row of this.board) {
        for (const cell of row)
          if (!['bomb', ''].includes(cell.content) && cell.status !== 'open')
            return false;
      }
      return true;
    },
    cannotPlay () {
      return this.won || this.died;
    }
  },
  methods: {
    openCell(x, y) {
      if (this.cannotPlay) return;
      if (this.board[x][y].status === 'flagged') return;

      const { game: newBoard, died } = openCell(this.board, x, y);
      this.board = newBoard;
      this.died = died
      this.board[x][y].exploded = died
    },
    toggleFlag(x, y) {
      if (this.cannotPlay) return;
      
      if (this.board[x][y].status === 'flagged') {
        this.board[x][y].status = 'closed';
      } else if (this.board[x][y].status === 'closed') {
        this.board[x][y].status = 'flagged';
      }
    },
    generateNewGame() {
      this.died = false;
      this.board = generateFullGame(this.rows, this.cols, this.bombs);
    }
  }
}
</script>
