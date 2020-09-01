<template>
	<div>
		<div class="game">
			<ColorArea
				ref="colorArea"
				v-for="(color, index) in colors"
				:key="index"
				:indx="index + 1"
				:listenUser="listenUser"
				:color="color"
				:class="`game__area ${optObj.nine ? 'game__area_nine' : ''}`"
				@clickColorArea="checkChain"
			/>
		</div>
		<Options
			:listenUser="listenUser"
			:isGame="isGame"
			:status="status"
			:optObj="optObj"
			@start-game="startGame"
		/>
	</div>
</template>

<script>
import ColorArea from './ColorArea'
import Options from './Options'

export default {
	name: 'Game',
	components: {
		ColorArea,
		Options
	},
  data() {
    return {
			isGame: false,
			chain: [],
			status: '',
			listenUser: false,
			currentStep: 0,
			timer: {},
			round: 1,
			optObj: {
				nine: false,
				level: 1500
			}
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
		stopGame(status) {
			this.isGame = false
			this.status = status
			this.chain = []
			this.currentStep = 0
			this.listenUser = false
		},
		checkChain(val) {
			if (!this.listenUser) { return false }
			clearTimeout(this.timer)
			if (this.chain[this.currentStep] !== val) {
				this.stopGame('Ошибка')
				return false
			}
			if (this.chain.length - 1 === this.currentStep) {
				this.round++
				this.timer = setTimeout(() => this.nextRound(),
					this.optObj.level < 1000 ? 1000 : this.optObj.level)
				return false
			}
			this.currentStep++
			this.timer = setTimeout(() => this.stopGame('Таймаут'), this.optObj.level)
		},
		playChain(chain) {
			if (!chain.length) {
				this.listenUser = true
				return
			}
			setTimeout(() => {
				this.playChain(chain.slice(1))
			}, this.optObj.level > 700 ? 700 : this.optObj.level)
			this.$refs.colorArea[chain[0]-1].pushColorArea()
		},
		addRandomNumber() {
			this.chain.push(this.randomInteger(1, this.optObj.nine ? 9 : 4))
		},
		randomInteger(min, max) {
			let rand = min + Math.random() * (max + 1 - min);
			return Math.floor(rand);
		}
	},
	computed: {
		colors() {
			return this.optObj.nine ?
			['blue', 'red', 'green', 'orange', 'violet', 'yellow', 'lightgreen', 'coral', 'indigo'] :
			['blue', 'red', 'green', 'orange']
		}
	}
}
</script>

<style lang="sass" >
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
