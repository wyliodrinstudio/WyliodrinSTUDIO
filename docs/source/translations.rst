:orphan:

.. _translations:

Translations
==============

|

As we mentioned before, each plugin has a **translations** folder, where we can find the **messages-ln.json** files, one for each language available in our application. These files contain an object with a list of key-value sets. In the *.vue* files you will use strings on different purposes (for example, to name a button) and you will need to update their translation according to the language you choose in the app.  This action is possible using our translation function, which you can find in our .vue files with the following syntax: 

::

	$t(‘PLUGIN_STRING_TO_TRANSLATE’)

where PLUGIN will be replaced by the name of your plugin.

|

‘PLUGIN_STRING_TO_TRANSLATE’ is a key that you will include in the messages-ln.json file, for each language. Its corresponding value is a new object, that contains a **message** (the translation itself) and a **description**. 

|

For example, let’s say that in your message-en.json (English language) you want to translate the word *‘Close’*, that will be attached to a button.

::

	{
	    “MYNEWPLUGIN_CLOSE”: {
			“message”: “Close”,
			“description”: “This button is used to close the current window.”
	    }
	}

|

As you can imagine, in your *messages-fr.json* (French language), you’ll have:

::

	{
	    “MYNEWPLUGIN_CLOSE”: {
			“message”: “Fermer”,
			“description”: “This button is used to close the current window.”
	    }
	}

|

Load and Send translation files
*******************************

|

Inside the Wyliodrin Studio 2 repository, you will find a directory named **tools**, which includes a **translation** sub-directory, with a **translation.js** main file. Here, you have 2 options to run this file:

|

.. code-block:: javascript

	node translation.js

This command joins all the key-value sets from all the existing plugins, for each language, into the messages-ln.json files from the current **translation** folder. It also checks for errors through all these files, using as reference file the english translation, and it let's you know if there are missing or duplicate keywords in a certain language.

|

.. code-block:: javascript

	node translation.js send

Compiling the code with the **'send'** argument helps you split all the translations in a *messages-ln.json* file according to the plugin related to each key-value set. It also copies the description from the english translation and it applies it to the corresponding keyword for every other language.

