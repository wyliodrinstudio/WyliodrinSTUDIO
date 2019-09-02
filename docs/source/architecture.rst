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

As any other program, our application also requires to install new packages or modules that will be used by our plugins and which are known as **dependencies**. For the moment, all our dependencies can be found in the *package.json* file of the main folder, not distributed in the *package.json* files of each plugin. The simple dependencies, the ones that we install using the *--save* argument, are depending only on the platform, which means they are not working in browser (like *serialport*). For this reason, they should be saved as **devDependencies**, meaning that the argument will be *--save-dev*.

For example, if we want to install the *highcharts* module, the command that we will run in the terminal is:

.. code-block:: javascript

	npm install highcharts --save-dev

|
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

Toolbar Button
****************
The toolbar is a component located at the top of the window, on which you can add multiple elements. 

.. image:: images/toolbar.png
	:align: center
	:width: 700px
	:height: 50px

The toolbar buttons are created using the **registerToolbarButton** function. One of the functionalities added in the toolbar using this function is the *Projects Library*, which opens a dialog where the user can manage its applications.

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






