# Wyliodrin STUDIO

Wyliodrin STUDIO is an educational platform for IoT and Embedded Linux systems.

* Connect to devices using TCP/IP or serial port
* Develop software and firmware for IoT in several programming languages
* Shell access to the device
* Import and export Wyliodrin STUDIO projects
* Visual dashboard for displaying sensor data
* Display the hardware schematics
* Manage packages for Python and Javascript
* Task manager for managing the device
* Network connection manager for the device  (Ethernet and WiFi)
* Interactive electronics documentation (resistor color code)
* Example projects and firmware
* Wyliodrin API documentation in C/C++, Python and Javascript

## Supported devices:
* Raspberry Pi and Arduino 
* UDOO Neo 
* BeagleBone Black 

## Supported languages
* Visual Programming (translates to Python)
* Javascript
* Python
* Shell Script (bash)

## Install

### Windows

If there are any errors, run
````cmd
npm install --global --production windows-build-tools
````

For bluetooth
WinUSB driver with Zadig tool

### Linux

For bluetooth
#### Debian based
````bash
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
````

#### Fedora / RPM
````bash
sudo yum install bluez bluez-libs bluez-libs-devel
````

#### Allow ble

````bash
sudo setcap cap_net_raw+eip ./node_modules/electron/dist/electron
````

#### Edit libraries

````bash
sudo vim /etc/ld.so.conf/electron.conf
````

Write $PATH_TO_FOLDER/node_modules/electron/dist

````bash
sudo ldconfig
````

If there is an error, run
````bash
sudo chown root:root node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
````

### macOS

Install Xcode

## Device

The device needs to run
* [wyliodrin-app-server](https://www.github.com/wyliodrin/wyliodrin-app-server)
* [libwyliodrin](https://www.github.com/wyliodrin/libwyliodrin)

You may download device images that have them installed from Wyliodrin.

* UDOO Neo [Download Image](http://www.wyliodrin.com/images/beta/udooneo)
* Raspberry Pi and Arduino [Download Image](http://www.wyliodrin.com/images/beta/raspberrypi)
* BeagleBone Black [Download Image](http://www.wyliodrin.com/images/beta/beagleboneblack)

## Build

You will need 

* [NodeJS](http://www.nodejs.org) version 10 or higher.

### Build Instructions for Windows users


	npm install
	npx electron-rebuild
	npx webpack 

### Build Instructions for Linux users

#### Build using the provided script

Just run the [build.sh](./build.sh) script.

*or*

#### You may build Wyliodrin STUDIO yourself

	npm install
	npx electron-rebuild
	npx webpack 

### Parameters

* DEBUG_WYLIODRIN='wyliodrin.*' - enable debug messages (this will have a performance impact)
* MIXPANEL_WYLIODRIN='' - mixpanel token for anonymous statistics sending

## Loading the app

First step in loading the app is to install chrome explorer if you haven't already installed
it [Download chrome](https://www.google.com/chrome/browser/desktop/index.html)

After the installation:
* open the options tab (the 3 dots button in the top-right corner)
* go to More tools
* in the More tools menu choose the Extensions option 
* check the developer mode box (top of the page)
* another three options will appear including one called 'Load unpacked extension'
* Select 'Load unpacked extension', go to the the folder where you have built the project and open the folder called 'build', then press open.

## Contribute

We would love your help. Click [here](CONTRIBUTING.md) to find out how to contribute.

## Authors

Wyliodrin STUDIO is a product of [Wyliodrin](http://www.wyliodrin.com)

* [Alexandru Radovici](https://www.github.com/alexandruradovici) - Maintainer
* [Razvan Serban](https://www.github.com/serban-razvan) - Developer
* [Alexandru Neculai](https://www.github.com/NeculaiAlex) - Developer
* [Ioana Culic](https://www.github.com/ioanaculic) - Developer
* [Ovidiu Stoica](https://www.github.com/oviska) - UX / UI
* [Catalin Dabuleanu](https://github.com/CatalinDabuleanu) - Developer

Contributions

* [Paula Margarit](https://www.github.com/paula-elena) - Developer
* [Daniel Dosaru](https://www.github.com/dosarudaniel) - Developer
* [Mihai Popescu](https://www.github.com/mhpopescu) - Developer

Wyliodrin is a trademark of Wyliodrin SRL. All rights reserved.

## License

GPLv3 for private, non profit and educational use.

Please consider contacting us at office@wyliodrin.com if you plan to use it in a commercial software.
This license allows you to write/distribute/sell an applications written in Wyliodrin STUDIO. If does not allow you to sell Wyliodrin STUDIO or any derived products.
