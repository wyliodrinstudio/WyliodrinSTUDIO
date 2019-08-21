<template>
	<v-flex xs12>
        <v-slider v-model="slider" thumb-label="always" :max="data.maxAxesValue" :min="data.minAxesValue" :color="data.signalColor"
        ></v-slider>
      </v-flex>
</template>

<script>
export default {
	name: 'SliderGraph',
	props: ['data'],
	data() {
		return {
			slider: this.data.minAxesValue,
			signalColor: this.data.signalColor
		}
	}
}
</script>

