Wyliodrin Studio documentation
==============================

|
|

Wyliodrin STUDIO is an educational platform for software and hardware development for IoT and Embedded Linux systems. 

The application has been built as an extendable framework. The main architecture is a collection of plugins that add functionality. This approach has been chosen as different devices have very different ways of connecting and interacting with the computer and/or the browser.

The plugin system allows Wyliodrin STUDIO to be very flexible and extendable. Adding features such as supported devices or languages and event very different new functionalities is a matter of writing a new plugin.

|

The purpose of Wyliodrion STUDIO is to help its users deploy industrial IoT application, gain IoT knowledge and offer customized results in the same domain, by providing them a series of professional solutions:

* Connect to devices using TCP/IP or serial port
* Develop software and firmware for IoT in several programming languages
* Shell access to the device
* Import and export Wyliodrin STUDIO projects
* Visual dashboard for displaying sensor data
* Display the hardware schematics
* Manage packages for Python and Javascript
* Task manager for managing the device
* Network connection manager for the device (Ethernet and WiFi)
* Interactive electronics documentation (resistor color code)
* Example projects and firmware
* Wyliodrin API documentation in C/C++, Python and Javascript

.. image:: images/wyliodrin.png
	:align: center


For the moment, the devices supported by the platform are:

* Raspberry Pi
* UDOO Neo
* Arduino
* BeagleBone Black

.. image:: images/devices.png

Also, the recognized programming languages at the time are:

* Javascript
* Python
* Shell Script (bash)
* Visual Programming (translates to Python)

.. image:: images/languages.png
	:align: center
	:width: 550px
	:height: 150px

|

**NXP Rapid IoT**

Rapid IoT is a product that allows fast prototyping of IoT products. The official IDE provided by NXP allows a lot of flexibility when building IoT products but requires advanced knowledge of embedded programming to get started. Knowledge such as bare-metal embedded programming and/or FreeRTOS is required. 

Wyliodrin STUDIO covers the STEM segment and the prototyping segment. It is the perfect tool to get new users started with Rapid IoT by offering three ways of programming:

1. Scripting languages: MicroPython and JerryScript
2. Visual Programming that translates to MicroPython and JavaScript
3. C/C++ programming to make an easy transition towards the professional IDE

**STEM segment**

Rapid IoT is a great tool for STEM education. It is a powerful MCU that is already linked to several sensors, has a display and a UI (buttons and touch) interface and is ready to be connected using BLE or Thread.

From our experience in using IoT in teaching STEM, one of the most difficult problems is hooking up hardware and making the components works. Students lose a lot of time (and interest) when debugging sensor connections. With the Rapid IoT, this problem is solved. Students can focus on building an interesting and innovative project using IoT instead of fixing hardware connection issues.

**Fast prototyping segment**

The main issue when prototyping is how fast one can get a project working. While professional IDEs are able to optimize and create great technical products, they are not fit for fast development. One needs to read a lot  of documentation to make the project work. This is where prototyping IDE complement the professional ones. While compromising speed and efficiency, prototyping IDEs provide scripting languages and several other tools that can speed up the building of the prototype.

|

Installing Wyliodrin Studio
*****************************

|

In order for you to can start prototyping IoT applications or move to the next level by using our professional solution to develop and deploy Internet of Things systems, we offer you 3 different techniques of installing the Wyliodrin Studio IDE.

|

Download the application
""""""""""""""""""""""""""

For **Windows** users:

https://wyliodrin.studio/

|

For **Linux** users:

https://wyliodrin.studio/

|

For **Mac OS** users:

https://wyliodrin.studio/

|

Use the web version
""""""""""""""""""""""

YYou also have the possibility to run and use a browser version of Wyliodrin Studio, by copying the following link into your browser address bar:

**beta.wyliodrin.studio**

|

Build from source
""""""""""""""""""""

If you wish to contribute to the improvement of the application or if you want to add your own features or plugins, our code is *open source*, which means that you cand find it on our Github.

To download the source code, you must have a GitHub account. Open a terminal and choose the folder where you’d want to clone our repository. In this case, we’ll use the home directory and run:

.. code-block:: bash

	git clone https://github.com/alexandruradovici/WyliodrinSTUDIO2/tree/plugin-works

|

There are 2 procedures to build the Wyliodrin Studio application:

For the **STANDALONE** version, you will have to run the following commands: 

::

	npm install
	npx electron-rebuild
	npx webpack

For the **BROWSER** edition, you will use: 

::

	npx webpack --config=webpack.browser.config.js

|

Once the application was installed and built, you can make changes, correct or customize our source code, in order to improve it.

|


.. toctree::
   :maxdepth: 3
   
   architecture
   extension
   workspace_api
   projects_api
   translations
   plugin
   dialogs_notifications


.. Indices and tables
.. ==================

.. * :ref:`genindex`
.. * :ref:`modindex`
.. * :ref:`search`
