:orphan:

General Architecture of Wyliodrin STUDIO
===========================================

|

Wyliodrin STUDIO consists of a series of plugins that we used to build the different parts of our application. 

Basically, a plugin is a software component that helps you to add specific feature to a program. When a program supports plugins, it enables customization, which means that you will be able contribute to the development and improvement of our application.

|

.. _plugin:

In order to create your own plugin, you should open the folder that you cloned before with a source-code editor, like **Visual Studio Code**. After that, you will have to open the **source/plugins** folder, and create a new folder, named after the plugin you’d like to add. 

.. image:: images/plugins.png
	:align: center


The plugin name will be lowercase, and the words separated by “.”
For example, we’ll create the **my.new.plugin** folder.

The main components that you’ll need to create for your plugin are:

* The **views** folder: here you will design the user interface for your plugin, using the progressive framework *VUE*, so here you will be creating all your *.vue* files. (In our case, *MyVueFile.vue*)
* The **package.json** file, which contains an object with the primary details regarding your plugin:

	1. *“name”* : the name of your plugin (“my.new.plugin”)
	2. *“version”*: *“0.0.1”*
	3. *“main”*: the main file of the plugin, that we’ll call **“index.js”**
	4. *“private”*: **false**/**true**, if you want your plugin to be seen by everyone or only by yourself
	5. *“plugin”*: an object where we specify if our plugin consumes other plugins( it's using functions exported by these other plugins) and if it provides something, if necessary (our plugin will export functions to be used by other plugins). We also include here the *target* property, which specifies for each version of the program the plugin should be working.

	As an example, a *package.json* file should look like this:

.. image:: images/packagejson.png
	:align: center


* The **index.js** file, which will be your main file. Here, you need to import all the *.vue* files that you need to register. 
	For example, the first line in your index.js will be: 
	::

		import MyVueFile from ‘./views/MyVueFile.vue’; 

	After that, you’ll need to instantiate an object (ex: *my_vue_file={};* ) that can be empty, or that can contain different functions that you’ll use. Then, you’ll have to export a function called “setup”, using the following syntax:
	
.. code-block:: javascript

		export function setup(options, imports, register)
		{ 
		    const studio = imports;
		    studio.workspace.functionName(param1, param2, MyVueFile);
		    register(null, { my_vue_file: my_vue_file});
		}

* The **store.js** file: it's optional, useful if you need to store some variables states.
* The **data** folder: contains a sub-directory, **img**, which can also include different folders that you’ll need in order to keep the images that you use inside your .vue files.
* The **style** folder: contains the *.less* files, where we apply the CSS design for the different vue-components.
* The **translations** folder: consists of the *messages-ln.json* files(ln=language abbreviation). More details regarding this subject can be found :ref:`here <translations>`.

|

At the end, the folder should look like this:

.. image:: images/folder.png
	:align: center

