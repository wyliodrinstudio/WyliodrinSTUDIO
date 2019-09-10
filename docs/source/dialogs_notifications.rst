:orphan:

Dialogs and Notifications
===========================

|
|

In the *"workspace"* plugin you will find, additionally to the functions presented in the API sections, some functions designed to create and display some customized pop-ups, like dialogs, prompts and notifications.

Dialogs
*********
A dialog is a component that informs users about a specific task and may contain important informations, require decisions, or involve multiple actions or inputs. It can usually be used to collect data from the user.

.. _showDialog:

.. autofunction:: showDialog

For example, having the :ref:`simple` created, let's say that when the button is clicked, you want to open a simple dialog with an input text area and a "Close" button. The content of the *ButtonDialog.vue* component will be:

:: 

	<template>
		<v-card>
			<v-card-text>
				{{$t('BUTTON_EXAMPLE_INPUT_TEXT')}}
				<v-text-field></v-text-field>
			</v-card-text>

			<v-card-actions>
				<v-btn text @click="close">Close</v-btn>
			</v-card-actions>
		</v-card>
	</template>


Inside the **script** section, you will define the methods that your component needs:

.. code-block:: javascript

	export default {
		name: 'ButtonDialog',
		data() {
			return {

			}
		},
		methods: {
			close() {
				this.$root.$emit ('submit', undefined);
			}
		}
	}

The *index.js* file will have the following structure:

.. code-block:: javascript

	import ButtonDialog from './views/ButtonDialog.vue';

	let studio = null;

	export function setup(options, imports, register)
	{
		studio = imports;

		/* Register a toolbar button that on click will reveal a dialog with the specified title, image and component */
		studio.workspace.registerToolbarButton ('BUTTON_EXAMPLE_NAME', 20, 
			() => studio.workspace.showDialog ('BUTTON_EXAMPLE_DIALOG_TITLE', ButtonDialog),
			'plugins/button.example/data/img/button.png');
		
		register(null, {
			button_example: button_example
		});
	}

The *title* parameter is not mandatory when you call the **showDialog** function, because you can choose the title of a dialog box within the Vue file that designs this component.

For example:

:: 

	<template>
		<v-card>
			<v-card-title>
				{{ $t('BUTTON_EXAMPLE_DIALOG_TITLE') }}
			</v-card-title>

			<v-card-text>
				{{$t('BUTTON_EXAMPLE_INPUT_TEXT')}}
				<v-text-field></v-text-field>
			</v-card-text>

			<v-card-actions>
				<v-btn text @click="close">Close</v-btn>
			</v-card-actions>
		</v-card>
	</template>


The **script** section will have the same structure as before, while within the **index.js** file you will have to register your button as it follows:

.. code-block:: javascript

	studio.workspace.registerToolbarButton ('BUTTON_EXAMPLE_NAME', 20, 
		() => studio.workspace.showDialog (ButtonDialog),
		'plugins/button.example/data/img/button.png');

As you can notice, the **showDialog** function will use only the *ButtonDialog* component as parameter.

|

In both situations the result will be the same:

.. image:: images/showDialog.png
	:align: center
	:width: 470px
	:height: 350px


|

Prompts
*********

A prompt is actually a dialog box that requires a user decision. A prompt box is often used if you want the user to input a value before entering a page, for example write a text or click on a button that will perform a certain action.

|

.. autofunction:: showPrompt

This prompt is used to rename a project. The 'PROJECT_RENAME_PROJECT' is a translatable key string that corresponds to the title of the prompt (*Rename Project*) and 'PROJECT_NAME_PROMPT' represents the question or the statement addressed to the user (*Please input the name of the project*). Both key strings have to be included within the translations files.

The **showPrompt** function will return the value inputted by the user if he will click on *OK* and null otherwise, so that you can perform different actions depending on its answer. 

.. image:: images/showPrompt.png
	:align: center
	:width: 500px
	:height: 270px

|

.. autofunction:: showConfirmationPrompt

.. image:: images/showConfirmationPrompt.png
	:align: center
	:width: 500px

|

Notifications
**************

The notifications are simple pop-ups that inform the user about unauthorized actions, required operations or system processes.

The possible types for a notification are: *info*, *success*, and *warning*, and each type has a distinct color.

.. _notification:

.. autofunction:: showNotification

.. image:: images/showNotification.png
	:align: center

In this situation, "title" is a variable that represents the title of the notification and will be included in the *messages-ln.json* translation files as it follows:

.. code-block:: json

	{
		"TRANSLATED_TEXT_ID": {
			"message": "The title of your workspace is: {title}",
			"description": "Text of the notification the user created."
		}
	}

*title* will be the actual name of your workspace, in this example: *Workspace Title*.

|

.. autofunction:: showError

.. image:: images/showError.png
	:align: center


Similar to *showNotification*, "title" is a variable that represents the title of the error notification and will be included in the *messages-ln.json* translation files as it follows:

.. code-block:: json

	{
		"TRANSLATED_TEXT_ID": {
			"message": "The device: {title} was unable to connect.",
			"description": "Text of the notification the user created."
		}
	}

*title* will be the name of the device  you are trying to connect, in this example: *AwesomeDevice*.