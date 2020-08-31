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
    color: String,
    listenUser: Boolean
  },
  methods: {
		clickColorArea() {
			if (!this.listenUser) { return }
      this.$emit('clickColorArea', this.indx )
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
    }
  }
}
</script>

<style lang="sass">
$radius: 1rem
$opacity: 0.4

.color-area
  display: inline-block
  opacity: $opacity

  &_active
    opacity: 1

</style>
