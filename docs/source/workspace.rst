:orphan:

Workspace
=========

|

“Workspace” is the main plugin in our application. It exports the 
*"workspace”* object, containing a series of functions that we use in every other plugin.

|

registerTab(name, priority, component, options={}) 
"""""""""""""""""""""""""""""""""""""""""""""""""""""
Registers an item that may be disposed in the application.

* *"name"* = element label, registered as a string that will be translated
* *"priority"* = element priority in the list with all menu items: the tab with the lowest priority will be displayed to the left
* *"component"* = the vue component attached to the current tab
* *"options"* = additional options

For example, in order to register the ‘Notebook’ tab, in the index.js file corresponding to the notebook plugin, we called the function:

.. code-block:: javascript

	studio.workspace.registerTab('PROJECT_NOTEBOOK', 300, Notebook)

.. image:: images/registerTab.png
	:align: center

registerComponent(component)
"""""""""""""""""""""""""""""""
Registers a new vue-component, named *"component"*. As an example, we used it to register our Xterm component, in the *"xterm"* plugin:

.. code-block:: javascript

	imports.workspace.registerComponent (Xterm);

registerMenuItem(name, priority, component, options={})
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Registers an element in the app’s menu.

* *"name"* = element label, registered as a string that will be translated
* *"priority"* = element priority in the list with all menu items; same convention applied as for **registerTab** function
* *"component"* = the vue component attached to the current item
* *"options"* = additional options

For example, we registered the item *“Wyliodrin API”* in the *"documentation"* plugin (index.js file)

.. code-block:: javascript

	studio.workspace.registerMenuItem ('WYLIODRIN_API', 10, () => documentation.openDocumentation());

where the component corresponds to a predefined function, that opens the actual documentation

.. image:: images/registerMenuItem.png
	:align: center

registerToolbarButton (name, priority, action, iconURL, options = {})
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Registers a new button in the app’s toolbar.

* *"name"* = element label, registered as a string that will be translated
* *"priority"* = element priority in the list with all toolbar buttons same convention applied as for **registerTab** function
* *"action"* = the actions that the buttton will perform on click
* *"iconURL"* = the image assigned
* *"options"* = additional options

For example, in order to register the **Project Library** button, we had to register it in the *index.js* file of the *“projects”* plugin:

.. code-block:: javascript

	studio.workspace.registerToolbarButton('PROJECT_LIBRARY', 10, () => studio.workspace.showDialog(ProjectsLibrary, {
	        width: 1000
	    }), 'plugins/projects/data/img/icons/projects-icon.svg');

The component corresponds to a function that opens a new window where the users can manage their projects.

.. image:: images/registerToolbarButton.png
	:align: center


.. _registerDeviceToolButton:

registerDeviceToolButton (deviceType, name, priority, action, iconURL, options = {}) 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Registers a new button used to manage the functioning of a device. These buttons show up only when a device is connected and they are specific for every device.

* *"deviceType"* = the type of the device for which we want to create the button (for example: serial/ rpk)
* *"priority"* = element priority in the list with all device buttons; same convention applied as for **registerTab** function
* *"action"* = the actions that the buttton will perform on click
* *"iconURL"* = the image assigned
* *"options"* = additional options

For example, when a raspberry pi is connected, we have the following buttons: **Run**, **Stop**, **TaskManager**, **PackageManager**, **NetworkManager**, which we registered in the *“device.wyapp”* plugin.

.. image:: images/registerDeviceToolButton.png
	:align: center

.. !!imagine butoane cu pi conectat

registerStatusButton (name, priority, component, iconURL, options = {})
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Registers the buttons used to open the *console* or the *mqtt* server.

* *"name"* = element label, registered as a string that will be translated
* *"priority"* = element priority in the list with all status buttons; same convention applied as for **registerTab** function
* *"component"* = the vue component attached to the current item
* *"iconURL"* = the image assigned
* *"options"* = additional options

.. code-block:: javascript

	studio.workspace.registerStatusButton('CONSOLE', 1, Console, 'plugins/console/data/img/icons/terminal-icon.svg');

.. image:: images/registerStatusButton.png
	:align: center
	:width: 80px
	:height: 50px

registerStore (namespace, store)
"""""""""""""""""""""""""""""""""""
Registers the Vuex store for a plugin.

A *"store"* is basically a container that holds your application state. There are two things that make a Vuex store different from a plain global object: Vuex stores are reactive. When Vue components retrieve state from it, they will reactively and efficiently update if the store's state changes.

For example, to register the store for the *“projects”* plugin, we had to call this function:

.. code-block:: javascript

	studio.workspace.registerStore('projects', projectStore);

where project store had to be imported:

.. code-block:: javascript

	import projectStore from './store';

getFromStore (namespace, variable)
"""""""""""""""""""""""""""""""""""""
Gets the value of the *“variable”* from the *“namespace”* store.
We called this function to get the current project from our *“projects”* store:

.. code-block:: javascript

	let project = studio.workspace.getFromStore('projects', 'currentProject');

dispatchToStore(namespace, action, data)
"""""""""""""""""""""""""""""""""""""""""""
Sends data to the "namespace" store promptly. Similar as before, we used it in the *"projects"* plugin, to register the current project into the store:

.. code-block:: javascript

	this.studio.workspace.dispatchToStore('projects', 'currentProject', null);

showNotification(text, values = {}, type = 'info', timeout = 6000)
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Displays a customized vuetify notification. The type can be “info”, “success” or “warning” and the text and values can be translated using the **$t** function.

For example, in the *"projects"* plugin, we check if the user entered a valid name for the project he wants to create. If negative, we call the **showNotification** function.

.. code-block:: javascript

	if(this.projectName === '') {
		await this.studio.workspace.showNotification ('PROJECT_NAME_PROMPT');
	}

.. image:: images/showNotification.png
	:align: center

showError(text, values = {}, timeout = 6000)
""""""""""""""""""""""""""""""""""""""""""""""""""""
Same as **showNotification**, it displays an error if the user is trying to perform an action not supported by the system.

For example, in the *“notebook”* plugin, we are sending an error if the user closes the upload image window without selecting a file:

.. code-block:: javascript

	this.studio.workspace.showError('NOTEBOOK_SELECT_IMAGE_ERROR');

.. image:: images/showError.png
	:align: center

showPrompt(title, question, original, action, values = {})
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
A customized prompt pops up and when it’s necessary to collect data from users.

For example, in our *“projects”* plugin, we open a customized prompt when the user chooses to rename a project.

.. code-block:: javascript

	this.rename = await this.studio.workspace.showPrompt('PROJECT_RENAME_PROJECT', 'PROJECT_NAME_PROMPT','', 'PROJECT_NEW_NAME');

.. image:: images/showPrompt.png
	:align: center
	:width: 500px
	:height: 300px

showConfirmationPrompt(title, question, values = {})
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Same as **showPrompt**, except that it waits for the user to confirm the question by pressing a **Yes/No** button and it doesn’t have an input text area.

In the *“workspace”* plugin, we are using it to check if the user is sure that he wants to close the app.

.. code-block:: javascript

	let value = await workspace.showConfirmationPrompt('EXIT', 'WORKSPACE_TOOLBAR_EXIT_QUESTION');

.. image:: images/showConfirmationPrompt.png
	:align: center
	:width: 500px
	:height: 270px

.. _showDialog:

showDialog (title, component, options, buttons, values = {})
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Similar to the other prompts, it’s used to collect data from the user.
We are using it in the *“device.wyapp.ssh”* plugin to save the informations necessary in order to connect. 

.. code-block:: javascript

	return workspace.showDialog (SSHConnectionDialog, {
	    device: device,
	    width: '500px'
	    });

where *‘SSHConnectionDialog’* is another Vue component which designs the dialog fields.

.. image:: images/showDialog.png
	:align: center
	:width: 500px
	:height: 300px

showDeviceSettingsDialog()
""""""""""""""""""""""""""""""""
Used to show the device settings dialog. It can be opened if the user clicks on the currently connected device name, to see its specifications.
.. !!!!!!!!!poza

showConnectionSelectionDialog()
""""""""""""""""""""""""""""""""""""""""
Dialog that is opened when the user clicks on the *‘Connect’* button and it shows all the devices the user can connect to.

.. POZA!!!!!!!

setWorkspaceTitle (title)
""""""""""""""""""""""""""""""""""
Loads the title of the current project from the store and displays it as the workspace **title**. This action is done in the *“projects”* plugin.

.. code-block:: javascript

	studio.workspace.setWorkspaceTitle (project.name);

For example, if we create and select a new project, named **“My Project”**, the workspace title will look like: 

.. image:: images/setWorkspaceTitle.png
	:align: center
	:width: 450px
	:height: 300px

registerDeviceDriver (name, deviceDriver)
""""""""""""""""""""""""""""""""""""""""""""""""""""
* *"name"* = name of the new device type
* *"deviceDriver"* = object created in the "setup" function of a "device" plugin, which consists of a series of functions necessary for a device: **defaultIcon**, **connect**, **settings**, **disconnect**.

The function registers a new device type. If the name of the new device type can’t be found in the list with all device drivers, then the actual **“deviceDriver”** will be registered.

We are using this function in the *“device.wyapp”* and *“device.rpk”* plugins to list a network, respectively a RPK device. Our **deviceDriver** is an object with its own specifications.

.. code-block:: javascript

	workspace = studio.workspace.registerDeviceDriver('wyapp', deviceDriver);

First of all, a default image is set to this object so that it become easy for the user to connect to his favorite device.

Then, we create the “connect” function, that sets up the transport (address, port), the connection and the device status. 

The next step is to update the device settings and after that to create the “disconnect” function.

We also use a *getConnections* and *registerForUpdate* functions.

Once the **deviceDriver**  registered, if it can be connected, we register its specific buttons, using the **registerDeviceToolButton** function. 


updateDevices(type, dev)
"""""""""""""""""""""""""""""""
This function searches for new devices and update the **availableDevices** list. We are using it in our *"device.wyapp"* plugins, each time we are searching for new devices.

For example, in *“device.wyapp.ssh”* plugin:

.. code-block:: javascript

	deviceDriver.updateDevices (sshDevices);


_defaultDeviceIcon (device)
"""""""""""""""""""""""""""""""
* *"device"* = the device for which the default image is set

It's an internal function, used to assign a default icon to a device that doesn't already have a particular image attached.

The default icon is:

.. image:: images/device-icon.png
	:align: center
	:width: 70px
	:height: 70px

connect(device, options)
"""""""""""""""""""""""""""""
This function is obviously used to connect to a device.

* *"device"* = the device object that we want to connect
* *"options"* = additional options 

The first step is to chech if the device we are trying to connect really is an actual device type. If it can be found in our **deviceDrivers** list, then we trasmit it's type and status to the workspace store.

getDevice()
""""""""""""""""""""
Returns a device from the store. We call the **getFromStore** function, wich returns the **device** objects, with all its properties.

getStatus()
"""""""""""""""""""
Returns a device status from the store.

The device statuses are:

* *DISCONNECTED* - this is offline
* *CONNECTING* - trying to connect
* *SYNCHRONIZING* - trying to synchronize with the device
* *CONNECTED* - this is online
* *ISSUE* - there is some issue, the system is partially functional
* *ERROR* - there is an error with the system

disconnect ()
""""""""""""""""""
Disconnects from a device.

The first step is to get the current device object, using the **getDevice()** function, then to check if it's an actual device type. If positive, we can disconnect the device.



