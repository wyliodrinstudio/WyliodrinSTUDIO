<template>
	<v-img v-show="imageData" :src = "imageData"></v-img>
</template>

<script>
import Mustache from 'mustache';
import axios from 'axios';
export default {
	name: 'ImageGraph',
	props: ['data', 'width', 'height'],
	data() {
		return {
			value: null,
			imageData: null
		}
	},
	watch: {
		data: {
			deep: true,
			immediate: true,
			handler() {
				console.log('signal name changed to ' + this.data.signalTitle);
				if (this.unregister) {
					this.unregister();
				}
				this.unregister = this.studio.dashboard.registerForSignal(
					this.data.signalTitle,
					(data) => {
						console.log(data);
						this.value = data.v;
					}
				);
				this.$forceUpdate ();
			},
		},
		async value () {
			let imageLinks = this.data.imageLinks.replace (/\r?\n$/, '');
			let images = imageLinks.split (/\r?\n/);
			let link = null;
			if (images.length === 1) {
				link = Mustache.render (imageLinks, { 
					[this.data.signalTitle]: this.value, 
					params: {
						width: this.width,
						height: this.height,
						...this.data
					}
				});
			}
			else
			{
				link = images[this.value];
			}
			if (link) {
				try
				{
					let data = await axios.get (link, {
						responseType: 'arraybuffer'
					});
					this.imageData = 'data:image/*;base64,'+Buffer.from (data.data).toString ('base64');
				}
				catch (e)
				{
					this.imageData = null;
				}
			}
			else
			{
				this.imageData = null;
			}
		}
	},
};
</script>

