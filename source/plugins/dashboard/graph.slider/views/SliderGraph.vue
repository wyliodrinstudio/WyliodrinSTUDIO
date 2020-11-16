<template>
	<v-flex xs12>
        <v-slider v-model="slider" thumb-label="always" :max="data.maxAxesValue" :min="data.minAxesValue" :color="data.color"
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
			color: this.data.color
		};
	}
};
</script>

