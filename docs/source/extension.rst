:orphan:

Extension methods
==================

|

Wyliodrin STUDIO enables customization, which means that you may add plugins to extend its features. Plugins may register different components, like buttons specifically designed for devices, workspace tabs, status buttons, toolbar buttons or menus.

Here is a list of plugins of this type, registered at this moment in Wyliodrin STUDIO:

.. _menu:

Menu
*****
The menu button is included in the *Menu.vue* component, as a simple image button. 

.. image:: images/menu.png
	:align: center

If clicked, it opens a help menu including  some topics registered using the **registerMenuItem** function. 

.. autofunction:: registerMenuItem

|

The items currently registered in the menu are:

**Wyliodrin API**: opens a new window with the API documentation

**Resistor color code**: dialog with the color code of a resistor

**Send feedback**: dialog where you can write a feedback, having a printscreen attached

**Use Advanced/Simple Mode**: switch between the simple and advanced (more functionalities included) mode.

**About**: dialog with a short description of the application

.. image:: images/menuitems.png
	:align: center

|

.. _toolbarButtons:

Toolbar Buttons
****************

These buttons are located in the toolbar, on the top of the main window. A toolbar button is an element that will perform different actions when clicked, according to the component that is relied to it. For example, these buttons may open dialogs that require user inputs.

In order to create this type of buttons, we implemented the **registerToolbarButton** function:

.. autofunction:: registerToolbarButton

we register a button having the translation key 'TOOLBAR_BUTTON', the priority 10, that on click will pop up a notification with the content: "You created a toolbar button". We need to specify the relative path to the image related to the button. 

This function also modifies the default value of the *visible* additional options, making the button visible for the user only after 8 AM.

.. image:: images/registerToolbarButton.png
	:align: center

|

.. _tabs:

Tabs
*****
The tabs are components of our application and accomplish various functions that help you handling your projects and interacting with the device that is connected to Wyliodrin STUDIO. 

They are integrated with the **registerTab** function:

.. autofunction:: registerTab

A list of the currently existing tabs:

.. image:: images/all_tabs.png
	:align: center

|

The tabs are registered in the *workspace* plugin. They can be accessed only if their *"enabled"* property is *true*, which means that you have to validate a certain condition: have an opened project or be connected to a device.

|

.. _devicetool:

DeviceTool Buttons
********************

These buttons are visible only when a device is connected and they can be different according to the device type.

We added them in the *DeviceTools.vue* component, and this is how they look like:

.. image:: images/devicetoolbuttons.png
	:align: center

They were previously registered using the **registerDeviceToolButton** function:

.. autofunction:: registerDeviceToolButton

Here, we registered a device tool button having the translation key 'DEVICETOOL_BUTTON', the priority 10, that on click will pop up a notification with the content: "You created a device tool button!".

The button will be visible for an user only after 8 AM.

|

.. _statusbutton:

Status Buttons
***************

The last component of the workspace is represented by the status buttons: **Console** and **MQTT**. A status button is an element that will perform different actions when clicked, according to the component that is relied to it. For example, these buttons may open terminals or interfaces that require user inputs.

They are created using the **registerStatusButton** function.

.. image:: images/registerStatusButton.png
	:align: center

.. autofunction:: registerStatusButton

The **Console** button opens a console similar to the *shell*, while the **MQTT** button opens an interface where you can choose the port where the *MQTT* server will be opened (the default port is 1883). MQTT is a publish-subscribe-based messaging protocol.

|

Language
**********
The language button is included in the *LanguageMenu.vue* component and its corresponding image, a flag, changes dynamically according to the selected language.

.. image:: images/language.png
	:align: center

Here's a list with all the languages available at this moment: 

.. image:: images/all_languages.png
	:align: center 

When a language is selected from the list, the **setLanguage** function is called, which is using the `internationalization (i18n) <https://en.wikipedia.org/wiki/Internationalization_and_localization>`_ process, and the new language is updated, meaning that all the keys will be translated. More details about the translation function are discussed :ref:`here <translations>`.

|
