<template>
	<v-img style="width:500px;height:500px" :src="encodedImage"></v-img>
</template>

<script>
import {mapGetters} from 'vuex';
import path from 'path';

export default {
	name: 'ImageEditor',
	props: ['project', 'filename'], 
	data() {
		return {
			encodedImage: ''
		}
	},
	methods: {
		
	},
	watch:
	{
		filename:
		{
			immediate: true,
			async handler()
			{
				let filePath = path.join(this.project.folder, this.filename);
				let extension = this.filename.substring(this.filename.lastIndexOf('.')).substring(1);

				try 
				{
					var encoded = (await this.studio.filesystem.readFile(filePath)).toString ('base64');
					if(extension === 'svg')
						this.encodedImage = 'data:image/svg+xml;base64,' + encoded;
					else
						this.encodedImage = 'data:image/' + extension +';base64,' + encoded;
				}
				catch(e)
				{
					console.log(e.message);
				}
			}
		}
	}

}
</script>