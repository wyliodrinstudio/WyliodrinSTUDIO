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

For example, having the :ref:`simple` created, let's say that when the button is clicked, you want to open a simple dialog with an input text area. This is how you will call the **showDialog** function when you register the toolbar button:

.. code-block:: javascript

	studio.workspace.showDialog ('EXAMPLE_BUTTON_DIALOG_TITLE', ButtonDialog);

where **ButtonDialog** will represent the Vue component that you will need to create in the *views* directory, its purpose being to design and to add functionalities to the dialog box.

Let's suppose you want to create a simple dialog, which has an input text area and a "Close" button. The content of the *ButtonDialog.vue* component will be:

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

By the end, when you click on the button, the **showDialog** function result will be:

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

This prompt is used to rename a project.

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