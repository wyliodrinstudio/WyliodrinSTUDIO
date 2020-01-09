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
						<span class="subtitle-2 mb-n4">-> Question</span>
						<v-text-field
							v-model="item.Question"
						></v-text-field>
						<span class="subtitle-2 mb-1">-> Answer</span>
						<v-tabs 
							v-model="item.answerTab"
							background-color="transparent"
							height=20
							grow
						>
							<v-tab v-for="tab in item.answerTabOptions" :key="tab.key"> {{tab.text}} </v-tab>
						</v-tabs>
						<v-tabs-items
							v-model="item.answerTab"
							grow
							class="mt-1"
						>
							<v-tab-item v-for="tab in item.answerTabOptions" :key="tab.key">
								<v-text-field
									v-model="tab.content"
									v-if="tab.key === 'string'"
								></v-text-field>
								<MonacoEditor 
									style="min-height: 100px" 
									v-model="tab.content" 
									:options="editorOptions" 
									language="javascript"
									v-else
								></MonacoEditor>
							</v-tab-item>
						</v-tabs-items>
						<span class="subtitle-2 mb-n4">-> Score</span>
						<v-text-field
							v-model="item.Score"
							type="number"
						></v-text-field>
						<span class="subtitle-2 mb-n4">-> Parent</span>
						<v-overflow-btn
							class="mt-5"
							:items="questions"
							label="None"
							v-model="item.Parent"
							item-text="Question"
							item-value="index"
							clearable
							dense
						></v-overflow-btn>
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
				<v-btn @click="addQuestion" color="blue darken-1" dark>Add question</v-btn>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn @click="closeDialog" color="error">Close</v-btn>
			<v-btn @click="saveChanges" color="success">Save Changes</v-btn>
		</v-card-actions>
	</v-card>
</template>

<style>
	.v-window__container  {
		background: transparent !important;
		background-color: transparent !important;
	}
	.theme--light.v-tabs-items {
		background: transparent !important;
		background-color: transparent !important;
		width: 100% !important;
	}
</style>

<script>
	import MonacoEditor from 'vue-monaco';
	import * as monaco from 'monaco-editor';

	export default {
		props: ['width', 'activeDb'],
		data () {
			return {
				questions: [],
				deletedQuestions: [],
				editorOptions: {
					fontSize: 13,
					automaticLayout: true
				}
			}
		},
		components: {
			MonacoEditor
		},
		async created() {
			(await this.studio.ctf_admin.getAllQuestions(this.activeDb + '.sqlite')).forEach((item, idx) => {
				item.answerTabOptions = [
					{
						text: 'String',
						key: 'string',
						content: ''
					},
					{
						text: 'JS Function',
						key: 'jsFunction',
						content: ''
					}
				];
				item.answerTabOptions[item.AnswerType].content = item.Answer;
				item.answerTab = item.AnswerType;
				item.index = idx;

				this.questions.push(item);
			})

			this.$forceUpdate ();
		},
		methods: {
			saveChanges ()
			{
				this.questions.map((item) => {
					item.AnswerType = item.answerTab;
					item.Answer = item.answerTabOptions[item.answerTab].content;

					if (item.Parent === undefined) {
						item.Parent = -1;
					}

					return item;
				})

				this.studio.ctf_admin.updateDbQuestions(this.questions, this.deletedQuestions, this.activeDb + '.sqlite');
				this.closeDialog();
			},
			closeDialog() {
				this.$root.$emit('submit');
			},
			addQuestion () {
				let question = {
					ID: this.questions.length + 1,
					Question: 'Question ' + (this.questions.length + 1),
					answerTab: 0,
					answerTabOptions: [
						{
							text: 'String',
							key: 'string',
							content: ''
						},
						{
							text: 'JS Function',
							key: 'jsFunction',
							content: ''
						}
					],
					Score: 0,
					Parent: -1,
					newQuestion: true
				}

				this.questions.push(question);
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
			},
			infoLog () {
				console.log(this.questions);
			}
		}
	}
</script>