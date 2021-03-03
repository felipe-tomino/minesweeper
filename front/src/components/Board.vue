<template>
  <div class="board">
    <div v-for="(row, rowIndex) of board" :key="rowIndex" class="row">
      <cell
        v-for="(cell, colIndex) of row"
        :key="colIndex"
        :content="cell.content"
        :status="cell.status"
        :exploded="cell.exploded"
        @open="$emit('open-cell', rowIndex, colIndex)"
        @toggle-flag="$emit('toggle-flag', rowIndex, colIndex)"
      />
    </div>
  </div>
</template>

<script>
import Cell from './Cell.vue'

export default {
  props: ['board'],
  components: { Cell }
}
</script>

<style scoped>
.board {
  padding: 15px;
  background-color: #3598db;
  display: inline-block;
}
.row {
  display: flex;
}
</style>
