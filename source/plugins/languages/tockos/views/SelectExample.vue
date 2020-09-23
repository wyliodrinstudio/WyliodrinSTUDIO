<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Select Example')}}</span>
		</v-card-title>
		<v-card-text>
			Start From an Example Application
			<v-select v-model = "example" :items="examples" item-text = "name" item-value="example">
			</v-select>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="select">{{$t('SELECT')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
const EXAMPLES = [{
	name: 'Empty Application',
	example: ''
},
{
	name: 'Hello World',
	example: 'c_hello'
},
];

export default {
	name: 'SelectExample',
	data () {
		return {
			examples: EXAMPLES,
			example: EXAMPLES[0].example
		};
	},
	computed: {
		
	},
	methods: {
		select ()
		{
			this.$root.$emit ('submit', this.example);
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>