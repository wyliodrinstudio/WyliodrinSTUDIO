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

For example, having the :ref:`simple` created, let's say that when the button is clicked ,you want to open a simple dialog with an input text area. This is how you will use the **showDialog** function:

.. code-block:: javascript

	studio.workspace.showDialog ('EXAMPLE_BUTTON_DIALOG_TITLE', ButtonDialog);

where **ButtonDialog** will represent the Vue component that you will need to create in the *views* directory, its purpose being to design and to add functionalities to the dialog box.

Let's suppose you want to create a simple dialog, which has an input text area and a "Close" button. For this, in the **template** section you will have to use the *<v-card>* component, where you will add the input box (*<v-text-field>*) and the button (*<v-btn>*, inside the *<v-card-actions>*).

Inside the **script** section, you will define the methods that your component needs, which means the *close()* function:

.. code-block:: javascript

	close() {
		this.$root.$emit ('submit', undefined);
	}

By the end, when you click on the button, the **showDialog** function result will be:

.. image:: images/showDialog.png
	:align: center
	:width: 470px
	:height: 370px

|

.. autofunction:: showDeviceSettingsDialog

.. image:: images/deviceSettingsDialog.png
	:align: center
	:width: 470px
	:height: 380px



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


|

.. autofunction:: showError

.. image:: images/showError.png
	:align: center
