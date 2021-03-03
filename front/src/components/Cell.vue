<template>
  <div
    class="cell"
    :class="{
      '-explodedbomb': exploded,
      '-open': status==='open' && content !== 'bomb',
      '-flag': status==='flagged',
      '-number': status==='open' && isNumber
    }"
    :style="{ color: textColor }"
    @click.left="$emit('open')"
    @click.right.prevent="$emit('toggle-flag')"
  >
    {{ contentSymbol }}
  </div>
</template>

<script>
export default {
  props: {
    exploded: Boolean,
    content: String, // 'bomb', '', '2'
    status: String // 'open', 'closed', 'flagged'
  },
  computed: {
    contentSymbol () {
      if (this.status === 'closed') return '';
      if (this.status === 'flagged') return '🚩';
      if (this.content === 'bomb') return '💣';
      return this.content;
    },
    textColor () {
      if (!this.isNumber) return '';
      const colors = ['blue', 'green', 'red', 'purple', 'black', 'gray', 'maroon', 'turquoise']
      return colors[this.content - 1];
    },
    isNumber () {
      return Number.isInteger(this.content);
    }
  }
}
</script>

<style scoped>
.cell {
  border: none;
  display: flex;
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: #87cefa;
  border-radius: 5px;
  margin: 2px;
  font-size: 20px;
  font-weight: bold;
}
.cell.-number {
  font-size: 28px;
}
.cell.-open {
  background-color: white;
}
.cell.-flag {
  background-color: #f1c40f;
}
.cell.-explodedbomb {
  background-color: #F47979;
}
</style>
