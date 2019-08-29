Wyliodrin Studio documentation
==============================

|
|

Wyliodrin STUDIO is an educational platform for software and hardware development for IoT and Embedded Linux systems. The purpose of the application is to help its users deploy industrial IoT application, gain IoT knowledge and offer customized results in the same domain, by providing them a series of professional solutions:

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

* Raspberry Pi and Arduino
* UDOO Neo
* Arduino Yun
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

Installing Wyliodrin Studio
*****************************

In order for you to can start prototyping IoT applications or move to the next level by using our professional solution to develop and deploy Internet of Things systems, we offer you 3 different thechniques of installing the Wyliodrin Studio IDE.

|

DOWNLOAD THE APPLICATION
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

USE THE WEB VERSION
""""""""""""""""""""""

We offer you the possibility to run and use a browser version of Wyliodrin Studio, by copying the following link into your browser address bar:

**beta.wyliodrin.studio**

|

BULID FROM SOURCE
""""""""""""""""""""

If you wish to contribute to the improvement of the application or if you want to add your own features or plugins, we are pleased to inform you that our code is *open source*, which means that you cand find it on our Github.

To download the source code, you must have a GitHub account. Open a terminal and choose the folder where you’d want to clone our repository. In this case, we’ll use the home directory and run:

.. code-block:: bash

	git clone https://github.com/alexandruradovici/WyliodrinSTUDIO2/tree/plugin-works

|

We offer you 2 procedures to build of the Wyliodrin Studio application:

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
   api
   translations
   plugin
   dialogs_notifications


.. Indices and tables
.. ==================

.. * :ref:`genindex`
.. * :ref:`modindex`
.. * :ref:`search`
