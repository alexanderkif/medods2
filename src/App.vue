<template>
  <div id="app">
    <Game class="flex-center"/>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Game
  }
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

body
	margin: 0

.flex-center
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap-reverse

</style>
