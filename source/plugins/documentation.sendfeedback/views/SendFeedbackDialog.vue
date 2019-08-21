<template>
  <v-card class="library-box">
    <v-card-title>
      <span class="headline">{{$t('SEND_FEEDBACK_TITLE')}}</span>
    </v-card-title>
    <v-card-text>
      <v-textarea autofocus
        name="input-7-1"
        :label="$t('SEND_FEEDBACK_MESSAGE')"
        
        required
        v-model="feedback"
      ></v-textarea>
      <v-img :src="completePath" aspect-ratio="1.7"></v-img>
    </v-card-text>
    <v-card-actions>
    	<v-btn @click="prepareMessage">{{ $t('SEND_FEEDBACK_SEND') }}</v-btn>
		<v-btn @click="cancel">{{ $t('SEND_FEEDBACK_CANCEL') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import path from "path";
import fs from "fs-extra";
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export default {
	name: 'SendFeedback',
	data() {
		return {
      		feedback: '',
      		data: '',
			name: '',
			completePath: '',
			dataToSend: {}
		}
	},
	created() {
		this.name = this.studio.info.getFirstName();
		this.completePath = path.join(this.studio.info.path, this.name);
		this.readFile(); 
  	},
	methods: {
		esc() {
			this.cancel();
		}, 
		cancel() {
			this.$root.$emit('submit');
		},
		prepareMessage() {
			this.dataToSend = {
				image: this.data.toString ('base64'),
				feedbackMessage: this.feedback,
			};

			console.log(this.dataToSend);
			Vue.http.post('http://localhost:3000/', this.dataToSend).then(
				response => {
					console.log(response);
				}, response => {
					console.log("failed");
				}
			);
		},
		async readFile() {
			this.data = await fs.readFile(this.completePath);
			console.log("data e gata");
		}
  }
};
</script>




