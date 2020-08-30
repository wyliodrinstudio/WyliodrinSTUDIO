<template>
	<v-card class="connection-box">
		<v-card-title>
			<span class="headline">{{$t(title, values)}}</span>
		</v-card-title>
		<v-card-text>
			{{$t(question, values)}}
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn v-for="action in actions" :key="action.title" :class="action.class" text @click="click(action)" ref="action">{{$t(action.title)}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'QuestionDialog',
	props: ['title', 'question', 'buttons', 'values'],
	data () 
	{
		return {
			actions: this.buttons?this.buttons:[{
				title: 'NO',
				class: '',
				value: null,
			},
			{
				title: 'YES',
				class: '',
				value: 'yes'
			}]
		};
	},
	mounted ()
	{
		this.$refs.action[0].$el.focus();
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
			this.$root.$emit ('submit', button.value);
		}
	}
};
</script>

