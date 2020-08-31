<template>
	<div>
		<div class="game">
			<ColorArea
				:class="nine ? 'game__area game__area_nine' : 'game__area'"
				v-for="(color, index) in colors"
				:key="index"
				:indx="index+1"
				:color="color"
				@clickColorArea="checkChain"
				:listenUser="listenUser"
			/>
		</div>
		<Options
			:listenUser="listenUser"
			:isGame="isGame"
			:status="status"
			@start-game="startGame"
			@change-level="lev=>level=lev"
			@click-nine="nin=>nine=nin"
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
				this.listenUser = true
				return
			}
			setTimeout(() => {
				this.playChain(chain.slice(1))
			}, this.level > 700 ? 700 : this.level)
			this.$root.$emit('playChain', chain[0] )
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
