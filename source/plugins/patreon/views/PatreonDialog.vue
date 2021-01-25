<template>
	<v-card class="about-box">
		<v-card-title>
			<span>{{ $t('PATREON_SPONSOR_TITLE') }}</span>
		</v-card-title>
		<v-card-text>
			{{ $t('PATREON_SPONSOR_TEXT') }}
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<a class="patreon" color="primary" tabindex="0" type="button" @click="openLink()" role="button" target="_blank" rel="noopener noreferrer">
				<div class="patreon-div1">
					<div class="patreon-svg1">
						<span class="patreon-svg2">
							<svg viewBox="0 0 569 546" xmlns="http://www.w3.org/2000/svg">
								<g>
									<circle cx="362.589996" cy="204.589996" data-fill="1" id="Oval" r="204.589996"></circle>
									<rect data-fill="2" height="545.799988" id="Rectangle" width="100" x="0" y="0"></rect>
								</g>
							</svg>
						</span>
					</div>
					<div class="patreon-text">Become a patron</div>	
				</div>
			</a>
			<!-- <v-btn text @click="openLink('https://www.patreon.com/bePatron?u=27093250')">{{ $t('PATREON_SPONSOR_NOW') }}</v-btn> -->
			<v-btn text @click="exit">{{ $t('PATREON_SPONSOR_LATER') }}</v-btn>
		</v-card-actions>

	</v-card>
</template>
<script>

export default {
	data() {
		return {
			
		};
	},
	methods: {
		exit()
		{
			this.$root.$emit('submit', undefined);
		},
		openLink()
		{
			this.studio.system.openLink('https://www.patreon.com/bePatron?u=27093250');
			this.studio.settings.storeValue('patreon', 'sponsored', true);
			this.$root.$emit('submit', undefined);
		}
	}
};
</script>

<style lang="less" scoped>
.patreon {
    -moz-box-align: center;
    align-items: center;
    backface-visibility: hidden;
    background-color: rgb(255, 66, 77);
    border-radius: 9999px;
    border: 1px solid rgb(255, 66, 77);
    box-sizing: border-box;
    color: rgb(255, 255, 255) !important;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.875rem !important;
    font-weight: 500;
    height: unset;
    -moz-box-pack: center;
    justify-content: center;
    padding: 0.46875rem 1rem;
    position: relative;
    pointer-events: unset;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
    user-select: none;
    white-space: unset;
}

.patreon-div1 {
    -moz-box-align: center;
    align-items: center;
    display: flex;
    -moz-box-pack: center;
    justify-content: center;
    visibility: visible;
}

.patreon-svg1 {
    align-self: center;
    -moz-box-align: center;
    align-items: center;
    display: inline-flex;
    filter: none;
    cursor: unset;
    vertical-align: unset;
    height: unset;
	width: unset;
	margin-right: 0.7em;
}

.patreon-svg2 svg {
    height: 1rem;
	width: 1rem;
	fill: rgb(255, 255, 255);
}
</style>