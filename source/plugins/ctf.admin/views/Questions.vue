<template>
	<v-card
	class="mx-auto"
	:max-width="this.width"
	outlined
	>
		<v-card-title>
			<span class="headline">CTF Questions</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<v-list>
				<v-list-group
				v-for="item in questions"
				:key="item.ID"
				v-model="item.active"
				no-action
				>
				<template v-slot:activator>
					<v-list-item-content>
					<v-list-item-title v-text="item.Question"></v-list-item-title>
					</v-list-item-content>
				</template>
		
				<v-list-item>
					<v-list-item-content>
						<v-text-field
							v-model="item.Question"
							label="Question"
						></v-text-field>
						<v-text-field
							v-model="item.Answer"
							label="Answer"
						></v-text-field>
						<v-text-field
							v-model="item.Score"
							label="Score"
							type="number"
						></v-text-field>
						<v-text-field
							v-model="item.LockedBy"
							label="Locked By"
							type="number"
						></v-text-field>
						<v-spacer></v-spacer>
						<div class="d-flex justify-center">
							<v-btn @click="deleteQuestion" color="error">Delete question</v-btn>
						</div>
					</v-list-item-content>
				</v-list-item>
				</v-list-group>
			</v-list>
			<v-spacer></v-spacer>
			<div class="d-flex justify-center">
				<v-btn @click="addQuestion" color="blue darken-1">Add question</v-btn>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn @click="closeDialog" color="success">Done</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
  export default {
	props: ['width', 'activeDb'],
	data () {
		return {
			questions: [],
			deletedQuestions: []
		}
	},
	async created() {
		this.questions = this.questions.concat(await this.studio.ctf_admin.getAllQuestions(this.activeDb + '.sqlite'));
	},
	methods: {
		closeDialog ()
		{
			this.studio.ctf_admin.updateDbQuestions(this.questions, this.deletedQuestions, this.activeDb + '.sqlite');
			this.$root.$emit('submit');
		},
		addQuestion () {
			this.questions.push({
				ID: this.questions.length + 1,
				Question: 'Question ' + (this.questions.length + 1),
				Answer: 'Answer ' + (this.questions.length + 1),
				Score: 0,
				LockedBy: -1,
				newQuestion: true
			})
		},
		deleteQuestion () {
			this.questions.forEach((item, idx) => {
				if (item.active) {
					this.questions.splice(idx, 1);

					if (!item.newQuestion) {
						this.deletedQuestions.push(item.ID);
					}
				}
			})
			console.log(this.questions);
			console.log(this.deletedQuestions);
		}
	}
  }
</script>