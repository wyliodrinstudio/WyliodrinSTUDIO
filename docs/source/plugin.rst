:orphan:

How to write a plugin
=========================

|

Getting started
*****************
In this section, we will try to create a new plugin, called **"button.example"**, that will add a toolbar button which will show a notification when is clicked.

The purpose of this tutorial is to help you to better understand the idea of plugin, the steps that you need to follow, the structure and behavior of each component file, as they were explained in the :ref:`Architecture chapter <plugin>`.

The first step will be to create the **button.example** folder inside the *plugins* directory. Then, we'll add the *package.json* file.

As mentioned before, the content of this type of file has to be an object with the following properties:

1. “name” : the name of the plugin (“button.example”)
2. “version”: “0.0.1”
3. “main”: the main file of the plugin, that will be “index.js”
4. “private”: in this case **false**, we want the plugin to be visible
5. “plugin”: the object where we specify if our plugin consumes other plugins (required *"workspace"*) and if it provides something (*"example_button"*. We also include here the *target* property, which specifies for each version of the program the plugin should be working: **browser** or **electron**.

Finally, the content of our package.json will be:

.. image:: images/mypackagejson.png
	:align: center

|

The second step is to create the main file, called **index.js**. 

If you already read :ref:`this section <plugin>`, you probably noticed that in the **index.js** file we should've imported first the **.vue** files from the **views** folder. In this plugin tutorial, we only register a simple button, which means that we don't need a **.vue** file to design a specific Vue component.

Therefore, we'll only need to initiate a **studio** variable to *null* and to create an empty object called **button example**.

After that, we have to *export* a **setup** function, its parameters being:

* *options* = additional options
* *imports* = all the functions that the plugin collects from the plugins that it consumes * in our case, the functions exported by *workspace*)
* *register* = a function that will register the plugin object

Inside this function, the **studio** variable instantiated before will receive the **imports** value.

After that, we need to register our button, so we'll call the worskpace function **registerToolbarButton**, which has the following parameters:

* *'EXAMPLE_BUTTON'* = the name of our button, a key string that will be translated
* *20* = the priority of our button in the list of all toolbar buttons
* *() => studio.workspace.showNotification* = the action that will be performed when the user clicks on this button
* *plugins/button.example/data/img/button.png'* = the relative path to the image that will represent our button

The **showNotification** function is also called from the workspace and its parameters are:

* *'NOTIFICATION_TEXT'* = the key string that will be translated and will represent the text of our notification
* *'success'* = the notification type

|

By the end, our **index.js** file should look like this:

.. image:: images/indexjs.png
	:align: center

As you noticed above, when we registered the image corresponding to our button, we specified its relative path, which includes some additional folders in our *button.example* plugin. So, inside the *button.example* directory we have to create the **data** folder, which will include another folder, called **img**. Here, we'll copy our image, its name being **button.png**.

|

The last component missing from our plugin is the **translations** folder. More details about how the translation function works can be found :ref:`here <translations>`.

Only to exemplify the content of this folder, we'll create the **messages-en.json** (english language) and **messages-fr.json** (french language).

In our *index.js* file, you can notice that we used 2 strings having the following format: **'PLUGIN_STRING_TO_TRANSLATE'**, more precisely: *'EXAMPLE_BUTTON_NAME'* and *'EXAMPLE_BUTTON_NOTIFICATION_TEXT'*. It means that this key-strings have to be included in both our translation files.

As you can see in the :ref:`Translations <translations>` chapter, the value that the key string will receive has to be an object with 2 properties: *message* (the actual translation), *description* (a short definition of the string to translate).

By the and, your **messages-ln.json** (ln = language) files should look like this:

.. image:: images/english.png
	:align: center

|

.. image:: images/french.png
	:align: center

To test if you successfully created your first plugin, you have to rebuild the program using the 2 commands for electron **npx webpack**, then **npm start**. 

POZA DIN APLICATIE


|

Write a device driver plugin
******************************

Now that you manage to create your own, simple plugin, the next step wold be to understand how the device driver plugins are made.

An additional component will be a **"visual"** folder, which will include 4 **'.js'** files: *code_picamera*, *code_pyfirmata*, *definitions_picamera* and *definitions_pyfirmata*. The purpose of these files is to import the blocks necessary to run the code on your board.

|

If you're trying to add a new board plugin, our *"device.wyapp.raspberrypi"*, *"device.wyapp.beagleboneblack"* and *"device.wyapp.udooneo"* plugins may serve as a support for you.

In the **index.js** file, you will have to import the 4 files mentioned above from the **visual** folder.

After that, in the *setup* function, you nedd to create an event, so when the board is *'ready'*, you call the **registerPinLayout** function from our *"pinlayout"* plugin. The purpose of this function is to register the pins of your board in the **Pin Layout** tab, using the appropriate images that you saved in the *data* folder of our plugin.

For example, if we are connected to a Raspberry Pi, the contect of the Pin Layout tab will be: 

.. POZA

The next step is to create an object having your new board name, with the next functions:

	**iconURL()** => the image corresponding to your board

	**found(device)** => if a device was found, you can modify some of its properties

	**update(device)** => update a device, modify some of its properties

	**run(project)** => modify the project before run

|

The final step is to register your board and, if it's necessary, the blocks that you'll use, from the *"editor_visual"* plugin:

As an example, you can use our *"device.wyapp.raspberrypi"* plugin:

.. code-block:: javascript

	studio.device_wyapp.registerBoard ('raspberrypi', raspberrypi);

		studio.editor_visual.registerBlocksDefinitions ('raspberrypi', [firmata_blocks, picamera_blocks], [firmata_code, picamera_code], toolbox, 
			{
				type: 'wyapp', 
				board: 'raspberrypi'
			}
		);

|

How to write an editor plugin
********************************
Since you have all cleared about how to create a plugin ang the main files it should consist of, we can pass to the next tutorial, which includes the making of an editor plugin. The purpose of this type of plugins is to create a text editor, which is correlated to our *"projects"* plugin.

The name of the editor plugins should be **projects.editor.**, followed by the name of the editor. To make things more clear, we'll use the *projects.editor.ace* plugin as an example.

First, we need to create the **views** folder, where our **.vue** file will be included. The editor has to be integrated like this:

.. image::images/editor.png

The **editor** tag is actually a module imported, installed as *'vue2-ace-editor'*.

As you can notice, we are modeling the **source** variable (*v-model="source"*), to update the editor according to che canges that are made. 

The option **@init="initEditor"** calls the *initEditor* function at initialization. This function is defined in *methods* and its purpose is to make a require on some modes, themes and snippets supported by the text editor:

.. code-block:: javascript

	initEditor (/*editor*/)
	{
		require('brace/ext/language_tools'); //language extension prerequsite...
		// require('brace/mode/html');
		require('brace/mode/sh');                
		require('brace/mode/python');    //language
		require('brace/mode/javascript');    //language
		require('brace/mode/less');
		require('brace/theme/chrome');
		require('brace/theme/monokai');
		require('brace/snippets/python'); //snippet
		require('brace/snippets/javascript'); //snippet
	}

The option **:lang="sourceLanguage"** updates the mode according to the programming language, while **:options="editorOptions"** applies some customized options.

In the **script** part, we nedd to add a *watch* property on the **filename** variable:

.. code-block:: javascript

	watch:
	{
		filename: // in functie de tipul fisierului vad ce mod dau
		{
			immediate: true,
			async handler ()
			{
				switch (path.extname (this.filename))
				{
					case '.py':
					{
						this.sourceLanguage = 'python';
						break;
					}
					case '.sh':
					{
						this.sourceLanguage = 'sh';
						break;
					}
					case '.js':
					{
						this.sourceLanguage = 'javascript';
						break;
					}
					default:
					{
						this.sourceLanguage = '';
						break;
					}
				}
				let source = await this.studio.projects.loadFile (this.project, this.filename);
				if (source !== null) this.source = source.toString ();
				else this.studio.workspace.showNotification ('Failed to load file '+this.filename);
			}
		}

The purpose is to change the mode, meaning to update the *sourceLanguage* variable, according to che type/extension of the file.

We are also watching the changes that occur on the **source** variable and when it's updated, we are saving the file that was edited with our editor.

.. code-block:: javascript

	async source (newValue, oldValue)
		{
			if (newValue !== oldValue)
			{
				await this.studio.projects.saveFile (this.project, this.filename, this.source);
			}
		}

The content of the **index.js** file is classic. At first, we import the Vue component created before:

.. code-block:: javascript

	import Ace from './views/AceEditor.vue';

After that, inside the *setup* function, we register our nu editor using the workspace function :ref:`registerEditor <editor>`:

.. code-block:: javascript

	studio.projects.registerEditor('EDITOR_ACE',['py','js','json','d','c','h','sh'], Ace);

|


How to write a language plugin
********************************

The purpose of this type of plugins is to register a new programming language that will be supported by the Wyliodrin Studio IDE.

As an example, we'll use our **language.python** plugin.

As you can notice, the name of this type of plugins should begin with *"language."*, which will be followed by the actual name of the programming language that you want to register.


As any other plugin, it's also required to have a *package.json* file, having the classic format. It's necessary to mention that this type of plugin **consumes** both *"workspace"* and *"projects"* plugins, and their **target** are *"electron"* and *"browser"*.

The language plugin doesn't have any Vue component, so we don't have to create the **views** folder, but we need the **data** folder to save a characteristic image for the programming language. For example, for our *language.python* plugin, the image in the **data/img** folder is:

.. image:: images/language.python.png
	:align: center
	:width: 70px
	:height: 70px

Inside the main file, **index.js**, we  obviously need to initialize the *studio* variable to null, and insinde the *setup* function it will receive all the imported functions from the "workspace" and "projects" plugin.

The next step is to create the **python** object, that will have the following structure:

.. code-block:: javascript

	let python = {
		async createProject(name){
			await studio.projects.newFile(name,'/main.py','print (\'Hello from Python\')');			
		},
		getDefaultFileName() {
			return '/main.py';
		},
		getDefaultRunFileName() {
			return '/main.py';
		},
		getMakefile(project, filename) {
			if (filename[0] === '/') filename = filename.substring (1);
			// TODO add filename
			return 'run:\n\tpython main.py';
		},
	};

So each programming language should have its own project, with a **main** file, which will have the corresponding extension (in this case, *.py*), and its content should also be representative. For example, on the first line of the *main.py* file, we will find the code line:

.. code-block:: python

	print (\'Hello from Python\')

After that, we return the ***main** file as *default file name( and *default run file name*) and we also create and return the **makefile** of the project.

The next step is to register the new programming language, using the function :ref:`registerLanguage <registerLanguage>`:

.. code-block:: javascript

	studio.projects.registerLanguage('python', 'Python', 'plugins/language.python/data/img/python.png', python);