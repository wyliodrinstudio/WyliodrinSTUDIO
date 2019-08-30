:orphan:

Workspace plugin API
=======================

|

“Workspace” is the main plugin in our application. It exports the *"workspace”* object, containing a series of functions that we use in every other plugin.

|

registerTab
""""""""""""
Registers an item that may be disposed in the application.

The function parameters are:

.. list-table::

	* - *name* 
	  - element label, registered as a string that will be translated
	* - *priority* 
	  - element priority in the list with all menu items: the tab with the lowest priority will be displayed to the left
	* - *component* 
	  - the vue component attached to the current tab
	* - *options* 
	  - additional options: **visible**, or **enabled**

At first, we check if the *name* of the tab can be found in our global **tabs** array and if the result is null, we create a new object using the parameters as properties. After pushing the newly created tab into the array, we sort them by priority and dispatch the array to the workspace store.

For example, in order to register the ‘Notebook’ tab, in the index.js file corresponding to the notebook plugin, we called the function:

.. code-block:: javascript

	registerTab('PROJECT_NOTEBOOK', 300, Notebook)

.. image:: images/registerTab.png
	:align: center

|

registerComponent
""""""""""""""""""

The only parameter is:

.. list-table::

	* - *component* 
	  - the vue component we created as a *"MyVueFile.vue"*

Registers a new vue-component. As an example, we used it to register our Xterm component, in the *"xterm"* plugin:

.. code-block:: javascript

	registerComponent (Notebook);

|

registerMenuItem
"""""""""""""""""""
Registers an element in the app’s menu.

The function parameters are:

.. list-table::

	* - *name* 
	  - element label, registered as a string that will be translated
	* - *priority* 
	  - element priority in the list with all menu items; same convention applied as for **registerTab** function
	* - *component* 
	  - the vue component attached to the current item
	* - *options* 
	  - additional options: **visible**, or **enabled**

At first, we check if the *name* of the menu item can be found in our global **menuItems** array and if the result is null, we create a new object using the parameters as properties. After pushing the newly created menu item into the array, we sort them by priority and dispatch the array to the workspace store.

For example, we registered the item *“Wyliodrin API”* in the *"documentation"* plugin (index.js file)

.. code-block:: javascript

	registerMenuItem ('WYLIODRIN_API', 10, () => documentation.openDocumentation());

where the component corresponds to a predefined function, that opens the actual documentation

.. image:: images/registerMenuItem.png
	:align: center

|

registerToolbarButton
"""""""""""""""""""""""
Registers a new button in the app’s toolbar.

The function parameters are:

.. list-table::

	* - *name* 
	  - element label, registered as a string that will be translated
	* - *priority* 
	  - element priority in the list with all toolbar buttons same convention applied as for **registerTab** function
	* - *action* 
	  - the actions that the buttton will perform on click
	* - *iconURL* 
	  - the image assigned
	* - *options* 
	  - additional options: **visible**, or **enabled**

At first, we check if the *name* of the toolbar button can be found in our global **toolbarButtons** array and if the result is null, we create a new object using the parameters as properties. After pushing the newly created toolbarButton into the array, we sort them by priority and dispatch the array to the workspace store.

For example, we register a button having the translation key 'TOOLBAR_BUTTON', the priority 10, that on click will pop up a notification with the "You created a toolbar button" text. We need to specify the relative path to the image related to the button.

.. code-block:: javascript

	registerToolbarButton('TOOLBAR_BUTTON', 10, () => showNotification('You created a toolbar button', 'plugins/projects/data/img/icons/button.svg');

.. image:: images/registerToolbarButton.png
	:align: center

|

.. _registerDeviceToolButton:

registerDeviceToolButton
"""""""""""""""""""""""""""

Registers a new button used to manage the functioning of a device. These buttons show up only when a device is connected and they are specific for every device.

The function parameters are:

.. list-table::

	* - *deviceType* 
	  - the type of the device for which we want to create the button
	* - *priority* 
	  - element priority in the list with all device buttons; same convention applied as for **registerTab** function
	* - *action* 
	  - the actions that the buttton will perform on click
	* - *iconURL*
	  - the image assigned
	* - *options*
	  - additional options: **visible**, or **enabled**

At first, we check if the *name* of the device button can be found in our global **deviceToolButtons** array and if the result is null, we create a new object using the parameters as properties. After pushing the newly created deviceToolButton into the array, we sort them by priority and dispatch the array to the workspace store.

For example, when a raspberry pi is connected, we have the following buttons: 

**Run**, **Stop**, **TaskManager**, **PackageManager**, **NetworkManager**


.. !!imagine butoane cu pi conectat

An example on how to use thihs function can be:

.. code-block:: javascript

	registerDeviceToolBotton('RUN', 10,  => showNotification('You clicked the Run button!', 'plugins/workspace/data/img/icons/button.svg')

|

registerStatusButton 
""""""""""""""""""""""
Registers the buttons used to open the *console* or the *mqtt* server.

The function parameters are:

.. list-table::

	* - *name*
	  - element label, registered as a string that will be translated
	* - *priority*
	  - element priority in the list with all status buttons; same convention applied as for **registerTab** function
	* - *component*
	  - the vue component attached to the current item
	* - *iconURL*
	  - the image assigned
	* - *options*
	  - additional options: **visible**, or **enabled**

At first, we check if the *name* of the status button can be found in our global **statusButtons** array and if the result is null, we create a new object using the parameters as properties. After pushing the newly created statusButton into the array, we sort them by priority and dispatch the array to the workspace store.

.. code-block:: javascript

	registerStatusButton('CONSOLE', 1, Console, 'plugins/console/data/img/icons/terminal-icon.svg');

.. image:: images/registerStatusButton.png
	:align: center
	:width: 80px
	:height: 50px

|

registerStore
""""""""""""""""
Registers the Vuex store for a plugin.

A *"store"* is basically a container that holds your application state. There are two things that make a Vuex store different from a plain global object: Vuex stores are reactive. When Vue components retrieve state from it, they will reactively and efficiently update if the store's state changes.


The function parameters are:

.. list-table::

	* - *namespace*
	  - the name given to the store
	* - *store*
	  - the actual store object, imported from the *'./store'* file of the plugin

For example, to register the store for the *“projects”* plugin, we had to call this function:

.. code-block:: javascript

	registerStore('projects', projectStore);

where project store had to be imported:

.. code-block:: javascript

	import projectStore from './store';

|

getFromStore
"""""""""""""""
Gets the value of a variable from a certain store.

The function parameters are: 

.. list-table::

	* - *variable*
	  - the name of the variable that we want to process
	* - *namespace*
	  - the name of the store where the variable is registered

We called this function to get the current project from our *“projects”* store:

.. code-block:: javascript

	let project = getFromStore('projects', 'currentProject');

|

dispatchToStore
"""""""""""""""""""
Sends data to the store promptly. 

The function parameters are:

.. list-table:: 

	* - *namespace*
	  - the name of the store where you want to dispatch
	* - *action*
	  - the variable that you want to update
	* - *data*
	  - the additional data that you want to send to the variable

Similar as before, we used it in the *"projects"* plugin, to register the current project into the store:

.. code-block:: javascript

	dispatchToStore('projects', 'currentProject', null);

|

setWorkspaceTitle
""""""""""""""""""""

The only parameter of this function is: 

.. list-table::

	* - *title*
	  - the title of the current project

Loads the title of the current project from the store and displays it as the workspace **title**. 

This action is done in the *“projects”* plugin.

.. code-block:: javascript

	setWorkspaceTitle (project.name);

For example, if we create and select a new project, named **“My Project”**, the workspace title will look like: 

.. image:: images/setWorkspaceTitle.png
	:align: center
	:width: 450px
	:height: 300px

|

registerDeviceDriver
"""""""""""""""""""""""""""""""

The function parameters are:

.. list-table::

	* - *name*
	  - name of the new device type
	* - *deviceDriver*
	  - object created in the "setup" function of a "device" plugin, which consists of a series of functions necessary for a device: **defaultIcon**, **connect**, **settings**, **disconnect**.

The function registers a new device type. If the name of the new device type can’t be found in the list with all device drivers, then the actual **“deviceDriver”** will be registered.

We are using this function in the *“device.wyapp”* and *“device.rpk”* plugins to list a network, respectively a RPK device. Our **deviceDriver** is an object with its own specifications.

.. code-block:: javascript

	workspace = registerDeviceDriver('wyapp', deviceDriver);

First of all, a default image is set to this object so that it become easy for the user to connect to his favorite device.

Then, we create the “connect” function, that sets up the transport (address, port), the connection and the device status. 

The next step is to update the device settings and after that to create the “disconnect” function.

We also use a *getConnections* and *registerForUpdate* functions.

Once the **deviceDriver**  registered, if it can be connected, we register its specific buttons, using the **registerDeviceToolButton** function. 

|

updateDevices
"""""""""""""""""
This function searches for new devices and update the **availableDevices** list.

The parameters are:

.. list-table::

	* - *type*
	  - the type of the device, it has to be previously registered using the *registerDeviceDriver* function
	* - *dev*
	  - the array of devices that will be updated

We are using it in our *"device.wyapp"* plugins, each time we are searching for new devices.

For example, in *“device.wyapp.ssh”* plugin:

.. code-block:: javascript

	deviceDriver.updateDevices (sshDevices);

|

connect
"""""""""
This function is obviously used to connect to a device.

The function parameters are: 

.. list-table:: 

	* - *device*
	  - the device object that we want to connect
	* - *options*
	  - additional options 

The first step is to chech if the device we are trying to connect really is an actual device type. If it can be found in our **deviceDrivers** list, then we trasmit its type and status to the workspace store.

|

getDevice()
"""""""""""""""""
Returns a device from the store. We call the **getFromStore** function, wich returns the **device** objects, with all its properties.

We are using it each time we want to work with the currently connected device and we want to know its type.

For example:

.. code-block:: javascript

	let device = getDevice ();

|

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

|

disconnect ()
""""""""""""""""""
Disconnects from a device.

The first step is to get the current device object, using the **getDevice()** function, then to check if it's an actual device type. If positive, we can disconnect the device.