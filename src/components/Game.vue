<template>
	<div>
		<div class="game">
			<ColorArea
				:class="nine ? 'game__area game__area_nine' : 'game__area'"
				v-for="(color, index) in colors"
				:key="index"
				:indx="index+1"
				:color="color"
			/>
		</div>
		<div class="options">
			<div :class="`options__status ${isGame?'':'options__status_game-over'}`">{{ status }}</div>
			<div :class="`${listenUser?'options__listen':'options__repeat'}`">
				{{ isGame ? listenUser ? 'Повторяем' : 'Слушаем' : '' }}
			</div>
			<div class="options__level">
				<div>
					<input class="options__input" type="radio" :value="1500" v-model="level">
					<label>Легкий</label>
				</div>
				<div>
					<input class="options__input" type="radio" :value="1000" v-model="level">
					<label>Средний</label>
				</div>
				<div>
					<input class="options__input" type="radio" :value="400" v-model="level">
					<label>Сложный</label>
				</div>
			</div>
			<div class="options__toggle-nine">
				<button :disabled="isGame" @click="nine=!nine">
					{{ nine ? 'Верни четыре!' : 'Дай девять!'}}
				</button>
			</div>
			<div class="options__start-button">
				<button :disabled="isGame" @click.prevent="startGame()">Начать игру</button>
			</div>
		</div>
	</div>
</template>

<script>
import ColorArea from './ColorArea'

export default {
	name: 'Game',
	components: {
		ColorArea
	},
  data() {
    return {
			level: 1500,
			isGame: false,
			chain: [],
			status: '',
			listenUser: false,
			currentStep: 0,
			timer: {},
			round: 1,
			nine: false
    }
	},
	created() {
		this.$root.$on('clickColorArea', this.checkChain)
	},
	beforeDestroy() {
		this.$root.$off('clickColorArea', this.checkChain)
	},
  methods: {
		startGame() {
			this.isGame = true
			this.chain = []
			this.round = 1
			this.nextRound()
		},
		nextRound() {
			this.status = `Раунд ${this.round}`
			this.currentStep = 0
			this.addRandomNumber()
			this.setListenUser(false)
			this.playChain(this.chain)
		},
		stopGame() {
			this.isGame = false
			this.chain = []
			this.currentStep = 0
			this.setListenUser(false)
		},
		checkChain(val) {
			if (!this.listenUser) { return }
			clearTimeout(this.timer)
			if (this.chain[this.currentStep] !== val) {
				this.stopGame()
				this.status = 'Ошибка'
				return false
			}
			if (this.chain.length - 1 === this.currentStep) {
				this.round++
				this.timer = setTimeout(() => {
					this.nextRound()
				}, this.level)
				return false
			}
			this.currentStep++
			this.timer = setTimeout(() => {
				this.stopGame()
				this.status = 'Таймаут'
			}, this.level)
		},
		playChain(chain) {
			if (!chain.length) {
				this.setListenUser(true)
				return
			}
			setTimeout(() => {
				this.playChain(chain.slice(1))
			}, this.level)
			this.$root.$emit('playChain', chain[0] )
		},
		setListenUser(boo) {
			this.listenUser = boo
			this.$root.$emit('listenUser', boo)
		},
		addRandomNumber() {
			this.chain.push(this.randomInteger(1, this.nine ? 9 : 4))
		},
		randomInteger(min, max) {
			let rand = min + Math.random() * (max + 1 - min);
			return Math.floor(rand);
		}
	},
	computed: {
		colors() {
			return this.nine ?
			['blue', 'red', 'green', 'orange', 'violet', 'yellow', 'lightgreen', 'coral', 'indigo'] :
			['blue', 'red', 'green', 'orange']
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

.game
	border-radius: 3rem
	border: 0
	overflow: hidden
	display: flex
	flex-wrap: wrap
	width: 18rem

	&__area
		width: 9rem
		height: 9rem

		&_nine
			width: 6rem
			height: 6rem

</style>
