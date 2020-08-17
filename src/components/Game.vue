<template>
	<div>
		<div class="game">
			<div class="row">
				<div class="col blue" ref="blue" @click.prevent="checkChain(1)"></div>
				<div class="col red" ref="red" @click.prevent="checkChain(2)"></div>
			</div>
			<div class="row">
				<div class="col yellow" ref="yellow" @click.prevent="checkChain(3)"></div>
				<div class="col green" ref="green" @click.prevent="checkChain(4)"></div>
			</div>
		</div>
		<div class="options">
			<div :class="`status ${isGame?'':'game-over'}`">{{ status }}</div>
			<div :class="`${listenUser?'listen':'repeat'}`">
				{{ isGame ? listenUser ? 'Повторяем' : 'Слушаем' : '' }}
			</div>
			<div class="level">
				<input type="radio" :value="1500" v-model="level">
				<label>Легкий</label>
				<br>
				<input type="radio" :value="1000" v-model="level">
				<label>Средний</label>
				<br>
				<input type="radio" :value="400" v-model="level">
				<label>Сложный</label>
			</div>
			<div class="start-button">
				<button :disabled="isGame" @click.prevent="startGame()">Начать игру</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Game',
  data() {
    return {
			level: 1500,
			isGame: false,
			chain: [],
			status: '',
			listenUser: false,
			currentStep: 0,
			timer: {},
			round: 1
    }
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
			this.listenUser = false
			this.playChain(this.chain)
		},
		stopGame() {
			this.isGame = false
			this.chain = []
			this.currentStep = 0
			this.listenUser = false
		},
		pushButton(val) {
			if (!this.isGame) { return }
			this.playSound(val)
			switch (val) {
				case 1:
					this.opacityElement(this.$refs.blue)
					break;
				case 2:
					this.opacityElement(this.$refs.red)
					break;
				case 3:
					this.opacityElement(this.$refs.yellow)
					break;
				case 4:
					this.opacityElement(this.$refs.green)
					break;
				default:
					break;
			}
		},
		checkChain(val) {
			if (!this.listenUser) { return }
			clearTimeout(this.timer)
			this.pushButton(val)
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
				this.listenUser = true
				return
			}
			setTimeout(() => {
				this.playChain(chain.slice(1))
			}, this.level)
			this.pushButton(chain[0])
		},
		addRandomNumber() {
			this.chain.push(this.randomInteger(1,4))
		},
		randomInteger(min, max) {
			let rand = min + Math.random() * (max + 1 - min);
			return Math.floor(rand);
		},
		playSound(val) {
			const audio = new Audio(`sound/${val}.mp3`)
			audio.play()
		},
		opacityElement(el) {
			el.classList.add('active')
			setTimeout(() => {
				el.classList.remove('active')
			}, 200)
		}
  }
}
</script>

<style lang="sass" >
$blue: blue
$red: red
$yellow: yellow
$green: green
$radius: 1rem
$opacity: 0.4

.options
	width: 10rem

	.level,
	.start-button
		width: fit-content
		margin: 1rem auto

	input
		margin-bottom: 1rem

	.status
		color: green
		text-align: center
		font-size: 1.3rem
		height: 2rem
		margin-top: 1rem

	
	.game-over
		color: red

	.listen,
	.repeat
		text-align: center
		font-size: 1rem
		height: 2rem

	.listen
		color: #aa5555

	.repeat
		color: #55aa55

.row
	height: 8rem

	.col
		width: 8rem
		height: 8rem
		display: inline-block

	.blue,
	.red,
	.yellow,
	.green
		opacity: $opacity

	.active
		opacity: 1

	.blue
		background-color: $blue
		border-radius: $radius 0 0 0

	.red
		background-color: $red
		border-radius: 0 $radius 0 0

	.yellow
		background-color: $yellow
		border-radius: 0 0 0 $radius

	.green
		background-color: $green
		border-radius: 0 0 $radius 0

</style>
