<template>
	<v-card class="connection-box">
		<v-card-title>
			<span class="headline">{{$t(title, values)}}</span>
		</v-card-title>
		<v-card-text>
			<v-text-field autofocus :label="$t(question, values)" required v-model="value">{{$t(question, values)}}</v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn v-for="action in actions" :key="action.title" :class="action.class" text @click="click(action)">{{$t(action.title)}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'PromptDialog',
	props: ['title', 'question', 'buttons', 'values', 'originalValue'],
	data () 
	{
		return {
			actions: this.buttons?this.buttons:[{
				title: 'BACK',
				class: '',
				value: null,
			 },
			 {
				 title: 'OK',
				 class: '',
				 value: 'ok'
			 }],
			 value: this.originalValue
		};
	},
	methods:
	{
		enter ()
		{
			this.click (this.actions[1]);
		},
		esc ()
		{
			this.click (this.actions[0]);
		},
		click (button)
		{
			if (button.value)
			{
				this.$root.$emit ('submit', this.value);
			}
			else
			{
				this.$root.$emit ('submit', null);
			}
		}
	}
}
</script>

