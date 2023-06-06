(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(507);
/* harmony import */ var xml_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(551);



let studio = null;


let blocks = __webpack_require__ (552);
let code = __webpack_require__ (553);

function setup (options, imports, register)
{
	studio = imports;

	let toolbox = xml_js__WEBPACK_IMPORTED_MODULE_0___default.a.xml2js (raw_loader_visual_toolbox_xml__WEBPACK_IMPORTED_MODULE_1__["default"]);

	
	studio.projects.registerLanguagePackage ('python', null, [
		{
			name: 'facebook-sdk',
			description: 'Python SDK for Facebook\'s Graph API'
		},
		{
			name: 'requests',
			description: 'Python HTTP for Humans.'
		},
		{
			name: 'tweepy',
			description: 'An easy-to-use Python library for accessing the Twitter API.'
		},
		{
			name: 'twilio',
			description: 'The Twilio Python Helper Library'
		},
	]);

	studio.editor_visual.registerBlocksDefinitions ('social', blocks, code, toolbox, {
		type: 'wyapp',
		visible ()
		{
			let device = studio.workspace.getDevice ();
			if (!device.properties.wyliolab) return true;
			else return false;
		}
	});

	register (null, {});
}

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<toolbox>\n    <category name=\"Mail\" colour=\"160\">\n        <block type=\"mail_setup\">\n            <value name=\"Your e-mail\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your e-mail address</field>\n                </block>\n            </value>\n            <value name=\"password\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your password</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"mail_send\">\n            <value name=\"toAddr\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">e-mail address</field>\n                </block>\n            </value>\n            <value name=\"subj\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Subject</field>\n                </block>\n            </value>\n            <value name=\"msg\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"attachment_mail_send\">\n            <value name=\"toAddr\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">e-mail address</field>\n                </block>\n            </value>\n            <value name=\"subj\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Subject</field>\n                </block>\n            </value>\n            <value name=\"msg\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n            <value name=\"attachment\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Facebook\" colour=\"240\">\n        <block type=\"facebook_setup\">\n            <value name=\"token\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your access token</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"facebook_post\">\n            <value name=\"message\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your message</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"facebook_friendslist\"></block>\n        <block type=\"facebook_getfriend\">\n            <value name=\"friendNumber\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"facebook_notifications\"></block>\n        <block type=\"facebook_getlikes\">\n            <value name=\"page\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Page name</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"facebook_getgroupposts\">\n            <value name=\"group\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Group name</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <category name=\"Twitter\" colour=\"270\">\n        <block type=\"twitter_setup\">\n            <value name=\"consKey\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your consumer key</field>\n                </block>\n            </value>\n            <value name=\"consSecret\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your consumer secret key</field>\n                </block>\n            </value>\n            <value name=\"accessToken\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your access token</field>\n                </block>\n            </value>\n            <value name=\"accessTokenSecret\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your access secret token</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"twitter_post\">\n            <value name=\"msg\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your tweet</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"twitter_timeline\"></block>\n        <block type=\"twitter_user_timeline\"></block>\n    </category>\n    <category name=\"Twilio\" colour=\"355\">\n        <block type=\"twilio_setup\">\n            <value name=\"twi_account\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your account</field>\n                </block>\n            </value>\n            <value name=\"twi_token\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your access token</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"twilio_call_say\">\n            <value name=\"twi_to\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Phone number</field>\n                </block>\n            </value>\n            <value name=\"twi_from\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your number</field>\n                </block>\n            </value>\n            <value name=\"twi_say\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"twilio_call_music_url\">\n            <value name=\"twi_to\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Phone number</field>\n                </block>\n            </value>\n            <value name=\"twi_from\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your number</field>\n                </block>\n            </value>\n            <value name=\"twi_music_url\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">...</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"twilio_msg\">\n            <value name=\"twiSMS_to\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Phone number</field>\n                </block>\n            </value>\n            <value name=\"twiSMS_from\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Your number</field>\n                </block>\n            </value>\n            <value name=\"twi_msg\">\n                <block type=\"text\">\n                    <field name=\"TEXT\">Message</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"twilio_calllist\"></block>\n        <block type=\"twilio_getcall\">\n            <value name=\"nrCall\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n        <block type=\"twilio_msglist\"></block>\n        <block type=\"twilio_getSMS\">\n            <value name=\"nrSms\">\n                <block type=\"math_number\">\n                    <field name=\"NUM\">0</field>\n                </block>\n            </value>\n        </block>\n    </category>\n    <sep />\n</toolbox>");

/***/ }),

/***/ 552:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Blocks['mail_setup'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#setup');
			this.setColour(160);
			this.appendDummyInput()
				.appendField('Setup')
				.appendField(new Blockly.FieldDropdown([['GMail', 'gmail'], ['Yahoo', 'yahoo'], ['Hotmail', 'hotmail']]), 'server');
			this.appendValueInput('Your e-mail')
				.setCheck('String')
				.appendField('Your e-mail');
			this.appendValueInput('password')
				.setCheck('String')
				.appendField('Password');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['mail_send'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#send_mail');
			this.setColour(160);
			this.appendDummyInput()
				.appendField('Send mail');
			this.appendValueInput('toAddr')
				.setCheck('String')
				.appendField('To');
			this.appendValueInput('subj')
				.setCheck('String')
				.appendField('Subject');
			this.appendValueInput('msg')
				.setCheck('String')
				.appendField('Message');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['attachment_mail_send'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#send_mail');
			this.setColour(160);
			this.appendDummyInput()
				.appendField('Send mail');
			this.appendValueInput('toAddr')
				.setCheck('String')
				.appendField('To');
			this.appendValueInput('subj')
				.setCheck('String')
				.appendField('Subject');
			this.appendValueInput('msg')
				.setCheck('String')
				.appendField('Message');
			this.appendValueInput('attachment')
				.setCheck('String')
				.appendField('Attachment');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};


	Blockly.Blocks['facebook_setup'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#setup1');
			this.setColour(240);
			this.appendDummyInput()
				.appendField('Facebook setup');
			this.appendValueInput('token')
				.setCheck('String')
				.appendField('Access Token');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['facebook_post'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#post');
			this.setColour(240);
			this.appendDummyInput()
				.appendField('Post on Facebook');
			this.appendValueInput('message')
				.setCheck('String')
				.appendField('Message');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['facebook_friendslist'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_friends_list');
			this.setColour(240);
			this.appendDummyInput()
				.appendField('Get friends list');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['facebook_getfriend'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_a_friend');
			this.setColour(240);
			this.appendDummyInput()
				.appendField('Get the #');
			this.appendValueInput('friendNumber')
				.setCheck('Number');
			this.appendValueInput('friendList')
				.appendField('friend from');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['facebook_notifications'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_notifications');
			this.setColour(240);
			this.appendDummyInput()
				.appendField('Get notifications');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['facebook_getlikes'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(240);
			this.appendValueInput('page')
				.setCheck('String')
				.appendField('Get # of likes from');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['facebook_getgroupposts'] = {
		init: function () {
			this.setHelpUrl('http://www.example.com/');
			this.setColour(240);
			this.appendValueInput('group')
				.appendField('Get posts from group');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};


	Blockly.Blocks['twitter_setup'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#twitter_setup');
			this.setColour(270);
			this.appendDummyInput()
				.appendField('Twitter setup');
			this.appendValueInput('consKey')
				.setCheck('String')
				.appendField('Consumer key');
			this.appendValueInput('consSecret')
				.setCheck('String')
				.appendField('Consumer secret');
			this.appendValueInput('accessToken')
				.setCheck('String')
				.appendField('Access token');
			this.appendValueInput('accessTokenSecret')
				.setCheck('String')
				.appendField('Access token secret');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twitter_post'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#tweet');
			this.setColour(270);
			this.appendDummyInput()
				.appendField('Post on Twitter');
			this.appendValueInput('msg')
				.setCheck('String')
				.appendField('Message');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twitter_timeline'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_timeline');
			this.setColour(270);
			this.appendDummyInput()
				.appendField('Get timeline');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twitter_user_timeline'] = {
		init: function () {
			this.setHelpUrl('');
			this.setColour(270);
			this.setOutput(true);
			this.setTooltip('');
			this.setInputsInline(true);
			this.appendDummyInput()
				.appendField('Get tweets from')
				.appendField(new Blockly.FieldDropdown([['me', 'my'], ['user', 'user']], function (option) {
					var insertUser = (option == 'user');
					this.sourceBlock_.updateShape_(insertUser, this);
				}), 'dropdown');
		},
		domToMutation: function (xmlElement) {
			var usernameInput = (xmlElement.getAttribute('username') == 'true');
			this.updateShape_(usernameInput);
		},
		mutationToDom: function () {
			var container = document.createElement('mutation');
			var username = (this.getFieldValue('dropdown') == 'user');
			container.setAttribute('username', username);
			return container;
		},
		updateShape_: function (insertUser) {
			// Add or remove a Value Input.
			var inputExists = this.getInput('username');
			if (insertUser) {
				if (!inputExists) {
					this.appendValueInput('username')
						.setCheck('String');
				}
			} else if (inputExists) {
				this.removeInput('username');
			}
		}
	};



	Blockly.Blocks['twilio_setup'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#setup2');
			this.setColour(355);
			this.appendDummyInput()
				.appendField('Twilio setup');
			this.appendValueInput('twi_account')
				.appendField('Account');
			this.appendValueInput('twi_token')
				.appendField('Token');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twilio_call_say'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#make_a_call');
			this.setColour(355);
			this.appendDummyInput()
				.appendField('Make a Call');
			this.appendValueInput('twi_to')
				.appendField('To');
			this.appendValueInput('twi_from')
				.appendField('From');
			this.appendValueInput('twi_say')
				.appendField('Say');
			this.appendDummyInput()
				.appendField('in')
				.appendField(new Blockly.FieldDropdown([['English', 'en-EN'], ['German', 'de-DE'], ['French', 'fr-FR']]), 'twi_language');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twilio_call_music_url'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#make_a_call_with_music');
			this.setColour(355);
			this.appendDummyInput()
				.appendField('Make a Call');
			this.appendValueInput('twi_to')
				.appendField('To');
			this.appendValueInput('twi_from')
				.appendField('From');
			this.appendValueInput('twi_music_url')
				.appendField('Music URL');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twilio_msg'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#send_a_sms');
			this.setColour(355);
			this.appendDummyInput()
				.appendField('Send an SMS');
			this.appendValueInput('twiSMS_to')
				.appendField('To');
			this.appendValueInput('twiSMS_from')
				.appendField('From');
			this.appendValueInput('twi_msg')
				.appendField('Message');
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twilio_calllist'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_call_list');
			this.setColour(355);
			this.appendDummyInput()
				.appendField('Get your call list');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twilio_msglist'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_sms_list');
			this.setColour(355);
			this.appendDummyInput()
				.appendField('Get your SMS list');
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twilio_getSMS'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_a_sms');
			this.setColour(355);
			this.appendValueInput('nrSms')
				.appendField('Get the #');
			this.appendValueInput('smsList')
				.appendField('SMS from ');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

	Blockly.Blocks['twilio_getcall'] = {
		init: function () {
			this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_a_call');
			this.setColour(355);
			this.appendValueInput('nrCall')
				.appendField('Get the #');
			this.appendValueInput('callLi')
				.appendField('call from ');
			this.setInputsInline(true);
			this.setOutput(true);
			this.setTooltip('');
		}
	};

};

/***/ }),

/***/ 553:
/***/ (function(module, exports) {

// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;

	Blockly.Python.importJson = function () {
		if (!Blockly.Python.definitions_['importJson']) {
			Blockly.Python.definitions_['importJson'] = 'import json\n';
		}
	};

	Blockly.Python.mail = function () {
		if (!Blockly.Python.definitions_['import_mail']) {
			Blockly.Python.definitions_['import_mail'] = 'from email.mime.multipart import MIMEMultipart\nfrom email.mime.image import MIMEImage\nfrom email.mime.base import MIMEBase\nfrom email.mime.audio import MIMEAudio\nfrom email import encoders\nfrom email.mime.text import MIMEText\nimport smtplib\nimport mimetypes\n';
		}
	};

	Blockly.Python.facebookImport = function () {
		if (!Blockly.Python.definitions_['import_fb']) {
			Blockly.Python.definitions_['import_fb'] = 'import facebook\n';
		}
	};

	Blockly.Python.requestImport = function () {
		if (!Blockly.Python.definitions_['import_rq']) {
			Blockly.Python.definitions_['import_rq'] = 'import requests\n';
		}
	};

	Blockly.Python.twitterImport = function () {
		if (!Blockly.Python.definitions_['import_tw']) {
			Blockly.Python.definitions_['import_tw'] = 'import tweepy\n';
		}
	};

	Blockly.Python.twilioImport = function () {
		if (!Blockly.Python.definitions_['import_twi']) {
			Blockly.Python.definitions_['import_twi'] = 'from twilio.rest import Client\n';
		}
	};

	Blockly.Python.urllibImport = function () {
		if (!Blockly.Python.definitions_['import_urllib']) {
			Blockly.Python.definitions_['import_urllib'] = 'from urllib import *\n';
		}
	};



	Blockly.Python.mailSetup = function (server, port, username, password) {
		if (!Blockly.Python.definitions_['mail_setup']) {
			var auxServer = Blockly.Python.variableDB_.getDistinctName('mail_server', Blockly.Generator.NAME_TYPE);
			Blockly.Python.mailServer = auxServer;
			var auxName = Blockly.Python.variableDB_.getDistinctName('mail_name', Blockly.Generator.NAME_TYPE);
			Blockly.Python.mailName = auxName;
			var auxPass = Blockly.Python.variableDB_.getDistinctName('mail_password', Blockly.Generator.NAME_TYPE);
			Blockly.Python.mailPassword = auxPass;
			var auxPort = Blockly.Python.variableDB_.getDistinctName('mail_port', Blockly.Generator.NAME_TYPE);
			Blockly.Python.mailPort = auxPort;
			if (server == 'gmail')
				server = '\'smtp.gmail.com\'';
			if (server == 'yahoo')
				server = '\'smtp.mail.yahoo.com\'';
			if (server == 'hotmail')
				server = '\'smtp.live.com\'';
			Blockly.Python.definitions_['mail_setup'] = Blockly.Python.mailServer + ' = ' + server + '\n' +
				Blockly.Python.mailPort + ' = ' + port + '\n' +
				Blockly.Python.mailName + ' = ' + username + '\n' +
				Blockly.Python.mailPassword + ' = ' + password + '\n'
			;
		}
	};

	Blockly.Python.facebookSetup = function (fbToken) {
		if (!Blockly.Python.definitions_['facebook_setup']) {
			var auxFbT = Blockly.Python.variableDB_.getDistinctName('facebook_token', Blockly.Generator.NAME_TYPE);
			Blockly.Python.facebookToken = auxFbT;
			Blockly.Python.definitions_['facebook_setup'] = Blockly.Python.facebookToken + ' = ' + fbToken + '\n';
		}
	};

	Blockly.Python.fbLikeSetup = function () {
		if (!Blockly.Python.definitions_['fbLike']) {
			Blockly.Python.definitions_['fbLike'] = 'def getLikes(user):\n' +
				'  url = "https://graph.facebook.com/"+user\n' +
				'  response = requests.get(url)\n' +
				'  profile = response.json()\n' +
				'  likes = profile[\'likes\']\n' +
				'  return likes'
			;
		}
	};

	Blockly.Python.twitterSetup = function (cKey, cSecret, aToken, aTSecret) {
		if (!Blockly.Python.definitions_['twitter_setup']) {
			var auxKey = Blockly.Python.variableDB_.getDistinctName('twitter_key', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twitterKey = auxKey;
			var auxSecret = Blockly.Python.variableDB_.getDistinctName('twitter_secret', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twitterSecret = auxSecret;
			var auxToken = Blockly.Python.variableDB_.getDistinctName('twitter_token', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twitterToken = auxToken;
			var auxSecretToken = Blockly.Python.variableDB_.getDistinctName('twitter_secretToken', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twitterSecretToken = auxSecretToken;
			var auxtweet = Blockly.Python.variableDB_.getDistinctName('twitter_tweet', Blockly.Generator.NAME_TYPE);
			Blockly.Python.tweetText = auxtweet;
			Blockly.Python.definitions_['twitter_setup'] = Blockly.Python.twitterKey + ' = ' + cKey + '\n' +
				Blockly.Python.twitterSecret + ' = ' + cSecret + '\n' +
				Blockly.Python.twitterToken + ' = ' + aToken + '\n' +
				Blockly.Python.twitterSecretToken + ' = ' + aTSecret + '\n'
			;
		}
	};

	Blockly.Python.twilioSetup = function (twiAccount, twiToken) {
		if (!Blockly.Python.definitions_['twilio_setup']) {
			var auxTwiAcc = Blockly.Python.variableDB_.getDistinctName('twilio_account', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twilioAccount = auxTwiAcc;
			var auxTwiT = Blockly.Python.variableDB_.getDistinctName('twilio_token', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twilioToken = auxTwiT;
			var auxClient = Blockly.Python.variableDB_.getDistinctName('twilio_client', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twilioClient = auxClient;
			var auxMessage = Blockly.Python.variableDB_.getDistinctName('twilio_message', Blockly.Generator.NAME_TYPE);
			Blockly.Python.twilioMessage = auxMessage;
			Blockly.Python.definitions_['twilio_setup'] = Blockly.Python.twilioAccount + ' = ' + twiAccount + '\n' +
				Blockly.Python.twilioToken + ' = ' + twiToken + '\n'
			;
		}
	};



	Blockly.Python.mailSetVar = function () {
		if (!Blockly.Python.definitions_['mailSetVar']) {
			Blockly.Python.mailSetup();
			if (!Blockly.Python.definitions_['import_os']) {
				Blockly.Python.definitions_['import_os'] = 'import os\n';
			}
			Blockly.Python.definitions_['mailSetVar'] = 'def mailFunction(fromAddress, toAddress, mPassword, mServer, mPort, mSubject, mMessage, mAttachment):\n' +
				'  msg = MIMEMultipart()\n' +
				'  msg[\'From\'] = fromAddress\n' +
				'  msg[\'To\'] = toAddress\n' +
				'  msg[\'Subject\'] = mSubject\n' +
				'  body = mMessage\n' +
				'  msg.attach(MIMEText(body, \'plain\'))\n' +
				'  if mAttachment:\n' +
				'    fp = open(mAttachment, \'rb\')\n' +
				'    ctype, encoding = mimetypes.guess_type(mAttachment)\n' +
				'    if ctype is None or encoding is not None:\n' +
				'      ctype = \'application/octet-stream\'\n' +
				'    maintype, subtype = ctype.split(\'/\', 1)\n' +
				'    if maintype == \'text\':\n' +
				'      a = MIMEText(fp.read(), _subtype=subtype)\n' +
				'    elif maintype == \'image\':\n' +
				'      a = MIMEImage(fp.read(), _subtype=subtype)\n' +
				'    elif maintype == \'audio\':\n' +
				'      a = MIMEAudio(fp.read(), _subtype=subtype)\n' +
				'    else:\n' +
				'      a = MIMEBase(maintype, subtype)\n' +
				'      a.set_payload(fp.read())\n' +
				'      encoders.encode_base64(msg)\n' +
				'    fp.close()\n' +
				'    msg.add_header(\'Content-Disposition\', \'attachment\', filename=os.path.basename(mAttachment))\n' +
				'    msg.attach(a)\n' +
				'  loginServer = smtplib.SMTP(mServer, mPort)\n' +
				'  loginServer.ehlo()\n' +
				'  loginServer.starttls()\n' +
				'  loginServer.ehlo()\n' +
				'  loginServer.login(fromAddress, mPassword)\n' +
				'  text = msg.as_string()\n' +
				'  loginServer.sendmail(fromAddress, toAddress, text)'
			;
		}
	};

	Blockly.Python.twitterSetVar = function () {
		if (!Blockly.Python.definitions_['twitterSetVar']) {
			Blockly.Python.definitions_['twitterSetVar'] = 'def twitterFunction(cKey, cSecret, aToken, aTSecret):\n' +
				'  auth = tweepy.OAuthHandler(cKey, cSecret)\n' +
				'  auth.set_access_token(aToken, aTSecret)\n' +
				'  ' + Blockly.Python.tweetText + ' = tweepy.API(auth)\n' +
				'  return ' + Blockly.Python.tweetText
			;
		}
	};

	Blockly.Python.twitterSetTlVar = function () {
		if (!Blockly.Python.definitions_['twitterSetTlVar']) {
			Blockly.Python.twitterSetVar();
			Blockly.Python.definitions_['twitterSetTlVar'] = 'def twitterTimelineFunction():\n' +
				'  ' + Blockly.Python.tweetText + ' = ' + 'twitterFunction(' + Blockly.Python.twitterKey + ', ' + Blockly.Python.twitterSecret + ', ' + Blockly.Python.twitterToken + ', ' + Blockly.Python.twitterSecretToken + ')\n' +
				'  public_tweets =' + Blockly.Python.tweetText + '.home_timeline()\n' +
				'  tweetArray = []\n' +
				'  for tweetTimeline in public_tweets:\n' +
				'    tweetArray.append(tweetTimeline.text)\n' +
				'  return tweetArray'
			;
		}
	};

	Blockly.Python.twitterSetUserTlVar = function () {
		if (!Blockly.Python.definitions_['twitterSetUserTlVar']) {
			Blockly.Python.twitterSetVar();
			Blockly.Python.definitions_['twitterSetUserTlVar'] = 'def twitterUserTimelineFunction(user):\n' +
				'  ' + Blockly.Python.tweetText + ' = ' + 'twitterFunction(' + Blockly.Python.twitterKey + ', ' + Blockly.Python.twitterSecret + ', ' + Blockly.Python.twitterToken + ', ' + Blockly.Python.twitterSecretToken + ')\n' +
				'  if user == \'myself\':\n' +
				'    public_tweets =' + Blockly.Python.tweetText + '.user_timeline()\n' +
				'  else:\n' +
				'    public_tweets =' + Blockly.Python.tweetText + '.user_timeline(user)\n' +
				'  tweetArray = []\n' +
				'  for tweetTimeline in public_tweets:\n' +
				'    tweetArray.append(tweetTimeline.text)\n' +
				'  return tweetArray';
		}
	};

	Blockly.Python.twilioSetSmsVar = function () {
		if (!Blockly.Python.definitions_['twilioSetSmsVar']) {
			Blockly.Python.definitions_['twilioSetSmsVar'] = 'def twilioSmsFunction(msgList, indexMsg):\n' +
				'  messageIndex = msgList[indexMsg].sid\n' +
				'  mess = ' + Blockly.Python.twilioClient + '.messages.get(messageIndex)\n' +
				'  ' + Blockly.Python.twilioMessage + ' = mess.body\n' +
				'  return ' + Blockly.Python.twilioMessage
			;
		}
	};

	Blockly.Python.twilioSetCallVar = function () {
		if (!Blockly.Python.definitions_['twilioSetCallVar']) {
			Blockly.Python.definitions_['twilioSetCallVar'] = 'def twilioCallFunction(callList, indexCall):\n' +
				'  callIndex = callList[indexCall].sid\n' +
				'  mess = ' + Blockly.Python.twilioClient + '.calls.get(callIndex)\n' +
				'  return mess'
			;
		}
	};



	Blockly.Python['mail_setup'] = function (block) {
		Blockly.Python.mail();
		var value_mailadd = Blockly.Python.valueToCode(block, 'Your e-mail', Blockly.Python.ORDER_ATOMIC);
		var value_password = Blockly.Python.valueToCode(block, 'password', Blockly.Python.ORDER_ATOMIC);
		var dropdown_server = block.getFieldValue('server');
		// TODO: Assemble Python into code variable.
		var port_possib;
		if (dropdown_server == 'gmail')
			port_possib = 587;
		else
		if (dropdown_server == 'yahoo')
			port_possib = 587;
		else
		if (dropdown_server == 'hotmail')
			port_possib = 587;
		Blockly.Python.mailSetup(dropdown_server, port_possib, value_mailadd, value_password);
		var code = '';
		return code;
	};

	Blockly.Python['mail_send'] = function (block) {
		Blockly.Python.mailSetVar();
		var value_toaddr = Blockly.Python.valueToCode(block, 'toAddr', Blockly.Python.ORDER_ATOMIC);
		var value_subj = Blockly.Python.valueToCode(block, 'subj', Blockly.Python.ORDER_ATOMIC);
		var value_msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'mailFunction(' + Blockly.Python.mailName + ', ' + value_toaddr + ', ' + Blockly.Python.mailPassword + ', ' + Blockly.Python.mailServer + ', ' + Blockly.Python.mailPort + ', str(' + value_subj + ') , str(' + value_msg + '), None)\n';
		return code;
	};

	Blockly.Python['attachment_mail_send'] = function (block) {
		Blockly.Python.mailSetVar();
		var value_toaddr = Blockly.Python.valueToCode(block, 'toAddr', Blockly.Python.ORDER_ATOMIC);
		var value_subj = Blockly.Python.valueToCode(block, 'subj', Blockly.Python.ORDER_ATOMIC);
		var value_msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC);
		var value_attachment = Blockly.Python.valueToCode(block, 'attachment', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'mailFunction(' + Blockly.Python.mailName + ', ' + value_toaddr + ', ' + Blockly.Python.mailPassword + ', ' + Blockly.Python.mailServer + ', ' + Blockly.Python.mailPort + ', str(' + value_subj + ') , str(' + value_msg + '), str(' + value_attachment + '))\n';
		return code;
	};


	Blockly.Python['facebook_setup'] = function (block) {
		Blockly.Python.facebookImport();
		var value_token = Blockly.Python.valueToCode(block, 'token', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.facebookSetup(value_token);
		var code = '';
		return code;
	};

	Blockly.Python['facebook_post'] = function (block) {
		var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'graph = facebook.GraphAPI(' + Blockly.Python.facebookToken + ')\n' +
			'profile = graph.get_object(\'me\')' + '\n' +
			'friends = graph.get_connections(\'me\', \'friends\')' + '\n' +
			'graph.put_object(\'me\', \'feed\', message = str(' + value_message + '))' + '\n'
			;
		return code;
	};

	Blockly.Python['facebook_friendslist'] = function (/* block */) {
		// TODO: Assemble Python into code variable.
		var code = 'facebook.GraphAPI(' + Blockly.Python.facebookToken + ').get_object(\'me/friends\')[\'data\']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['facebook_getfriend'] = function (block) {
		var value_friendnumber = Blockly.Python.valueToCode(block, 'friendNumber', Blockly.Python.ORDER_ATOMIC);
		// var value_friendlist = Blockly.Python.valueToCode(block, 'friendList', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'facebook.GraphAPI(' + Blockly.Python.facebookToken + ').get_object(\'me/friends\')[\'data\'][' + value_friendnumber + ']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['facebook_notifications'] = function (/* block */) {
		// TODO: Assemble Python into code variable.
		var code = 'facebook.GraphAPI(' + Blockly.Python.facebookToken + ').get_object(\'me/notifications\')[\'data\']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['facebook_getlikes'] = function (block) {
		Blockly.Python.requestImport();
		var value_page = Blockly.Python.valueToCode(block, 'page', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.fbLikeSetup();
		var code = 'getLikes(' + value_page + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['facebook_getgroupposts'] = function (block) {
		var value_group = Blockly.Python.valueToCode(block, 'group', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'facebook.GraphAPI(' + Blockly.Python.facebookToken + ').get_object(' + value_group + '+\'/feed\')[\'data\']';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};


	Blockly.Python['twitter_setup'] = function (block) {
		Blockly.Python.twitterImport();
		var value_conskey = Blockly.Python.valueToCode(block, 'consKey', Blockly.Python.ORDER_ATOMIC);
		var value_conssecret = Blockly.Python.valueToCode(block, 'consSecret', Blockly.Python.ORDER_ATOMIC);
		var value_accesstoken = Blockly.Python.valueToCode(block, 'accessToken', Blockly.Python.ORDER_ATOMIC);
		var value_accesstokensecret = Blockly.Python.valueToCode(block, 'accessTokenSecret', Blockly.Python.ORDER_ATOMIC);
		Blockly.Python.twitterSetup(value_conskey, value_conssecret, value_accesstoken, value_accesstokensecret);
		// TODO: Assemble Python into code variable.
		var code = '';
		return code;
	};

	Blockly.Python['twitter_post'] = function (block) {
		Blockly.Python.twitterSetVar();
		var value_msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.tweetText + ' = ' + 'twitterFunction(' + Blockly.Python.twitterKey + ', ' + Blockly.Python.twitterSecret + ', ' + Blockly.Python.twitterToken + ', ' + Blockly.Python.twitterSecretToken + ')\n' +
			Blockly.Python.tweetText + '.update_status(str(' + value_msg + '))\n'
			;
		return code;
	};

	Blockly.Python['twitter_timeline'] = function (/* block */) {
		Blockly.Python.twitterSetTlVar();
		// TODO: Assemble Python into code variable.
		var code = 'twitterTimelineFunction()';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['twitter_user_timeline'] = function (block) {
		Blockly.Python.twitterSetUserTlVar();
		// TODO: Assemble Python into code variable.
		var user = block.getFieldValue('dropdown');
		var code;
		if (user == 'my')
			code = 'twitterUserTimelineFunction(\'myself\')';
		else {
			var username = Blockly.Python.valueToCode(block, 'username', Blockly.Python.ORDER_ATOMIC);
			code = 'twitterUserTimelineFunction(' + username + ')';
		}
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};



	Blockly.Python['twilio_setup'] = function (block) {
		Blockly.Python.twilioImport();
		var value_twi_account = Blockly.Python.valueToCode(block, 'twi_account', Blockly.Python.ORDER_ATOMIC);
		var value_twi_token = Blockly.Python.valueToCode(block, 'twi_token', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		Blockly.Python.twilioSetup(value_twi_account, value_twi_token);
		var code = Blockly.Python.twilioClient + ' = ' + 'Client(' + Blockly.Python.twilioAccount + ', ' + Blockly.Python.twilioToken + ')\n';
		return code;
	};

	Blockly.Python['twilio_call_say'] = function (block) {
		Blockly.Python.twilioImport();
		Blockly.Python.urllibImport();
		var value_twi_to = Blockly.Python.valueToCode(block, 'twi_to', Blockly.Python.ORDER_ATOMIC);
		var value_twi_from = Blockly.Python.valueToCode(block, 'twi_from', Blockly.Python.ORDER_ATOMIC);
		var value_twi_say = Blockly.Python.valueToCode(block, 'twi_say', Blockly.Python.ORDER_ATOMIC);
		var dropdown_twi_language = block.getFieldValue('twi_language');
		// TODO: Assemble Python into code variable.
		var code = 'call =' + Blockly.Python.twilioClient + '.calls.create(to=' + value_twi_to + ', from_=' + value_twi_from + ', url=\'http://twimlets.com/echo?\'+parse.urlencode({\'Twiml\':\'<Response><Say voice="alice" language="' + dropdown_twi_language + '">\'+' + value_twi_say + '+\'</Say></Response>\'}))\n'
			;
		return code;
	};

	Blockly.Python['twilio_call_music_url'] = function (block) {
		Blockly.Python.twilioImport();
		Blockly.Python.urllibImport();
		var value_twi_to = Blockly.Python.valueToCode(block, 'twi_to', Blockly.Python.ORDER_ATOMIC);
		var value_twi_from = Blockly.Python.valueToCode(block, 'twi_from', Blockly.Python.ORDER_ATOMIC);
		var value_twi_music_url = Blockly.Python.valueToCode(block, 'twi_music_url', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'call =' + Blockly.Python.twilioClient + '.calls.create(to=' + value_twi_to + ', from_=' + value_twi_from + ', url=\'http://twimlets.com/message?\'+parse.urlencode({\'Message[0]\':' + value_twi_music_url + '}))\n'
			;
		return code;
	};

	Blockly.Python['twilio_msg'] = function (block) {
		var value_twisms_to = Blockly.Python.valueToCode(block, 'twiSMS_to', Blockly.Python.ORDER_ATOMIC);
		var value_twisms_from = Blockly.Python.valueToCode(block, 'twiSMS_from', Blockly.Python.ORDER_ATOMIC);
		var value_twi_msg = Blockly.Python.valueToCode(block, 'twi_msg', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'message =' + Blockly.Python.twilioClient + '.messages.create(to=' + value_twisms_to + ', from_=' + value_twisms_from + ', body=' + value_twi_msg + ')\n';
		return code;
	};

	Blockly.Python['twilio_calllist'] = function (/* block */) {
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.twilioClient + '.calls.list()'
			;
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['twilio_getcall'] = function (block) {
		Blockly.Python.twilioSetCallVar();
		var value_nrcall = Blockly.Python.valueToCode(block, 'nrCall', Blockly.Python.ORDER_ATOMIC);
		var value_callli = Blockly.Python.valueToCode(block, 'callLi', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'twilioCallFunction(' + value_callli + ', ' + value_nrcall + ')';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['twilio_msglist'] = function (/* block */) {
		// TODO: Assemble Python into code variable.
		var code = Blockly.Python.twilioClient + '.messages.list()'
			;
		return [code, Blockly.Python.ORDER_NONE];
	};

	Blockly.Python['twilio_getSMS'] = function (block) {
		Blockly.Python.twilioSetSmsVar();
		var value_nrsms = Blockly.Python.valueToCode(block, 'nrSms', Blockly.Python.ORDER_ATOMIC);
		var value_smslist = Blockly.Python.valueToCode(block, 'smsList', Blockly.Python.ORDER_ATOMIC);
		// TODO: Assemble Python into code variable.
		var code = 'twilioSmsFunction(' + value_smslist + ', ' + value_nrsms + ')'
			;
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
	};
};

/***/ })

}]);