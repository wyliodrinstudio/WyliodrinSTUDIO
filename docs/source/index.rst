Wyliodrin Studio documentation
==============================

|
|

Installing Wyliodrin Studio
***************************

To download the source code, you must have a GitHub account. Open a terminal and choose the folder where you’d want to clone our repository. In this case, we’ll use the home directory and run:

::

	git clone https://github.com/alexandruradovici/WyliodrinSTUDIO2/tree/plugin-works

Go to this new folder using the **cd** command and run : **npm install**, in order to add all the modules required. 

|

Building the application
************************

We offer you 2 procedures to build of the Wyliodrin Studio application:

* For the standalone version, you will have to run the following commands: **npx webpack**, then **npm start**
* For the browser edition, you will use: …………………….

Once the application was installed and built, you can make changes, correct or customize our source code, in order to improve it.

|

.. _plugin:

How to add a plugin
********************

Basically, a plugin is a software component that helps you to add specific feature to our program. 
In order to create your own plugin, you should open the folder that you cloned before with a source-code editor, like **Visual Studio Code**. After that, you will have to open the **source/plugins** folder, and create a new folder, named after the plugin you’d like to add. 
The plugin name will be lowercase, and the words separated by “.”
For example, we’ll create the *my.new.plugin* folder.
The main components that you’ll need to create for your plugin are:
* The **views** folder: here you will design the user interface for your plugin, using the progressive framework *VUE*, so here you will be creating all your *.vue* files. (In our case, *MyVueFile.vue*)
* The **package.json** file, which contains an object with the primary details regarding your plugin:

	1. *“name”* : the name of your plugin (“my.new.plugin”)
	2. *“version”*: *“0.0.1”*
	3. *“main”*: the main file of the plugin, that will discuss as the next component, and that we’ll call **“index.js”**
	4. *“private”*: **false**/**true**, if you want your plugin to be seen by everyone or only by yourself
	5. *“plugin”*: an object where we specify if our plugin consumes other plugins( it's using functions exported by these other plugins) and if it provides something, if necessary (our plugin will export functions to be used by other plugins). All our plugins depend on the “workspace” plugin, so the last key-value set of the package.json file will look like this:

:: 

	“plugin”: {
		“consumes”: [“workspace”, “any_other_plugin_name”], 
		“provides”: [“my_new_plugin”]
	}

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

* The **store.js** file: it's optional, useful if you need to store some variables states
* The **data** folder: contains a sub-directory, **img**, which can also include different folders that you’ll need in order to keep the images that you use inside your .vue files
* The **style** folder: contains the *.less* files, where we apply the CSS design for the different vue-components
* The **translations** folder: consists of the *messages-ln.json* (ln=language abbreviation). We will present the purpose and the use of the translation files in a separate topic.

|

.. How to create a device plugin
.. *********************************


.. toctree::
   :maxdepth: 2
   
   workspace
   translations
   projects
   device_plugin


.. Indices and tables
.. ==================

.. * :ref:`genindex`
.. * :ref:`modindex`
.. * :ref:`search`
