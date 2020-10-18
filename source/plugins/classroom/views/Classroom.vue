<template>
	<Student v-if="isStudent">
		
	</Student>
	<Instructor v-else>
		
	</Instructor>
</template>

<script>

import Student from './Student.vue';
import Instructor from './Instructor.vue';

import { mapGetters } from "vuex";

export default {
	name: 'Classroom',
	data()
	{
		return {
			
		};
	},
	computed: {
		...mapGetters ({
			connected: 'classroom/isConnected',
			role: 'classroom/role'
		}),
		isStudent () {
			return this.role === 'student';
		}
	},
	components: {
		Student,
		Instructor
	}
}
</script>