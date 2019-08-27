:orphan:

Extension methods
==================

|

Window Buttons
***************

These are the classic buttons used for handling the main window of our application: *Minimize*, *Fullscreen* and *Exit*. They are located in the top right corner and can be identified as:

.. image:: images/window_buttons.png
	:align: center

We created this type of buttons inside the *"worskpace"* plugin, in the *Toolbar.vue* component:

.. image:: images/vue_window.png
	:align: center
	:width: 700px
	:height: 100px

As you can observe, inside de **<span>** tag, we added a text label and we used the function **$t('WORKSPACE_TOOLBAR_FULLSCREEN')**. It will translate the unique id string and, according to the current language, you will see the translation, not this key. More details about the translations file format can be found in our :ref:`translations <translations>` section.

.. image:: images/minimize.png
	:align: center

|

Connection Button
******************
Also in the *workspace* plugin we added the connection button, which can be found inside the *DeviceTools.vue* component. It is visible only when there is no device connected to Wyliodrin Studio and it was designed like this:

.. image:: images/connectionbuttonvue.png

|

.. image:: images/connectionbutton.png
	:align: center

On click, it calls the **showConnectionSelectionDialog** function, whose definition is:

.. code-block:: javascript

	async showConnectionSelectionDialog ()
	{
		let device = await this.studio.workspace.showConnectionSelectionDialog ();
		console.log ('device');
		if (device)
		{
			this.studio.workspace.connect (device);
		}
	}

The :ref:`**showConnectionSelectionDialog** <showConnectionSelectionDialog>` function was previously defined in the *workspace* plugin and it opens a dialog where you can see all the available devices.

|

DeviceTool Buttons
********************

These buttons are visible only when a device is connected and they can be different according to the device type.

We added them in the *DeviceTools.vue* component:

.. image:: images/devicetoolbuttons.png
	:align: center
	:width: 700px
	:height: 80px

They were previously registered using the **registerDeviceToolButton** function:

.. code-block:: javascript

	registerDeviceToolButton (deviceType, name, priority, action, iconURL, options = {})
	{
		// TODO verify name, priority, options.type and action to be the right value
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameDeviceToolButton = deviceToolButtons.find ((toolbarButton) => toolbarButton.name === name);
		if (!sameDeviceToolButton)
		{
			let item = {
				type: deviceType,
				name,
				priority,
				action,
				iconURL,
				enabled: options.enabled,
				visible: options.visible,
				buttonType: options.type
			};
			deviceToolButtons.push (item);
			deviceToolButtons = deviceToolButtons.sort ((deviceToolButton1, deviceToolButton2) => deviceToolButton1.priority - deviceToolButton2.priority);
			this.store.dispatch ('workspace/deviceToolButtons', deviceToolButtons);
		}
		else
		{
			this.warn ('Toolbar button '+name+' already exists in the toolbar');
		}
	}

* *"deviceType"* = the type of the device driver type the button is for
* *"priority"* = element priority in the list with all device buttons; the button with the lowest priority will be displayed to the left
* *"action"* = the actions that the buttton will perform on click
* *"iconURL"* = the image assigned
* *"options"* = additional options

An example on how to use this function to create this type of button can be found in the *device.wyapp* plugin, where we created the **Task Manager** button which opens its specific dialog when clicked:

.. image:: images/taskmanager.png

.. POZA!!!!!!!

Toolbar Buttons
****************
These buttons are located in the toolbar, on the top of the main window.
They are included in the *Toolbar.vue* file and saved into an array in the workspace store.

.. image:: images/toolbarbuttonsvue.png
	:align: center
	:width: 700px
	:height: 80px

In order to create this type of buttons, we implemented the **registerToolbarButton** function:

.. code-block:: javascript

	registerToolbarButton (name, priority, action, iconURL, options = {})
	{
		// TODO verify name, priority, options.type and action to be the right value
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameToolbarButton = toolbarButtons.find ((toolbarButton) => toolbarButton.name === name);
		if (!sameToolbarButton)
		{
			let item = {
				type: deviceType,
				name,
				priority,
				action,
				iconURL,
				enabled: options.enabled,
				visible: options.visible,
				buttonType: options.type
			};
			toolbarButtons.push (item);
			toolbarButtons = toolbarButtons.sort ((toolbarButton1, toolbarButton2) => toolbarButton1.priority - toolbarButton2.priority);
			this.store.dispatch ('workspace/toolbarButtons', toolbarButtons);
		}
		else
		{
			this.warn ('Toolbar button '+name+' already exists in the toolbar');
		}
	}

* *"name"* = element label, registered as a string that will be translated
* *"priority"* = element priority in the list with all toolbar buttons; the button with the lowest priority will be displayed to the left
* *"action"* = the actions that the buttton will perform on click
* *"iconURL"* = the image assigned
* *"options"* = additional options

For example, in order to register the **Project Library** button, we had to register it in the *index.js* file of the *“projects”* plugin:

.. code-block:: javascript

	studio.workspace.registerToolbarButton('PROJECT_LIBRARY', 10, () => studio.workspace.showDialog(ProjectsLibrary, {
	        width: 1000
	    }), 'plugins/projects/data/img/icons/projects-icon.svg');

The component corresponds to a function that opens a new window where yous can manage their projects.

.. image:: images/registerToolbarButton.png
	:align: center

|

Menu
*****
The menu button is included in the *Menu.vue* component, as a simple image button. 

.. image:: images/menu.png
	:align: center

If clicked, it opens a help menu including  some topics registered using the **registerMenuItem** function:

.. code-block:: javascript

	registerMenuItem (name, priority, action, options = {})
	{
		// TODO verify name, priority and action to be the right value
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameMenuItem = menuItems.find ((menuItem) => menuItem.name === name);
		if (!sameMenuItem)
		{
			let item = {
				name,
				priority,
				action,
				enabled: options.enabled,
				visible: options.visible
			};
			menuItems.push (item);
			menuItems = menuItems.sort ((menuItem1, menuItem2) => menuItem1.priority - menuItem2.priority);
			this.store.dispatch ('workspace/menuItems', menuItems);
		}
		else
		{
			this.warn ('Menu item '+name+' already exists in the menu');
		}
	}

* *"name"* = element label, registered as a string that will be translated as the menu item name
* *"priority"* = element priority in the list with all menu items; hte item with the lowest priority is to the left
* *"component"* = the vue component attached to the current item
* *"options"* = additional options

An example of use, which registers the item *'Use Advanced Mode'*

.. code-block:: javascript

	this.registerMenuItem ('WORKSPACE_SET_MODE_ADVANCED', 10, () => {
			workspace.dispatchToStore('workspace','mode','advanced');	
		}, {
			visible (){
				return workspace.getFromStore ('workspace', 'mode') === 'simple';
			}
		});

The items registered in the menu are:

**Wyliodrin API**: opens a new window with the API documentation

**Resistor color code**: a dialog with the color code of a resistor

**Send feedback**: a dialog where you can write a feedback, having a printscreen attached

**Use Advanced/Simple Mode**: switch between the simple and advanced (more functionalities included) mode.

**About**: dialog with a short description about the application

.. image:: images/menuitems.png
	:align: center

|

Language
**********
The language button is included in the *LanguageMenu.vue* component and its corresponding image, a flag, changes dynamically according to the selected language.

.. image:: images/language.png
	:align: center

A list with the currently available languages: 

.. image:: images/all_languages.png
	:align: center 

When a language is selected from the list, the **setLanguage** function is called:

.. code-block:: javascript

	setLanguage (languageId)
	{
		this.$i18n.locale = languageId;
		// Trigger resize to make sure UI elements get updated
		$(window).trigger ('resize');
	}

Internationalization (**i18n**) is the process of preparing software so that it can support local languages and cultural settings. 

So, the new language is updated and all the keys will be translated. More details about the translation function are discussed :ref:`here <translations>`.

|

Tabs
*****
The tabs are components of our application and accomplish various functions that help you handling your projects.

They are integrated with the **registerTab** function:

.. code-block:: javascript

	registerTab (name, priority, component, options = {})
	{
		options = _.merge ({
			visible: () => true,
			enabled: () => true
		}, options);
		let sameTab = tabs.find ((tab) => tab.name === name);
		if (!sameTab)
		{
			this.registerComponent (component);
			let item = {
				name,
				priority,
				component: component.name,
				enabled: options.enabled,
				visible: options.visible
			};
			tabs.push (item);
			tabs = tabs.sort ((tab1, tab2) => tab1.priority - tab2.priority);
			this.store.dispatch ('workspace/tabs', tabs);
		}
		else
		{
			this.warn ('Tab '+name+' already exists in the workspace');
		}
	}

* *"name"* = element label, registered as a string that will be translated
* *"priority"* = element priority in the list with all menu items: the tab with the lowest priority will be displayed to the left
* *"component"* = the vue component attached to the current tab
* *"options"* = additional options

For example, in order to register the ‘Notebook’ tab, in the index.js file corresponding to the notebook plugin, we called the function:

.. code-block:: javascript

	studio.workspace.registerTab('PROJECT_NOTEBOOK', 300, Notebook);

A list of the currently existing tabs:

.. image:: images/all_tabs.png
	:align: center

|

**1. APPLICATION**

This tab opens the main file of your project. Here, you can write your code using one of the supported programming lanugages: *javascript*, *python*, *bash* or *visual* (using blocks). When the application is connected to a device, you can also use its *Run* button to run the code.

If you is using the *Advanced Mode*, you will be able to see in the left part of the window your project tree, which includes all the folder and files you created.

.. image:: images/application.png
	:align: center

|

**2. DASHBOARD**

The purpose of this tab is to help you generate some graphical charts, that will receive signals from a connected board and will update their values according to the received data.

After selecting the type of the chart you want to create (*Extra*, *Gauge*, *Line*, *Slider*, *Speedometer*, *Switch*, *Thermometer*, or *Vu-meter*), a customized dialog will be opened and you will have the possiblity to choose the specifications for your graph.

.. image:: images/dashboard.png

|

**3. NOTEBOOK**

The Notebook tab, as its name indicates, offers you the possibility yo write labs, exercises sheets and handouts directly in the project. It allows you to follow several steps so that you can better understand how to write and set up the application that you need to build.

It includes 2 possible programming languages: *markdown* (including latex) and *python* (the code can be locally compiled if there is a connected board).

.. image:: images/notebook.png
	:align: center
	:width: 700px

|

**4. SCHEMATICS**

This tab can be used to upload your project schematics.

.. image:: images/schematics.png
	:align: center

**5. SHELL**

The shell tab is used to directly send commands to a connected board.

.. POZA

|


In the *Workspace.vue* file, we included all these tabs taking them from the store. They can be accessed only if their *"enabled"* propery is *true*, which means that you have to validate a certain condition: have an opened project or be connected to a device.

|

Status Buttons
***************

The last component of the workspace is represented by the status buttons: **Console** and **MQTT**. They are created using the **registerStatusButton** function:

.. code-block:: javascript

	registerStatusButton (name, priority, component, iconURL, options = {})
	{
		// TODO verify name, priority and action to be the right value
		this.registerComponent (component);
		options = _.merge ({
			visible: () => true,
			enabled: () => true,
			inset: () => false,
			height: () => '200px',
			overlay: () => false
		}, options);
		let sameStatusButton = statusButtons.find ((statusButton) => statusButton.name === name);
		if (!sameStatusButton)
		{
			let item = {
				name,
				priority,
				component: component.name,
				iconURL,
				enabled: options.enabled,
				visible: options.visible,
				inset: options.inset,
				height: options.height,
				overlay: options.overlay
			};
			statusButtons.push (item);
			statusButtons = statusButtons.sort ((statusButton1, statusButton2) => statusButton1.priority - statusButton2.priority);
			this.store.dispatch ('workspace/statusButtons', statusButtons);
		}
		else
		{
			this.warn ('Toolbar button '+name+' already exists in the toolbar');
		}
	}

* *"name"* = element label, registered as a string that will be translated
* *"priority"* = element priority in the list with all status buttons; the button with the lowest priority is to the left.
* *"component"* = the vue component attached to the current item
* *"iconURL"* = the image assigned
* *"options"* = additional options

.. image:: images/registerStatusButton.png
	:align: center

An overview on how the buttons were created:

.. code-block:: javascript

	studio.workspace.registerStatusButton ('CONSOLE', 1, Console, 'plugins/console/data/img/icons/terminal-icon.svg');

The **Console** button opens a console similar to the *shell*.

|

.. code-block:: javascript

	studio.workspace.registerStatusButton('MQTT', 1, MQTTServer, 'plugins/mqtt/data/img/icons/mqtt-icon.png');

The **MQTT** button opens an interface where you can choose the port where the *MQTT* server will be opened (the default port is 1883). MQTT is a publish-subscribe-based messaging protocol.