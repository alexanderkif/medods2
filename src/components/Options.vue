<template>
  <div class="options" >
    <div :class="`options__status ${isGame?'':'options__status_game-over'}`">{{ status }}</div>
    <div :class="`${listenUser?'options__listen':'options__repeat'}`">
      {{ isGame ? listenUser ? 'Повторяем' : 'Слушаем' : '' }}
    </div>
    <div class="options__level">
      <div
        v-for="lev in $options.levels"
        :key="lev.index"
        @click="optObj.level = lev.wait"
      >
        <input class="options__input" type="radio" :value="lev.wait" v-model="optObj.level">
        <label>{{ lev.title }}</label>
      </div>
    </div>
    <div class="options__toggle-nine">
      <button :disabled="isGame" @click="optObj.nine=!optObj.nine">
        {{ optObj.nine ? 'Верни четыре!' : 'Дай девять!'}}
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
    level: Number,
    status: String,
    optObj: {
      nine: Boolean,
      level: Number
    }
  },
  levels: [
    { title: 'Легкий', wait: 1500 },
    { title: 'Средний', wait: 1000 },
    { title: 'Сложный', wait: 400 }
  ]
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
