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

## Supported devices:
* Raspberry Pi and Arduino 
* Pico PI iMX8M
* NXP Rapid IoT
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

### macOS

Install Xcode

## Build

You will need 

* [NodeJS](http://www.nodejs.org) version 10 or higher.

### Build Instructions for Windows users

#### Electron

	npm install
	npx electron-rebuild
	npm run electron

#### Web

	npm install
	npm run browser

## Loading the app


## Contribute

We would love your help. Click [here](CONTRIBUTING.md) to find out how to contribute.

## Authors

Wyliodrin STUDIO is a product of [Wyliodrin](http://www.wyliodrin.com) in partnership with the [Politehnica University of Bucharest](www.upb.ro)

* [Alexandru Radovici](https://www.github.com/alexandruradovici) - Maintainer
* [Ovidiu Stoica](https://www.github.com/oviska) - UX / UI
* [Ioana Culic](https://www.github.com/ioanaculic) - Development Manager
* [Marius Aluculesei](https://www.github.com/mariusAlc) - Projects, Application
* [Liviu-Nicolae Moraru](https://github.com/skyplane23) - Embedded Software
* [Cosmin Daniel Radu](https://github.com/cosmindanielradu19) - Embedded Software
* [Calin Dumitru](https://github.com/Dumitru98) - Simulators
* [Diana Ghindaoanu](https://github.com/diana-ghindaoanu) - Notebook, Dashboard, Documentation
* [Teona Severin](https://github.com/teonaseverin) - Web File Systems, Hooks, Statistics

Contributions

* [Ana Marinescu](https://www.github.com/paula-elena) - Pin Layout
* [Andrei Deatcu](https://www.github.com/dosarudaniel) - Resistor Color Code, Schematics
* [Alexandru Vochescu](https://www.github.com/valexandru) - Examples

Wyliodrin is a trademark of Wyliodrin SRL. All rights reserved.

## License

Apache 2.0 for private, non profit and educational use.

Please consider contacting us at office@wyliodrin.com if you plan to use it in a commercial software.
This license allows you to write/distribute/sell an applications written in Wyliodrin STUDIO. If does not allow you to sell Wyliodrin STUDIO or any derived products.
