<template>
  <div class="options" >
    <div :class="`options__status ${isGame?'':'options__status_game-over'}`">{{ status }}</div>
    <div :class="`${listenUser?'options__listen':'options__repeat'}`">
      {{ isGame ? listenUser ? 'Повторяем' : 'Слушаем' : '' }}
    </div>
    <div class="options__level">
      <div>
        <input class="options__input" type="radio" :value="1500" v-model="level" @change="$emit('change-level', level)">
        <label>Легкий</label>
      </div>
      <div>
        <input class="options__input" type="radio" :value="1000" v-model="level" @change="$emit('change-level', level)">
        <label>Средний</label>
      </div>
      <div>
        <input class="options__input" type="radio" :value="400" v-model="level" @change="$emit('change-level', level)">
        <label>Сложный</label>
      </div>
    </div>
    <div class="options__toggle-nine">
      <button :disabled="isGame" @click="clickNine">
        {{ nine ? 'Верни четыре!' : 'Дай девять!'}}
      </button>
    </div>
    <div class="options__start-button">
      <button :disabled="isGame" @click="$emit('start-game')">Начать игру</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Option',
  props: {
    listenUser: Boolean,
    isGame: Boolean,
    status: String
  },
  data() {
    return {
      level: 1500,
      nine: false
    }
  },
  created() {
    this.$emit('change-level', this.level)
  },
  methods: {
    clickNine () {
      this.nine = !this.nine
      this.$emit('click-nine', this.nine)
    }
  }
}
</script>

<style lang="sass" >
$radius: 5rem
$opacity: 0.4

.options
	width: 10rem

	&__toggle-nine,
	&__level,
	&__start-button
		width: fit-content
		margin: 1rem auto

	&__input
		margin-bottom: 1rem

	&__status
		color: blue
		text-align: center
		font-size: 1.3rem
		height: 2rem
		margin: 0.5rem 0

		&_game-over
			color: red

	&__listen,
	&__repeat
		text-align: center
		font-size: 1rem
		height: 2rem

	&__listen
		color: lightgreen

	&__repeat
		color: red

</style>
