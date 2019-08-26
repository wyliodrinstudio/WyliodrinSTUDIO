:orphan:

Device plugin
===============

|

The **"device.wyapp"** plugin is the main plugin for the devices registration. Here, we included a series of Vue components that are visible only when a device is connected and we created the **device_wyapp** exportable object, which consists of a collection of functions that realize the connection, data transport, settings, specific buttons registration and the disconnection.

|

Main functions
*****************
The first step was to create the **deviceDriver** object, to which we assigned the following functions:

defaultIcon()
^^^^^^^^^^^^^^
Correlates a default icon to a device that doesn't already have a particular image attached.

The default icon is:

.. image:: images/device-icon.png
	:align: center

connect (device, options)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Connects the device to the Wyliodrin Studio application.

If the unique device *id* is undefined in out main object *connections*, we check if the device *type* is **'.wyapp'**. In this case, we assign to our device the *address* and the *port*, then we create a new **Transport** and **Connection**.

According to the device current status, we bring up to date our device, using the **updateDevice** function. The statuses of a device are:

* *DISCONNECTED* - this is offline
* *CONNECTING* - trying to connect
* *SYNCHRONIZING* - trying to synchronize with the device
* *CONNECTED* - this is online
* *ISSUE* - there is some issue, the system is partially functional
* *ERROR* - there is an error with the system

In the **connect** function, we also have the transmission of data packets between the board and the user. The type of the packet informs us of the message is intended for the *shell* (**packet.t === 's'**), the *project* (**packet.t === 'tp'**), the *dashboard* (**packet.t === 'v'**), the *notebook* (**packet.t === 'note'**), or if it's an *error* (**packet.t === 'e'**).

According to this type, we are sending the proper commands to the reguired plugin.

|

settings (device)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
We call the :ref:`showDialog <showDialog>` function, which we discussed in the workspace section.

.. POZA

|

disconnect (device, options)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If there is a device having the *'CONNECTED'* status and no additional options, we call the following function:

.. code-block:: javascript

	options = await studio.workspace.showDialog (DisconnectDialog, {persistent: false, width:300});

**DisconnectDialog** is a vue component, which contains 3 different buttons and 3 correlated functions to accomplish the **disconnect** function:

.. POZA

* *Reboot*
* *Power Off*
* *Disconnect*

|

registerForUpdate(device, fn)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Registers to recive updates for a device.

* *device* - the device
* *fn* - the function to be called

|

Button Registration
***********************

Having the **deviceDriver** object, we call the function **registerDeviceDriver('wyapp', deviceDriver)** and then register the specific buttons, using the :ref:`registerDeviceToolButton <registerDeviceToolButton>` function:

1. **RUN**
Loads the current project with all its included files, gets the device from the workspace store, creates an object called **tp** containing relevant data, and then sends to the device the informations that it needs in order to run the current project, along with the *'tp'* tag.

|

2. **STOP**
Gets the connected device from the workspace store and sends the tag *'tp'* and the action *'stop'*.

|

3. **TASK MANAGER**
Gets the connected device from the workspace store and, on click, opens a dialog consisted of the *TaskManager.vue* component.

.. POZA

|

4. **PACKAGE MANAGER**
Gets the connected device from the workspace store and, on click, opens a dialog consisted of the *PackageManager.vue* component.

.. POZA

|

5. **NETWORK MANAGER**
Gets the connected device from the workspace store and, on click, opens a dialog consisted of the *NetworkManager.vue* component.

.. POZA

|

Transport and Board
*********************
The next step is to create the **device_wyapp** object that will be registered in this plugin and which includes 4 important properties:

|

registerTransport(name, driver)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Registers a new transport method.

* *"name"* = the name of the transport driver
* *"driver"* - the transport driver

If the **name** of the transport driver wasn't registered yes, which means it can't be found in the *transports* object, we map in the *devices* array a new device *transport* and we correlate it with the new connected board.

For example, in the *device.wyapp.serial* plugin, we register a new transport method:

.. code-block:: javascript

	deviceDriver = wyapp.registerTransport ('serial', {
		Transport: SerialWyAppTransport,
		setup (device)
		{
			return workspace.showDialog (SerialConnectionDialog, {
				device: device,
				width: '500px'
			});
		}
	});

where *SerialWyAppTransport* is the new transport driver, and the setup function opens the*SerialConnectionDialog.vue* component.

.. POZA

_sendToDevice
^^^^^^^^^^^^^^^
It's an internal function, to which we associate the **sendToDevice** function we used in the **connect** function to send data packets.

For example:

.. code-block:: javascript

	/* Project */
	if (packet.t === 'tp')
	{
		if (packet.d.a === 'k')
		{
			studio.console.write (device.id, packet.d.t);
		}
	}

|

registerBoard (name, board)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Registers a new board driver, including it in our *boards* array.

* *"name"* = the name associated to the board 
* *"board"* = the board object 

An example on how to use this function can be found in the *"device.wyapp.raspberrypi"* plugin, where we register a Raspberry Pi board:

.. code-block:: javascript

	studio.device_wyapp.registerBoard ('raspberrypi', raspberrypi);

|

getBoardDriver(board)
^^^^^^^^^^^^^^^^^^^^^^^^^
Returns the board driver from the *boards* array.

* *"name"* = the name we assigned to our board driver

|

How to create a new "device.wyapp" plugin
*******************************************
You can find more details about the files that a plugin should contain in :ref:`this <plugin>` section.

An additional property will be added in the *"package.json"* file, where the *"plugin"* key will include in its value object an additional property, named *"target"*. Here, you will specify if the new device will be supported only by **"electron"**, or also by the **"browser"**.

Also, you will have to create a **"visual"** folder, which will include 4 **'.js'** files: *code_picamera*, *code_pyfirmata*, *definitions_picamera* and *definitions_pyfirmata*. The purpose of these files is to import the blocks necessary to run the code on your board.

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