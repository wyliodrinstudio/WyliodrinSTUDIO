:orphan:

General Architecture of Wyliodrin STUDIO
===========================================

|

Wyliodrin STUDIO consists of a series of plugins that we used to build the different parts of our application. 

Basically, a plugin is a component of the program that will help you apply different features. Due to the fact that Wyliodrin Studio supports plugins, it enables customization, which means that you will be able contribute to the development and improvement of our application.


To design the user interface we chose the `Vue framework <https://vuejs.org/v2/guide>`_. The connection between frontend and API has always been a challenge and required a lot of work because of its complexity, but since we are using **Vue** to develop our frontend, the best solution to this problem is the `VueX <https://vuex.vuejs.org/>`_ library, which is deeply integrated into Vue and exploits its reactivity.

|

Plugin architecture
""""""""""""""""""""""

.. _plugin:

Each plugin is a folder in the **source/plugins**.

In order to create your own plugin, you should open the folder that you cloned before with a source-code editor, like **Visual Studio Code**. After that, you will have to open the **plugins** folder, that represents the "storage center" for all the plugins and that is found inside the **source** folder. Here, in **plugins**, you will create a new folder, named after the plugin you’d like to add. 

.. image:: images/plugins.png
	:align: center


The plugin name will be lowercase, and the words separated by “.”
For example, we’ll create the **my.new.plugin** folder.

The main components that you’ll need to create for your plugin are:

* The **views** folder: here you will be creating all your *.vue* files to will design the user interface for your plugin. (In our case, *MyVueFile.vue*)
* The **package.json** file, which contains an object with the primary details regarding your plugin:

.. list-table::
	:widths: 17 55 15 7

	* - Property title
	  - Description
	  - Required / Optional
	  - Default value
	* - *name*
	  - the name of the plugin (“button.example”)
	  - required
	  - \-
	* - *version*
	  - 0.0.1
	  - required
	  - "0.0.1"
	* - *main*
	  - the main file of the plugin, that will be “index.js”
	  - required
	  - "index.js"
	* - *plugin*
	  - an object where we specify the characteristics of the plugin
	  - required
	  - \-

The properties of the *"plugin"* component are:

.. list-table::
	:widths: 17 55 15 7

	* - Property title
	  - Description
	  - Required / Optional
	  - Default value
	* - *consumes*
	  - we specify from which other plugins our plugin uses exported functions (required *"workspace"*)
	  - required
	  - ["workspace"]
	* - *provides*
	  - we specify if our plugin functions will be exported (*"example_button"*)
	  - optional
	  - []
	* - *target*
	  - for which version of the program the plugin should be working: **browser** or **electron**
	  - required
	  - \-

As an example, a *package.json* file should look like this:

.. code-block:: json

	{
		"name": "my.new.plugin",
		"version": "0.0.1",
		"main": "index.js",
		"private": false,
		"plugin": {
			"consumes": ["workspace"],
			"provides": ["my_new_plugin"],
			"target": ["browser", "electron"]
		}
	}

* The **index.js** file, which will be your main file. Here, you need to import all the *.vue* files that you need to register. 
	For example, the first line in your index.js will be: 

.. code-block:: javascript

	import MyVueFile from './views/MyVueFile.vue'; 

After that, you’ll need to instantiate an object that can be empty, or that can contain different functions that you’ll use. 
Then, you’ll have to export a function called “setup”, which has the purpose to register your plugin and to make it functional inside the application.


* The **store.js** file: it's optional, useful if you need to store some variables states.
* The **data** folder: contains a sub-directory, **img**, which can also include different folders that you’ll need in order to keep the images that you use inside your .vue files.
* The **style** folder: contains the *.less* files, where we apply the CSS design for the different vue-components.
* The **translations** folder: consists of the *messages-ln.json* files(ln=language abbreviation). More details regarding this subject can be found :ref:`here <translations>`.

|

At the end, the folder should look like this:

.. image:: images/folder.png
	:align: center

|

Dependencies
""""""""""""""""

We are using the **webpack** module to process the Wyliodrin STUDIO application. If you're not familiarized with webpack, you should consult the theory presented in their `documentation <https://webpack.js.org/concepts/>`_, in order to understand which are the core concepts and how the modules that we use are mapped into the "dependency graph".

As you probably read before, there are 2 different options to build the code, depending on the version that you are using:

- *Standalone* 

.. code-block:: console

	npx webpack

- *Browser*

.. code-block:: console

	npx webpack --config=webpack.browser.config.js

|

Once the code was built, a folder named **"build"** is created. Its content represents the distribution code, which means a "minimized and optimized output of our build process that will eventually be loaded". More details can also be found `here <https://webpack.js.org/guides/getting-started/>`_.

To pack (or "bundle") a dependency, we need to install the module locally. These dependencies are copied in the *build* folder, but they are not available yet for the browser version of Wyliodrin STUDIO.

.. code-block:: console

	npm install archiver --save


|

We also created the **devDependencies** option, which allow to some particular dependencies to work not only for the electron edition, but also for the browser one. They are saved in the main *package.json* file of the program, as *devDependencies* property, and they are installed using the command:

.. code-block:: console

	npm install highcharts --save-dev

|

Imports
********

Each plugin exports in its main file "index.js" a **setup** function, designed to register the plugin. The structure of this function is:

.. code-block:: javascript

	export function setup(options, imports, register)
	{
		/* the function code */
	}


As you can see, one of the parameters of this function is **imports**.

The *imports* object has as purpose to collect all the functions and dependencies from the other plugins that our plugin consumes.

For example, let's suppose that you have a plugin called *"test.plugin"*, which depends on the "workspace" and "projects" plugins. This means that the content of its *package.json* file will be:

.. code-block:: json

	{
	    "name": "test.plugin",
	    "version": "0.0.1",
	    "main": "index.js",
	    "private": false,
	    "plugin": {
	        "consumes": ["workspace", "projects"],
	        "provides": [],
	        "target": ["electron", "browser"]
	    }
	}

The fact that your plugin *consumes* these 2 plugins means that the **imports** object will include all their modules and will allow you to access all their functions. Therefore, your *setup* function from the "index.js" file could look like this:

.. code-block:: javascript

	let studio = null;

	export function setup (options, imports, register)
	{
		studio = imports;

		/* use the registerTab function from the workspace plugin */
		studio.workspace.registerTab('TEST_TAB', 100, TestTab, {
			visible ()
			{
				/* use the getCurrentProject function from the projects plugin to make 
				the tab visible only if there is a project opened */

				return !!studio.projects.getCurrentProject();
			}
		});
	}

|

Provides
************

As it was specified in :ref:`this <plugin>` section, **"provides"** is a property assigned to the "plugin" property in the *package.json* file of each plugin. The idea around this property is to indicate if a plugin will export its own functions and modules to be used by other plugins. 

For example, let's assume that you have the same plugin, "test.plugin", which doesn't provide anything. This means that all its functions will be private and no other plugin will pe able to use them, not even if it specifies that it *"consumes"* your plugin.

In this case, the *package.json* file of your plugin will look like this:

.. code-block:: json

	{
	    "name": "test.plugin",
	    "version": "0.0.1",
	    "main": "index.js",
	    "private": true,
	    "plugin": {
	        "consumes": [],
	        "provides": [],
	        "target": ["electron", "browser"]
	    }
	}

But if you want for your plugin to provide all its functions so that the others plugins may access and use them, you have to indicate this option inside the *"provides"* property. You should be careful at the fact that the provided object should not contain and "." in its name, unlike the plugin name.

Therefore, the content of the *package.json* should be:

.. code-block:: json

	{
	    "name": "test.plugin",
	    "version": "0.0.1",
	    "main": "index.js",
	    "private": true,
	    "plugin": {
	        "consumes": [],
	        "provides": ["test_plugin"],
	        "target": ["electron", "browser"]
	    }
	}

As you can see, your "test.plugin" provides the *"test_plugin"* object, which means that if another plugin it's using its functions, it should consume the same *"test_plugin"* object.

|

Architecture Components:
""""""""""""""""""""""""""

Connection Button
******************

In the *workspace* plugin we added the connection button, which was designed inside the *DeviceTools.vue* component. It is visible only when there is no device connected to Wyliodrin Studio.

.. image:: images/connectionbutton.png
	:align: center


On click, it calls the :ref:`showConnectionSelectionDialog <showConnectionSelectionDialog>` and it opens a dialog where the user can see all the available devices. By clicking on a device, he will be asked to input the technical specifications and the login credentials, in order to connect and enable the device functionalities. When the connection was successfully completed, the device status will change from *DISCONNECTED* to *CONNECTED*.

|

Toolbar Buttons
****************
The toolbar is a component located at the top of the window, on which you can add multiple elements. 

.. image:: images/toolbar.png
	:align: center
	:width: 700px
	:height: 50px

The toolbar buttons are created using the **registerToolbarButton** function. One of the functionalities added in the toolbar using this function is the *Projects Library*, which opens a dialog where the user can manage his applications.

.. image:: images/registerToolbarButton.png
	:align: center

|

Tabs
*****

.. image:: images/tabs.png
	:align: center

The tabs are the main components of the workspace, created using the **registerTab** function. They offer the possibility to write and test the code for programming an IoT device, display sensors data, import Frietzing schematics or access the connected device directly through the shell.

The existing tabs at the moment are: **Application**, **Dashboard**, **Notebook**, **Schematics** and **Shell**.

|

Status Buttons
*****************

.. image:: images/registerStatusButton.png
	:align: center
	:width: 80px
	:height: 50px

The Status Buttons are created with the **registerStatusButton** function. They are used to open the *console* or the *mqtt* server.

The **Console** button opens a console similar to the *shell*.

The **MQTT** button opens an interface where you can choose the port where the *MQTT* server will be opened (publish-subscribe-based messaging protocol).

|

Menu
*****

The Menu is an element created on the toolbar component, represented by the following icon:

.. image:: images/menu.png
	:align: center

When clicked, it opens a menu containing different elements that help the user learn more about Wyliodrin STUDIO, send his feedback or switch to the advanced mode.

The components of the menu are:

.. image:: images/menuitems.png
	:align: center






