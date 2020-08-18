<template>
  <div
    class="color-area"
    @click.prevent="clickColorArea()"
    :style="`background-color:${color}`"
  ></div>
</template>

<script>
export default {
  name: "ColorArea",
  props: {
    indx: Number,
    color: String
  },
  data() {
    return {
      listenUser: false
    }
  },
	created() {
		this.$root.$on('playChain', this.playChain)
    this.$root.$on('listenUser', this.setListenUser)
	},
	beforeDestroy() {
		this.$root.$off('playChain', this.playChain)
		this.$root.$off('listenUser', this.setListenUser)
	},
  methods: {
    playChain(indx) {
      if (indx === this.indx) {
        this.pushColorArea()
      }
    },
		clickColorArea() {
			if (!this.listenUser) { return }
      this.$root.$emit('clickColorArea', this.indx )
      this.pushColorArea()
    },
    pushColorArea() {
      this.$el.classList.add('color-area_active')
      this.playSound()
			setTimeout(() => {
				this.$el.classList.remove('color-area_active')
			}, 200)
    },
    playSound() {
			const audio = new Audio(`sound/${this.indx}.mp3`)
			audio.play()
    },
    setListenUser(boo) {
			this.listenUser = boo
		}
  }
}
</script>

<style lang="sass">
$radius: 1rem
$opacity: 0.4

.color-area
  // width: 8rem
  // height: 8rem
  display: inline-block
  opacity: $opacity

  &_active
    opacity: 1

</style>
