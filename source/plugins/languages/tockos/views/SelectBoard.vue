<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Select Board')}}</span>
		</v-card-title>
		<v-card-text>
			Start From Board
			<v-select v-model = "board" :items="boards" item-text = "name" item-value="board">
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
const BOARDS = [{
	name: 'STM32F412g Discovery Kit',
	board: 'stm32f412gdiscovery'
}];

export default {
	name: 'SelectBoard',
	data () {
		return {
			boards: BOARDS,
			board: BOARDS[0].board
		};
	},
	computed: {
		
	},
	methods: {
		select ()
		{
			this.$root.$emit ('submit', this.board);
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>