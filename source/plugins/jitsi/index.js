import Jitsi from './views/Jitsi.vue';
import ConferenceSetupDialog from './views/ConferenceSetupDialog.vue';
import jitsiStore from './store.js';

let studio = null;
let enabledTab = false;

let jitsi = {
	showConferenceSetup()
	{
		studio.workspace.showDialog(ConferenceSetupDialog, {width: 500});
		enabledTab = true;
	},
	// checkExistingConference()
	// {
	// 	let conference = studio.workspace.getFromStore('jitsi', 'runningMeetings');
	// 	if(conference.length)
	// 		studio.workspace.dispatchToStore('jitsi', 'checkExistingConference', true);
	// }
};
export function setup (options, imports, register)
{
	studio = imports;
	
	/**Inject script tag to embet Jitsi Meet using Jisti Meet API library */
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');
	script.setAttribute('src','https://meet.jit.si/external_api.js');
	// script.setAttribute('src','https://meet.jit.si/libs/lib-jitsi-meet.min.js');
	script.setAttribute('allow', 'microphone; camera');

	head.appendChild(script);
	
	studio.workspace.registerStore('jitsi', jitsiStore);

	studio.workspace.registerToolbarButton('JITSI_CONFERENCE_SETUP', 30, () => jitsi.showConferenceSetup(), 'plugins/jitsi/data/img/icons/jitsi-conf.svg')
	
	// jitsi.checkExistingConference();
	studio.workspace.registerTab('PROJECT_JITSI', 600, Jitsi, {
		enabled () {
			return studio.workspace.getFromStore('jitsi', 'checkExistingConference');
		}
	});
	register (null,
		{
			jitsi: jitsi
		});
	
}